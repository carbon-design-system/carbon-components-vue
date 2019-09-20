import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTileNotesMD from '@carbon/vue/src/components/cv-tile/cv-tile-notes.md';
import { CvTile } from '@carbon/vue/src';
import { action } from '@storybook/addon-actions';

const storiesDefault = storiesOf('Components/CvTile', module);
const storiesExperimental = storiesOf('Experimental/CvTile', module);

let preKnobs = {
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
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', 'check-1'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'value',
    },
  },
};

let variants = [
  { name: 'default', includes: ['slotDefault'] },
  {
    name: 'standard',

    includes: ['slotDefault'],
    extra: { kind: { group: 'attr', value: 'kind="standard"' } },
  },
  {
    name: 'selectable',
    includes: ['slotDefault', 'selected', 'value'],
    extra: {
      kind: { group: 'attr', value: 'kind="selectable"' },
      ariaLabel: { group: 'attr', value: 'aria-label="custom aria label"' },
    },
  },
  {
    name: 'selectable-event',
    includes: ['slotDefault', 'events', 'value'],
    extra: { kind: { group: 'attr', value: 'kind="selectable" @change="actionChange"' } },
  },
  {
    name: 'selectable-v-model',
    includes: ['slotDefault', 'vModel', 'value'],
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
    extra: { kind: { group: 'attr', value: 'kind="clickable" @click="actionClick"' } },
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
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
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" value="check-1" v-model="modelValue">
          </label>
          <br>
          <br>
          <span>Checked: {{ modelValue }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvTile, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          actionClick: action('click'),
          actionChange: action('change'),
        },
        data() {
          return {
            modelValue: this.$options.propsData.selected || false,
          };
        },
      };
    },
    {
      notes: { markdown: CvTileNotesMD },
    }
  );
}

preKnobs = {
  vModel: {
    group: 'attr',
    value: `v-model="selectedTiles"`,
  },
};

variants = [{ name: 'selectable-Array v-model', includes: ['vModel'] }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-tile kind="selectable"${settings.group.attr} value="tile-1"><h1>tile-1"</h1>
</cv-tile>
<cv-tile kind="selectable"${settings.group.attr} value="tile-2"><h1>tile-2"</h1>
</cv-tile>
<cv-tile kind="selectable"${settings.group.attr} value="tile-3"><h1>tile-3"</h1>
</cv-tile>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <p>This story only demonstrates the array syntax for v-model</p>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div v-if="${templateString.indexOf('v-model') > 0}">
          <br>
          <br>
          <span>
            V-model:
          </span>
          <label>Check 1:
            <input type="checkbox" value="tile-1" v-model="selectedTiles">
          </label>
          <label>Check 2:
            <input type="checkbox" value="tile-2" v-model="selectedTiles">
          </label>
          <label>Check 3:
            <input type="checkbox" value="tile-3" v-model="selectedTiles">
          </label>
          <br>
          <br>
          <span>Checked: {{ selectedTiles }}</span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvTile, SvTemplateView },
        data() {
          return {
            selectedTiles: ['tile-1', 'tile-2'],
          };
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvTileNotesMD },
    }
  );
}
