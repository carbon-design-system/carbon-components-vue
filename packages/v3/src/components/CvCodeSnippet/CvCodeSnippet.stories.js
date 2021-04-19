import { carbonPrefix } from '../../global/settings';
import {
  sbCompPrefix,
  splitSlotArgs,
  storyParametersObject,
} from '../../global/storybook-utils';
import { action } from '@storybook/addon-actions';

import { CvCodeSnippet, CvCodeSnippetConsts, CvCodeSnippetSkeleton } from '.';

import './CvCodeSnippet.stories.scss';

export default {
  title: `${sbCompPrefix}/CvCodeSnippet`,
  component: CvCodeSnippet,
  argTypes: {
    default: { control: { type: 'text' } },
    kind: {
      control: { type: 'select' },
      options: CvCodeSnippetConsts.codeSnippetKinds,
      defaultValue: CvCodeSnippetConsts.codeSnippetKinds[0],
      table: {
        defaultValue: {
          summary: `'${CvCodeSnippetConsts.codeSnippetKinds[0]}'`,
        },
      },
    },
  },
};

const template = `
<div class="code-snippet-story" :class="{ '${carbonPrefix}--tile': args.light }">
  <small v-if="args.light">
    The snippet container should never be the same color as the page background.<br />
    Do not use the <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">light</cv-code-snippet> variant on <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-background</cv-code-snippet> or <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-02</cv-code-snippet>.
  </small>
  <cv-code-snippet v-bind="args" @copy="copy">{{ slotArgs.default }}</cv-code-snippet>
</div>
`;
const Template = argsIn => {
  const { args, slotArgs } = splitSlotArgs(argsIn, ['default']);

  return {
    components: { CvCodeSnippet },
    setup: () => ({ args, slotArgs, copy: action('copy') }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  kind: CvCodeSnippetConsts.codeSnippetKinds[0],
  default:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  ariaLabel: 'Container label',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  '<cv-code-snippet v-bind="args" @copy="copy">{{ slotArgs.default }}</cv-code-snippet>',
  Default.args
);

export const Oneline = Template.bind({});
Oneline.args = {
  kind: CvCodeSnippetConsts.codeSnippetKinds[0],
  default:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  ariaLabel: 'Container label',
};
Oneline.argTypes = {
  wrapText: { table: { disable: true } },
  lessText: { table: { disable: true } },
  moreText: { table: { disable: true } },
  minCollapsedNumberOfRows: { table: { disable: true } },
  maxCollapsedNumberOfRows: { table: { disable: true } },
  minExpandedNumberOfRows: { table: { disable: true } },
  maxExpandedNumberOfRows: { table: { disable: true } },
};
Oneline.parameters = storyParametersObject(
  Oneline.parameters,
  template,
  Oneline.args
);

export const Multiline = Template.bind({});
Multiline.args = {
  kind: CvCodeSnippetConsts.codeSnippetKinds[1],
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

export const Inline = Template.bind({});
Inline.args = {
  kind: CvCodeSnippetConsts.codeSnippetKinds[2],
  default: 'node -v',
};
Inline.argTypes = {
  ariaLabel: { table: { disable: true } },
  wrapText: { table: { disable: true } },
  lessText: { table: { disable: true } },
  moreText: { table: { disable: true } },
  minCollapsedNumberOfRows: { table: { disable: true } },
  maxCollapsedNumberOfRows: { table: { disable: true } },
  minExpandedNumberOfRows: { table: { disable: true } },
  maxExpandedNumberOfRows: { table: { disable: true } },
};
Inline.parameters = storyParametersObject(
  Inline.parameters,
  template,
  Inline.args
);

const skeletonTemplate = `
<div class="code-snippet-story" :class="{ '${carbonPrefix}--tile': args.light }">
  <small v-if="args.light">
    The snippet container should never be the same color as the page background.<br />
    Do not use the <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">light</cv-code-snippet> variant on <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-background</cv-code-snippet> or <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-02</cv-code-snippet>.
  </small>
  <cv-code-snippet-skeleton v-bind="args" />
</div>
`;
const SkeletonTemplate = args => ({
  components: { CvCodeSnippet, CvCodeSnippetSkeleton },
  setup: () => ({ args }),
  template: skeletonTemplate,
});

export const Skeleton = SkeletonTemplate.bind({});
Skeleton.argTypes = {
  kind: { options: CvCodeSnippetConsts.codeSnippetKinds.slice(0, 2) },
  copyFeedback: { table: { disable: true } },
  copyFeedbackTimeout: { table: { disable: true } },
  hideCopyButton: { table: { disable: true } },
  disabled: { table: { disable: true } },
  ariaLabel: { table: { disable: true } },
  wrapText: { table: { disable: true } },
  lessText: { table: { disable: true } },
  moreText: { table: { disable: true } },
  minCollapsedNumberOfRows: { table: { disable: true } },
  maxCollapsedNumberOfRows: { table: { disable: true } },
  minExpandedNumberOfRows: { table: { disable: true } },
  maxExpandedNumberOfRows: { table: { disable: true } },
};
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  `<cv-code-snippet-skeleton v-bind="args" />`,
  Skeleton.args
);
