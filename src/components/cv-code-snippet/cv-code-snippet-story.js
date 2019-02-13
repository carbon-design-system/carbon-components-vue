import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvCodeSnippetNotesMD from './cv-code-snippet-notes.md';
import CvCodeSnippet from './cv-code-snippet';

const stories = storiesOf('CvCodeSnippet', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  lessText: {
    group: 'attr',
    type: text,
    config: ['Less text', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    inline: true,
    prop: {
      name: 'less-text',
      type: String,
    },
  },
  moreText: {
    group: 'attr',
    type: text,
    config: ['More text', ''], // consts.CONTENT], // fails when used with number in storybook 4.1.4
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

const variants = [
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

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
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
      :sv-alt-back="${settings.group.attr.indexOf('inline') > -1}"
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
