import { createReadStream } from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { consola } from 'consola';
import { getUri } from 'get-uri';
import { ALERT_TYPES, Syntax } from '@/constants';
import { isRemoteUrl } from '@/utils';
import { useIpv4First } from '@/utils/dns';
import { getShortPath, writeFileIfChanged } from '@/utils/fs';
import { createLogger } from '@/utils/logger';
import { MARKDOWN_IMAGE_REGEX } from '@/utils/markdown';
import type {
  BaseOptions,
  PluginConfig,
  TransformOptions,
  UploadFile,
  UploadFileContext,
  UploadFileResult,
} from './types';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36';
axios.defaults.headers['User-Agent'] = USER_AGENT;

useIpv4First(); // use ipv4 default

export default abstract class BasePlugin<Options extends BaseOptions = BaseOptions> {
  protected options = {} as Options;

  abstract readonly name: string;

  abstract get enabled(): boolean;

  get supportedSyntax(): Syntax[] | undefined {
    return this.options.supportedSyntax;
  }

  private _logger?: typeof consola;

  get logger() {
    if (!this._logger) {
      this._logger = createLogger(`plugin:${this.name}`, 'blue');
    }
    return this._logger;
  }

  async uploadFile(context: UploadFileContext): Promise<UploadFileResult> {
    const { baseDir, url } = context;
    // noinspection ES6MissingAwait
    const stream = isRemoteUrl(url)
      ? getUri(url)
      : Promise.resolve(createReadStream(path.resolve(baseDir, url)));
    return await this.doUploadFile(stream, context);
  }

  protected abstract doUploadFile(
    file: UploadFile,
    context: UploadFileContext,
  ): Promise<UploadFileResult>;

  protected async transformImage(url: string, baseDir: string, config: PluginConfig) {
    let newUrl = config.images?.[url];
    if (!newUrl) {
      const shortPath = isRemoteUrl(url) ? url : getShortPath(path.resolve(baseDir, url));
      this.logger.debug(`upload: "${shortPath}" ...`);
      const uploadFile = await this.uploadFile({ baseDir, url });
      newUrl = uploadFile.url;
      if (!newUrl) {
        this.logger.debug(`skip: "${shortPath}"`);
        return;
      }
      config.images = { ...config.images, [url]: newUrl };
      this.logger.success(`upload: "${shortPath}" -> "${newUrl}"`);
    }
    return newUrl;
  }

  async transform(options: TransformOptions) {
    const { baseDir, filename, ext, shortPath, config, markdown, images } = options;

    this.logger.debug(`transform: "${shortPath}" ...`);

    const pluginConfig = config.plugin(this.name);
    let hasError = false;

    for (const image of images) {
      try {
        await this.transformImage(image.url, baseDir, pluginConfig);
      } catch (error) {
        hasError = true;
        this.logger.error(`upload "${image.url}" failed\n\n`, error);
      }
    }

    await config.save();

    if (hasError) {
      this.logger.fail(`some errors occurred when transform "${shortPath}" , try again`);
      return;
    }

    const newFile = path.join(baseDir, '.cache', `${filename}_${this.name}${ext}`);
    const msg = `transform: "${shortPath}" -> "${getShortPath(newFile)}"`;
    this.logger.debug(msg);
    let content = markdown.replace(MARKDOWN_IMAGE_REGEX, (raw, alt, url, title) => {
      const newUrl = pluginConfig.images?.[url] || url;
      return `![${alt}](${newUrl}${title ? ` ${title}` : ''})`;
    });

    content = await this.doTransform(content, pluginConfig);

    const saved = await writeFileIfChanged(newFile, content);
    if (saved) {
      this.logger.success(msg);
    }

    return !hasError;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async doTransform(content: string, config: PluginConfig) {
    return this.doTransformSyntax(content);
  }

  protected async doTransformSyntax(content: string) {
    const syntax = this.supportedSyntax || [];
    if (!syntax.includes(Syntax.ALERT)) {
      const types = ALERT_TYPES;
      content = content.replace(
        new RegExp(`>\\s+\\[!(${Object.keys(types).join('|')})\\]`, 'gi'),
        (raw, key: string) => `> ${types[key.toUpperCase()]}：`,
      );
    }
    return content;
  }
}
