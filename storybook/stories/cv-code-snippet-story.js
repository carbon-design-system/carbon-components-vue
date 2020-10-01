import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvCodeSnippetNotesMD from '../../packages/core/src/components/cv-code-snippet/cv-code-snippet-notes.md';
import { CvCodeSnippet, CvCodeSnippetSkeleton } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvCodeSnippet', module);
// const storiesExperimental = storiesOf('Experimental/CvCodeSnippet', module);

let preKnobs = {
  copyFeedback: {
    group: 'attr',
    type: text,
    config: ['copy feedback', 'Content copied!'],
    prop: 'copy-feedback',
  },
  feedbackAriaLabel: {
    group: 'attr',
    type: text,
    config: ['feedback aria label', 'feedback aria label'],
    prop: 'feedback-aria-label',
  },
  lessText: {
    group: 'attr',
    type: text,
    config: ['Less text', 'Show less'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'less-text',
  },
  moreText: {
    group: 'attr',
    type: text,
    config: ['More text', 'Show more'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: 'more-text',
  },
  inlineContent: {
    group: 'content',
    slot: 'default',
    value: 'printf("A short bit of code.");',
  },
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'theme',
    value: val => (val ? 'light' : ''),
  },
  content: {
    group: 'content',
    slot: 'default',
    value: `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);

  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }
}

$z-indexes: (
  modal : 9000,
  overlay : 8000,
  dropdown : 7000,
  header : 6000,
  footer : 5000,
  hidden : - 1,
  overflowHidden: - 1,
  floating: 10000
);`,
  },
};

let variants = [
  {
    name: 'default',
    includes: ['content'],
  },
  {
    name: 'inline',
    includes: ['inlineContent', 'theme', 'copyFeedback', 'feedbackAriaLabel'],
    extra: { kind: { group: 'attr', value: 'kind="inline"', inline: true } },
  },
  {
    name: 'inline (minimal)',
    includes: ['inlineContent'],
    extra: { kind: { group: 'attr', value: 'kind="inline"', inline: true } },
  },
  {
    name: 'multiline',
    extra: { kind: { group: 'attr', value: 'kind="multiline"', inline: true } },
  },
  {
    name: 'multiline (minimal)',
    includes: ['content'],
    extra: { kind: { group: 'attr', value: 'kind="multiline"', inline: true } },
  },
  {
    name: 'oneline',
    includes: ['content', 'copyFeedback', 'feedbackAriaLabel', 'theme'],
    extra: { kind: { group: 'attr', value: 'kind="oneline"', inline: true } },
  },
  {
    name: 'oneline (minimal)',
    includes: ['content'],
    extra: { kind: { group: 'attr', value: 'kind="oneline"', inline: true } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      // console.dir(settings);
      const templateString = `
<cv-code-snippet${settings.group.attr}>
  ${settings.group['content']}
</cv-code-snippet>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view ref="view"
      sv-margin
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvCodeSnippet, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvCodeSnippetNotesMD },
    }
  );
}

// cv-code-snippet-skeleton

preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: ['kind', { oneline: 'oneline', multiline: 'multiline' }, 'multiline'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'kind',
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
        <cv-code-snippet-skeleton${settings.group.attr}></cv-code-snippet-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvCodeSnippetSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvCodeSnippetNotesMD },
    }
  );
}
