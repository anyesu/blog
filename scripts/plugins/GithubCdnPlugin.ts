import { isRemoteUrl, parseTemplate } from '@/utils';
import { getShortPath } from '@/utils/fs';
import BasePlugin from './BasePlugin';
import type { BaseOptions, UploadFile, UploadFileContext } from './types';

export type CdnType = keyof typeof SUPPORTED_CDNS;

export interface GithubCdnOptions extends BaseOptions {
  type?: CdnType;
  owner: string;
  repo: string;
  branch: string;
}

const SUPPORTED_CDNS = {
  jsdelivr: 'https://cdn.jsdelivr.net/gh/{owner}/{repo}@{branch}',
  statically: 'https://cdn.statically.io/gh/{owner}/{repo}/{branch}',
  githack: 'https://raw.githack.com/{owner}/{repo}/{branch}',
} as const;
const [DEFAULT_CDN] = Object.keys(SUPPORTED_CDNS) as CdnType[];

export default class GithubCdnPlugin extends BasePlugin<GithubCdnOptions> {
  readonly name: string;

  private readonly base: string;

  get enabled() {
    return true;
  }

  constructor(name: string, options: GithubCdnOptions) {
    super();
    this.name = name;
    this.options = {
      ...this.options,
      type: DEFAULT_CDN,
      ...options,
    };
    const cdn = SUPPORTED_CDNS[this.options.type!];
    this.base = parseTemplate(cdn, this.options).replace(/@main$/, '');
  }

  async uploadFile(context: UploadFileContext) {
    return await this.doUploadFile(undefined, context);
  }

  protected async doUploadFile(file: UploadFile | undefined, { baseDir, url }: UploadFileContext) {
    if (isRemoteUrl(url)) {
      return {};
    }
    url = [this.base, getShortPath(baseDir), url].join('/').replace('\\', '/').replace(' ', '%20');
    return { url };
  }
}
