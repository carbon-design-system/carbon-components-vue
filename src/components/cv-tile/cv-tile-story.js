import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvTileNotesMD from './cv-tile-notes.md';
import CvTile from './cv-tile';

const stories = storiesOf('Default/CvTile', module);

const preKnobs = {
  slotDefault: {
    group: 'slots',
    slot: {
      name: '',
      value: '<h1>Hello</h1><p>This is some tile content</p>',
    },
  },
  slotBelow: {
    group: 'slots',
    slot: {
      name: 'below',
      value: `<h2>More</h2>
        <ul>
          <li>This</li>
          <li>is some</li>
          <li>more</li>
          <li>content</li>
        </ul>`,
    },
  },
  expanded: {
    group: 'attr',
    type: boolean,
    config: ['expanded', false],
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
  href: {
    group: 'attr',
    type: text,
    config: [
      'where to go when clicked',
      'https://github.com/carbon-design-system/carbon-components-vue/blob/master/README.md',
    ],
    prop: {
      name: 'href',
      type: String,
    },
  },
  value: {
    group: 'attr',
    value: 'value="selected-1"',
  },
};

const variants = [
  { name: 'default', includes: ['slotDefault'] },
  {
    name: 'standard',

    includes: ['slotDefault'],
    extra: { kind: { group: 'attr', value: 'kind="standard"' } },
  },
  {
    name: 'selectable',
    includes: ['slotDefault', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="selectable"' } },
  },
  {
    name: 'expandable',
    includes: ['slotDefault', 'slotBelow', 'expanded'],
    extra: { kind: { group: 'attr', value: 'kind="expandable"' } },
  },
  {
    name: 'clickable',
    includes: ['slotDefault', 'href'],
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
