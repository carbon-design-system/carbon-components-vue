import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTileNotesMD from './cv-tile-notes.md';
import CvTile from './cv-tile';

const stories = storiesOf('CvTile', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  kind: selectV2(
    'kind',
    {
      Standard: '',
      Selectable: 'selectable',
      Expandable: 'expandable',
      Clickable: 'clickable',
    },
    'standard',
    consts.CONFIG
  ),
  active: boolean('expended or selected', false, consts.CONFIG),
  slotDefault: text('slot:default', 'Tile content', consts.CONTENT),
  slotBelow: text(
    'slot:below',
    '<h2>Below the fold content</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    consts.CONTENT
  ),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvTileNotesMD)(() => {
    const settings = knobs();

    if (settings.active) {
      switch (settings.kind) {
        case 'expandable':
          settings.active = `\n expanded`;
          break;
        case 'selectable':
          settings.active = `\n selected`;
          break;
        default:
          settings.active = '';
          break;
      }
    } else {
      settings.active = '';
    }

    if (settings.kind === 'selectable') {
      settings.value = `\n value="value-1"`;
    } else {
      settings.value = '';
    }

    settings.slotDefault = settings.slotDefault.length
      ? `\n  ${settings.slotDefault}`
      : '';
    settings.slotBelow =
      settings.slotBelow.length && settings.kind === 'expandable'
        ? `\n  <template slot="below">${settings.slotBelow}</template>`
        : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-tile
  kind="${settings.kind}"${settings.value}${settings.otherAttributes}${
      settings.active
    }
  >${settings.slotDefault}${settings.slotBelow}
</cv-tile>
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
      components: { CvTile, SvTemplateView },
      template: templateViewString,
    };
  })
);
