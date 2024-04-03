import { Readable } from 'node:stream';
import { arrayBuffer } from 'node:stream/consumers';
import AWS from 'aws-sdk';
import axios from 'axios';
import { crc32 } from 'crc';
import { outdent } from 'outdent';
import { stringify } from 'qs';
import BasePlugin from './BasePlugin';
import type { BaseOptions, PluginConfig, UploadFile, UploadFileResult } from './types';

export interface JueJinOptions extends BaseOptions {
  theme: string;
  highlight: string;
}

const enum JUE_JIN_URLS {
  REFERER = 'https://juejin.cn',
  GEN_TOKEN = 'https://api.juejin.cn/imagex/gen_token?client=web',
  GET_IMG_URL = 'https://api.juejin.cn/imagex/get_img_url',
  AWS_HOST = 'https://imagex.bytedanceapi.com',
  APPLY_IMAGE_UPLOAD = 'ApplyImageUpload',
  COMMIT_IMAGE_UPLOAD = 'CommitImageUpload',
}

interface AwsRes {
  Result: any;
}

interface AwsToken {
  AccessKeyId: string;
  SecretAccessKey: string;
  SessionToken: string;
}

interface JueJinRes {
  data: any;
  err_msg: string;
  err_no: number;
}

function getAwsHeaders(token: AwsToken, url: string, method: string) {
  const { AccessKeyId, SecretAccessKey, SessionToken } = token;
  const region = 'cn-north-1';
  const req = new AWS.HttpRequest(new AWS.Endpoint(url), region);
  req.method = method;
  req.headers['X-Amz-Security-Token'] = SessionToken;
  const signer = new (AWS as any).Signers.V4(req, 'imagex');
  signer.addAuthorization(
    {
      accessKeyId: AccessKeyId,
      secretAccessKey: SecretAccessKey,
    },
    new Date(),
  );
  return signer.request.headers;
}

export default class JueJinPlugin extends BasePlugin<JueJinOptions> {
  name = 'juejin';

  get enabled() {
    return !!this.cookie;
  }

  private readonly cookie?: string;

  constructor(options?: Partial<JueJinOptions>) {
    super();
    this.cookie = process.env.JUE_JIN_COOKIE;
    this.options = {
      ...this.options,
      theme: 'fancy',
      highlight: 'atom-one-dark-reasonable',
      ...options,
    };
  }

  private async awsRequest(token: AwsToken, action: string, method: string, params?: any) {
    const search = {
      Action: action,
      Version: '2018-08-01',
      ServiceId: 'k3u1fbpfcp',
      ...params,
    };
    const url = `${JUE_JIN_URLS.AWS_HOST}?${stringify(search)}`;
    const { data } = await axios.request<AwsRes>({
      url,
      method,
      headers: getAwsHeaders(token, url, method),
    });
    if (!data.Result) {
      this.logger.error('data:', JSON.stringify(data, undefined, 2));
      throw new Error('AWS failed');
    }
    return data;
  }

  protected async doUploadFile(file: UploadFile): Promise<UploadFileResult> {
    // 1. 获取 AWS token
    const res1 = await axios.get<JueJinRes>(JUE_JIN_URLS.GEN_TOKEN, {
      headers: {
        referer: JUE_JIN_URLS.REFERER,
        cookie: this.cookie,
      },
    });
    const token = res1.data.data?.token;
    if (!token) {
      this.logger.error('data:', res1.data);
      throw new Error('get token failed');
    }

    // 2. 获取 AWS 上传路径
    const res2 = await this.awsRequest(token, JUE_JIN_URLS.APPLY_IMAGE_UPLOAD, 'GET');
    const { UploadAddress } = res2.Result;
    const { StoreInfos, UploadHosts } = UploadAddress;
    const { StoreUri: uri, Auth } = StoreInfos[0];
    const uploadUrl = `https://${UploadHosts[0]}/${uri}`;

    // 3. 上传文件
    const data = await file;
    const image = data instanceof Readable ? await arrayBuffer(data) : data;
    const crc = crc32(image).toString(16);
    const res3 = await axios.post(uploadUrl, image, {
      headers: {
        Authorization: Auth,
        'Content-CRC32': crc,
      },
    });
    if (res3.data.error?.code !== 200) {
      this.logger.error('data:', res3.data);
      throw new Error('upload failed');
    }

    // 4. 获取 AWS 上传结果（ 这一步可以不要 ）
    /*
    const { SessionKey } = UploadAddress;
    const params = { SessionKey };
    const res4 = await this.awsRequest(token, JUE_JIN_URLS.COMMIT_IMAGE_UPLOAD, 'POST', params);
    */

    // 5. 获取图片路径
    const res5 = await axios.get(JUE_JIN_URLS.GET_IMG_URL, { params: { uri } });
    const url = res5.data.data?.main_url?.split('?')[0];
    if (!url) {
      this.logger.error('data:', res5.data);
      throw new Error('upload failed');
    }
    return { url };
  }

  protected async doTransform(content: string, config: PluginConfig<JueJinOptions>) {
    content = await super.doTransform(content, config);
    const { theme: defaultTheme, highlight: defaultHighlight } = this.options;
    const { theme, highlight } = config.metadata || {};
    const metadata = outdent`
      ---
      theme: ${theme ?? defaultTheme ?? ''}
      highlight: ${highlight ?? defaultHighlight ?? ''}
      ---
    `;
    return [metadata, content].join('\n\n');
  }
}
