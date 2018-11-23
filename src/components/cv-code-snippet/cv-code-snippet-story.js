import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvCodeSnippetNotesMD from './cv-code-snippet-notes.md';
import CvCodeSnippet from './cv-code-snippet';

const stories = storiesOf('CvCodeSnippet', module);
stories.addDecorator(withKnobs);

const kinds = {
  options: {
    inline: 'inline',
    multiline: 'multiline',
    oneline: 'oneline',
  },
  default: 'oneline',
};

const preKnobs = {
  lessText: {
    group: 'attr',
    type: text,
    config: ['Less text', '', consts.CONTENT],
    value: val => (val.length ? `\n  less-text="${val}"` : ''),
  },
  moreText: {
    group: 'attr',
    type: text,
    config: ['More text', '', consts.CONTENT],
    value: val => (val.length ? `\n  more-text="${val}"` : ''),
  },
  content: {
    group: 'slot-content',
    type: text,
    config: [
      'slot:content',
      `@mixin grid-container {
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
      consts.CONTENT,
    ],
    value: val => val,
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => val,
    data: (obj, key, val) => (obj[key] = val),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvCodeSnippetNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      console.dir(settings);
      const templateString = `
<cv-code-snippet${settings.kind}${settings.group.attr}>
  ${settings.group['slot-content']}
</cv-code-snippet>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view ref="view"
      sv-margin
      :sv-alt-back="${settings.kind.indexOf('inline') > -1}"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvCodeSnippet, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
