import fastJsonStableStringify from 'fast-json-stable-stringify';
import jsonfile from 'jsonfile';
import { getShortPath, writeFileIfChanged } from '@utils/fs';
import { createLogger } from '@utils/logger';
import type { PluginConfig } from './types';

const logger = createLogger('config', 'yellow');

export interface ConfigData {
  plugins: Record<string, PluginConfig | undefined>;

  /**
   * Ignore specified plugins
   */
  ignore?: string[];
}

export default class Config {
  private readonly file;

  private readonly shortPath;

  private _data?: ConfigData;

  get data() {
    if (!this._data) {
      throw new Error('Configuration not loaded');
    }
    return this._data;
  }

  constructor(file: string) {
    this.file = file;
    this.shortPath = getShortPath(file);
  }

  load() {
    logger.debug(`load from "${this.shortPath}"`);
    const data = (this._data = jsonfile.readFileSync(this.file, { throws: false }) || {});
    data.plugins = { ...data.plugins };
    return this;
  }

  async save() {
    const stableConfig = JSON.parse(fastJsonStableStringify(this.data));
    const formatted = JSON.stringify(stableConfig, undefined, 2);
    const saved = await writeFileIfChanged(this.file, formatted);
    if (saved) {
      logger.info(`save to "${this.shortPath}"`);
    }
    return this;
  }

  plugin(name: string, defaultValue = {} as PluginConfig) {
    const { plugins } = this.data;
    let item = plugins[name];
    if (!item) {
      item = plugins[name] = defaultValue;
    }
    return item;
  }

  isPluginIgnored(name: string) {
    return !!this.data.ignore?.includes(name);
  }
}
