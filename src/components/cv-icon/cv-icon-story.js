import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvIconNotesMD from './cv-icon-notes.md';
import CvIcon from './cv-icon';

const stories = storiesOf('CvIcon', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const fullIconHref =
  require('carbon-icons/dist/carbon-icons.svg') + '#icon--error';
const kinds = null;

const preKnobs = {
  href: {
    group: 'attr',
    type: select,
    config: [
      'href',
      {
        'cv(icon--add)': 'cv(icon--add)',
        "require('carbon-icons/dist/carbon-icons.svg') + '#icon--error'": fullIconHref,
      },
      'cv(icon--add)',
      consts.CONFIG,
    ],
    value: val => `\n  href="${val}"`,
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-icon${settings.group.attr}>
</cv-icon>
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
        components: { CvIcon, SvTemplateView },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvIconNotesMD },
    }
  );
}
