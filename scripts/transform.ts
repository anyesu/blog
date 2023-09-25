import 'dotenv-flow/config';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import cac from 'cac';
import esMain from 'es-main';
import { globbySync } from 'globby';
import logUpdate from 'log-update';
import outdent from 'outdent';
import Config from '@plugins/Config';
import JianShuPlugin from '@plugins/JianShuPlugin';
import { getShortPath } from '@utils/fs';
import { createLogger, setLogLevel } from '@utils/logger';
import { resolveMarkdownImages } from '@utils/markdown';

const logger = createLogger('transform', 'greenBright');

const plugins = [new JianShuPlugin()];

export async function transform(file: string) {
  const shortPath = getShortPath(file);
  logger.debug(`parse file "${shortPath}"`);
  const ext = path.extname(file);
  const filename = path.basename(file, ext);
  const baseDir = path.dirname(file);
  const configPath = path.resolve(baseDir, `${filename}.config.json`);
  const config = new Config(configPath).load();
  const markdown = readFileSync(file, 'utf8');
  const images = resolveMarkdownImages(markdown);

  for (const plugin of plugins) {
    if (!plugin.enabled || config.isPluginIgnored(plugin.name)) {
      plugin.logger.debug('skip');
      return;
    }
    await plugin.transform({ baseDir, filename, ext, shortPath, config, markdown, images });
  }
}

if (esMain(import.meta)) {
  const cli = cac();

  cli.option('-d, --debug', `[boolean] Output debugging information`);

  cli
    .command('[...file/dir/glob]', 'transform files')
    .option('--ext', '[string] Specify file extensions', {
      default: 'md',
    })
    .action(async (globs: string[], options: { debug: boolean; ext: string }) => {
      if (globs.length === 0) {
        cli.outputHelp();
        return;
      }

      if (options.debug) {
        setLogLevel(4);
      }

      const ext = options.ext.split(',').filter(Boolean).join('|');
      const entries = globbySync(
        globs.map((glob) => glob.replace('(', '\\(')),
        {
          ignore: [`**/*.!(${ext})`, '**/.cache/**', '**/node_modules/**'],
          absolute: true,
        },
      );

      if (entries.length === 0) {
        logger.error(outdent`
          No files matching the pattern(ext: ${ext}) ${JSON.stringify(globs)} were found.
          Please check for typing mistakes in the pattern.
        `);
        return;
      }

      for (const entry of entries) {
        await transform(entry);
      }

      logUpdate.clear();
    });

  cli.help();
  cli.version('0.0.0');
  cli.parse();
}
