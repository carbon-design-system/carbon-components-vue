import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTileNotesMD from './cv-tile-notes.md';
import CvTile from './cv-tile';

const stories = storiesOf('CvTile', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = {
  options: {
    Default: '',
    Standard: 'standard',
    Selectable: 'selectable',
    Expandable: 'expandable',
    Clickable: 'clickable',
  },
  default: '',
};

const preKnobs = {
  slotDefault: {
    group: 'slots',
    type: text,
    config: ['slot:default', 'Tile content', consts.CONTENT],
    value: val => val,
  },
  slotBelow: {
    group: 'slots',
    type: text,
    config: [
      'slot:below',
      '<h2>Below the fold content</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
      consts.CONTENT,
    ],
    value: val => `\n  <template slot="below">${val}</template>`,
  },
  expanded: {
    group: 'attr',
    type: boolean,
    config: ['expended', false, consts.CONFIG],
    value: val => (val ? '\n  expanded' : ''),
  },
  selected: {
    group: 'attr',
    type: boolean,
    config: ['selected', false, consts.CONFIG],
    value: val =>
      val ? '\n  selected\n  value="selected-1"' : '\n  value="selected-1"',
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
    () => {
      const settings = story.knobs();

      if (settings.kind === 'selectable') {
        settings.group.attr += `\n  value="value-1"`;
      }

      // ----------------------------------------------------------------

      const templateString = `
<cv-tile${settings.kind}${settings.group.attr}>${settings.group.slots}
</cv-tile>
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
        components: { CvTile, SvTemplateView },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvTileNotesMD },
    }
  );
}
