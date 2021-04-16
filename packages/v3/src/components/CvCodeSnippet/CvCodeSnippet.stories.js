import { CvCodeSnippet } from '.';

import {
  sbCompPrefix,
  splitSlotArgs,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvCodeSnippet`,
  component: CvCodeSnippet,
  argTypes: {
    default: { control: { type: 'text' } },
  },
};

const template = `<cv-code-snippet v-bind="args">{{ slotArgs.default }}</cv-code-snippet>`;
const Template = argsIn => {
  const { args, slotArgs } = splitSlotArgs(argsIn, ['default']);

  return {
    components: { CvCodeSnippet },
    setup: () => ({ args, slotArgs }),
    template,
  };
};

export const Inline = Template.bind({});
Inline.args = {
  kind: 'inline',
  default: 'node -v',
};
Inline.parameters = storyParametersObject(
  Inline.parameters,
  template,
  Inline.args
);

export const Oneline = Template.bind({});
Oneline.args = {
  kind: 'oneline',
  default:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  ariaLabel: 'Container label',
};
Oneline.parameters = storyParametersObject(
  Oneline.parameters,
  template,
  Oneline.args
);

export const Multiline = Template.bind({});
Multiline.args = {
  kind: 'multiline',
  default: `"scripts": {
    "build": "lerna run build --stream --prefix --npm-client yarn",
    "ci-check": "carbon-cli ci-check",
    "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'",
    "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages",
    "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "sync": "carbon-cli sync",
    "test": "cross-env BABEL_ENV=test jest",
    "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },
  "resolutions": {
    "react": "~16.9.0",
    "react-dom": "~16.9.0",
    "react-is": "~16.9.0",
    "react-test-renderer": "~16.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-proposal-export-default-from": "^7.7.4",
    "@babel/plugin-proposal-export-namespace-from": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.10.0",
    "@babel/preset-env": "^7.10.0",
    "@babel/preset-react": "^7.10.0",
    "@babel/runtime": "^7.10.0",
    "@commitlint/cli": "^8.3.5",`,
};
Multiline.parameters = storyParametersObject(
  Multiline.parameters,
  template,
  Multiline.args
);
