import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvIconNotesMD from './cv-icon-notes.md';
import CvIcon from './cv-icon';

const stories = storiesOf('CvIcon', module);
stories.addDecorator(withKnobs);

const fullIconHref =
  require('carbon-icons/dist/carbon-icons.svg') + '#icon--error';
const knobs = () => ({
  href: selectV2(
    'href',
    {
      'cv(icon--add)': 'cv(icon--add)',
      "require('carbon-icons/dist/carbon-icons.svg') + '#icon--error'": fullIconHref,
    },
    'cv(icon--add)',
    consts.CONFIG
  ),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvIconNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-icon${settings.otherAttributes}
  href="${settings.href}">
</cv-icon>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvIcon, SvTemplateView },
      template: templateViewString,
    };
  })
);
