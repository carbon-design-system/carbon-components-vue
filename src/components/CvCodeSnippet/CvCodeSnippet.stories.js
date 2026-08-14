import { carbonPrefix } from '../../global/settings';
import { splitSlotArgs } from '../../global/storybook-utils';
import { action } from '@storybook/addon-actions';

import { CvCodeSnippet, CvCodeSnippetSkeleton } from '.';
import { codeSnippetKinds } from './consts';

import './CvCodeSnippet.stories.scss';
import { computed } from 'vue';

export default {
  title: 'Component/CvCodeSnippet',
  component: CvCodeSnippet,
  argTypes: {
    default: { control: { type: 'text' } },
    kind: {
      control: { type: 'select' },
      options: codeSnippetKinds,
      table: {
        defaultValue: { summary: `'${codeSnippetKinds[0]}'` },
      },
    },
  },
  args: {
    kind: codeSnippetKinds[0],
  },
};

const defaultTemplate = `
<div class="code-snippet-story" :class="{ '${carbonPrefix}--tile': args.light }">
  <small v-if="args.light">
    The snippet container should never be the same color as the page background.<br />
    Do not use the <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">light</cv-code-snippet> variant on <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-background</cv-code-snippet> or <cv-code-snippet kind="inline" :light="true" :hide-copy-button="true">$ui-02</cv-code-snippet>.
  </small>
  <cv-code-snippet v-bind="args" @copy="copy">{{ slotArgs.default }}</cv-code-snippet>
</div>
`;

const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvCodeSnippet },
    setup: () => ({
      args: computed(() => splitSlotArgs(args, ['default']).args),
      slotArgs: computed(() => splitSlotArgs(args, ['default']).slotArgs),
      copy: action('copy'),
    }),
    template: defaultTemplate,
  }),
});

export const Default = Template({
  kind: codeSnippetKinds[0],
  default:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  ariaLabel: 'Container label',
});

export const Oneline = Template({
  kind: codeSnippetKinds[0],
  default:
    'yarn add carbon-components@latest carbon-components-react@latest @carbon/icons-react@latest carbon-icons@latest',
  ariaLabel: 'Container label',
});

export const Multiline = Template({
  kind: codeSnippetKinds[1],
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
});

export const Inline = Template({
  kind: codeSnippetKinds[2],
  default: 'node -v',
});

const skeletonTemplate = `<cv-code-snippet-skeleton v-bind="args" />`;

const SkeletonTemplate = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvCodeSnippetSkeleton },
    setup: () => ({
      args: computed(() => args),
      copy: action('copy'),
    }),
    template: skeletonTemplate,
  }),
});

export const Skeleton = SkeletonTemplate({
  kind: codeSnippetKinds[0],
});
