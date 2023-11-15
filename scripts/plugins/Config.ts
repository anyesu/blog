import jsonfile from 'jsonfile';
import prettier from 'prettier';
import { getShortPath, writeFileIfChanged } from '@/utils/fs';
import { createLogger } from '@/utils/logger';
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
    const options = await prettier.resolveConfig(this.file);
    const formatted = prettier.format(JSON.stringify(this.data), {
      ...options,
      filepath: this.file,
      // loading other plugins may cause slow initialization
      plugins: ['prettier-plugin-sort-json'],
    });
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
