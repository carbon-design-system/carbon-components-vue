const fs = require('fs');
const { spawnSync } = require('child_process');

if (fs.existsSync('./devPreinstall.js')) {
  require('./devPreinstall.js');
  require('./.storybook/postinstall.js');
} else {
  spawnSync('npx', ['ibmtelemetry', '--config=telemetry.yml']);
}
