import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
// import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTileNotesMD from './cv-tile-notes.md';
import CvTile from './cv-tile';

const stories = storiesOf('CvTile', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  slotDefault: {
    group: 'slots',
    slot: {
      name: '',
      value: '<p>This is some tile content</p>',
    },
  },
  slotBelow: {
    group: 'slots',
    slot: {
      name: 'below',
      value:
        '<ul><li>This</li><li>is some</li>li>more</li>li>content</li></ul>',
    },
  },
  expanded: {
    group: 'attr',
    type: boolean,
    prop: { name: 'expanded', type: Boolean },
  },
  selected: {
    group: 'attr',
    type: boolean,
    config: ['selected', false], // consts.CONFIG],
    prop: {
      name: 'selected',
      type: Boolean,
    },
  },
  value: {
    group: 'attr',
    value: 'value="selected-1"',
  },
};

const variants = [
  { name: 'default', excludes: ['expanded', 'selected', 'value'] },
  {
    name: 'standard',
    excludes: ['expanded', 'selected', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="standard"' } },
  },
  {
    name: 'selectable',
    excludes: ['expanded'],
    extra: { kind: { group: 'attr', value: 'kind="selectable"' } },
  },
  {
    name: 'expandable',
    excludes: ['selected'],
    extra: { kind: { group: 'attr', value: 'kind="expandable"' } },
  },
  {
    name: 'clickable',
    includes: ['slotDefault'],
    extra: { kind: { group: 'attr', value: 'kind="clickable"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

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
<cv-tile${settings.group.attr}>${settings.group.slots}
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
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTileNotesMD },
    }
  );
}
