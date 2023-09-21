const chokidar = require('chokidar');
const prettier = require('prettier');

// For IDE refresh configuration
chokidar
  .watch(['package.json', '.prettierrc*', 'prettier.config.*'], {
    // Not hold the process
    persistent: false,
  })
  .on('change', () => {
    prettier.clearConfigCache();
  });
