import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvOverflowMenuNotesMD from './cv-overflow-menu-notes.md';
import CvOverflowMenu from './cv-overflow-menu';

const stories = storiesOf('CvOverflowMenu', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  flipMenu: boolean('flip menu', false, consts.CONFIG) ? ' flip-menu' : '',
  offset: boolean('offset example', false, consts.CONFIG)
    ? ' :offset="{ left: 0, top: 200 }"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvOverflowMenuNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-overflow-menu${settings.otherAttributes}${settings.offset}${
      settings.flipMenu
    }>
  <cv-overflow-menu-item primary>list item 1</cv-overflow-menu-item>
  <cv-overflow-menu-item disabled>list item 2</cv-overflow-menu-item>
  <cv-overflow-menu-item danger>list item 3</cv-overflow-menu-item>
</cv-overflow-menu>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvOverflowMenu, SvTemplateView },
      template: templateViewString,
    };
  })
);
