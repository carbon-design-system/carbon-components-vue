import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvCodeSnippetNotesMD from './cv-code-snippet-notes.md';
import CvCodeSnippet from './cv-code-snippet';
import CvCodeSnippetSkeleton from './cv-code-snippet-skeleton';

const storiesDefault = storiesOf('Default/CvCodeSnippet', module);
const storiesExperimental = storiesOf('Experimental/CvCodeSnippet', module);
import { override, reset } from '../../_internal/_feature-flags';

let preKnobs = {
  lessText: {
    group: 'attr',
    type: text,
    config: ['Less text', 'Show less'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      name: 'less-text',
      type: String,
    },
  },
  moreText: {
    group: 'attr',
    type: text,
    config: ['More text', 'Show more'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      name: 'more-text',
      type: String,
    },
  },
  content: {
    group: 'content',
    slot: {
      name: '',
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
  },
};

let variants = [
  {
    name: 'default',
    includes: ['content'],
  },
  {
    name: 'inline',
    includes: ['content'],
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
    includes: ['content'],
    extra: { kind: { group: 'attr', value: 'kind="oneline"', inline: true } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
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
      :sv-experimental="experimental"
      sv-margin
      :sv-alt-back="${settings.group.attr.indexOf('inline') > -1}"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvCodeSnippet, SvTemplateView },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvCodeSnippetNotesMD },
      }
    );
  }
}
// cv-code-snippet-skeleton

preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: [
      'kind',
      { oneline: 'oneline', multiline: 'multiline' },
      'multiline',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'kind',
      type: String,
    },
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        const templateString = `
        <cv-code-snippet-skeleton${
          settings.group.attr
        }></cv-code-snippet-skeleton>
      `;

        // ----------------------------------------------------------------

        const templateViewString = `
      <sv-template-view
        :sv-experimental="experimental"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: { CvCodeSnippetSkeleton, SvTemplateView },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvCodeSnippetNotesMD },
      }
    );
  }
}
