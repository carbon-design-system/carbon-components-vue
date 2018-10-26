import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvLinkNotesMD from './cv-link-notes.md';
import CvLink from './cv-link';

const stories = storiesOf('CvLink', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  href: text('href', '#', consts.CONFIG),
  disabled: boolean('disabled', false, consts.CONFIG)
    ? ' tabindex="-1" aria-disabled="true"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvLinkNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-link href="${settings.href}"${settings.disabled}${settings.otherAttributes}>
  Link
</cv-link>
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
      components: { CvLink, SvTemplateView },
      template: templateViewString,
    };
  })
);
