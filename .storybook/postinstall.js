const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

/**
 * This is a fragile **workaround** to customize new storybook controls.
 *
 * Currently, storybook lack the option to create customizable controls, as an option for
 * knobs. This hack allow us to define our own control types, that should be defined at
 * `window["STORYBOOK_CUSTOM_CONTROLS"]`, created at manager.js.
 *
 * This solution, along with the button control defined at manager.js, was found in a discussion
 * about a new button control type:
 * https://github.com/storybookjs/storybook/issues/11971#issuecomment-1240831460
 */

try {
  addCustomControls();
  console.log('storybook custom controls added');
} catch (e) {
  console.warn('@carbon/vue [.storybook/postinstall]', e.message);
}

function addCustomControls() {
  const file = resolve(
    'node_modules',
    '@storybook',
    'components',
    'dist',
    'esm',
    'index-681e4b07.js'
  );
  replaceInFile(
    file,
    'var Control=Controls[control.type]||NoControl',
    'var Control=(Object.assign({}, Controls, (window["STORYBOOK_CUSTOM_CONTROLS"] || {})))[control.type]||NoControl'
  );
}

function replaceInFile(file, search, value) {
  let content = readFileSync(file, 'utf-8');
  content = content.replace(search, value);
  writeFileSync(file, content, 'utf-8');
}
