import path from 'node:path';
import axios from 'axios';
import FormData from 'form-data';
import { useIpv4First, useIpv6First } from '@/utils/dns';
import BasePlugin from './BasePlugin';
import type { BaseOptions, UploadFile, UploadFileContext, UploadFileResult } from './types';

export interface JianShuOptions extends BaseOptions {
  /**
   * jianshu getting Token API may fail when using ipv4
   */
  ipv6First: boolean;

  /**
   * gif will not be compressed by jianshu
   */
  forceGif: boolean;
}

const JIAN_SHU_REFERER_URL = 'https://www.jianshu.com/writer';
const JIAN_SHU_TOKEN_GET_URL = 'https://www.jianshu.com/upload_images/token.json';
const JIAN_SHU_UPLOAD_URL = 'https://upload.qiniup.com';

export default class JianShuPlugin extends BasePlugin<JianShuOptions> {
  name = 'jianshu';

  get enabled() {
    return !!this.token;
  }

  private readonly cookie: string;

  private readonly token?: string;

  constructor(options?: Partial<JianShuOptions>) {
    super();
    this.token = process.env.JIAN_SHU_TOKEN;
    this.cookie = `remember_user_token=${this.token}`;
    this.options = {
      ...this.options,
      ipv6First: true,
      forceGif: true,
      ...options,
    };
  }

  async uploadFile(context: UploadFileContext): Promise<UploadFileResult> {
    const { ipv6First } = this.options;
    if (ipv6First) useIpv6First();
    try {
      return await super.uploadFile(context);
    } finally {
      if (ipv6First) useIpv4First();
    }
  }

  protected async doUploadFile(
    file: UploadFile,
    context: UploadFileContext,
  ): Promise<UploadFileResult> {
    const { url } = context;
    let filename = url ? path.basename(url) : `${Date.now()}.png`;
    if (this.options.forceGif) {
      filename = filename.replace(path.extname(filename), '.gif');
    }

    const res = await axios.get(`${JIAN_SHU_TOKEN_GET_URL}?filename=${filename}`, {
      headers: {
        referer: JIAN_SHU_REFERER_URL,
        cookie: this.cookie,
      },
    });
    const { token, key } = res.data || {};
    if (!token) {
      this.logger.error('data:', res.data);
      throw new Error('get token failed');
    }

    const formData = new FormData();
    formData.append('token', token);
    formData.append('key', key);
    formData.append('x:protocol', 'https');
    formData.append('file', await file, filename);
    const { data } = await axios.post(JIAN_SHU_UPLOAD_URL, formData);
    if (data?.url) {
      return { url: data.url };
    }
    this.logger.error('data:', data);
    throw new Error('upload failed');
  }
}
