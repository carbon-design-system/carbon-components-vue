import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTagNotesMD from './cv-tag-notes.md';
import CvTag from './cv-tag';

const stories = storiesOf('CvTag', module);
stories.addDecorator(withKnobs);

const kinds = {
  options: {
    IBM: 'ibm',
    Beta: 'beta',
    'Third-party': 'third-party',
    Local: 'local',
    Dedicated: 'dedicated',
    Custom: 'custom',
    Experimental: 'experimental',
    Community: 'community',
    Private: 'private',
    Deprecated: 'deprecated',
  },
  default: 'ibm',
};

const preKnobs = {
  label: {
    group: 'attr',
    type: text,
    config: ['Tag label', 'I ama a tag', consts.CONTENT],
    value: val => `\n  label="${val}"`,
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvTagNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tag${settings.kind}${settings.group.attr}></cv-tag>
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
        components: { CvTag, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
