import { consola, createConsola } from 'consola';
import { colors } from 'consola/utils';
import logUpdate from 'log-update';

let isLogUpdate = false;

const defaultLogger = createConsola({
  types: { debug: { level: 3 } } as Record<string, any>,
  reporters: [
    {
      log(logObj) {
        // replace `debug` with `logUpdate`
        if (logObj.type === 'debug' && defaultLogger.level < 4) {
          isLogUpdate = true;
          logUpdate(colors.gray('D'), ...logObj.args);
          return;
        }
        if (isLogUpdate) {
          isLogUpdate = false;
          logUpdate.clear();
        }
        consola._log(logObj);
      },
    },
  ],
});

export function createLogger(namespace: string, color: string) {
  return defaultLogger.withDefaults({ message: colors[color](`[${namespace}]:`) });
}

export function setLogLevel(level: typeof consola.level) {
  defaultLogger.level = level;
}
