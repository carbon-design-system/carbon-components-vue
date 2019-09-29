import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvDropdownNotesMD from '@carbon/vue/src/components/cv-dropdown/cv-dropdown-notes.md';
import { CvDropdown, CvDropdownItem, CvDropdownSkeleton } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvDropdown', module);
const storiesExperimental = storiesOf('Experimental/CvDropdown', module);

let preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'theme',
    value: val => (val ? 'light' : ''),
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'Choose an option'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'placeholder',
  },
  value: {
    group: 'attr',
    type: select,
    config: [
      'value',
      {
        default: '',
        'Value 10': '10',
        'Value 20': '20',
        'Value 30': '30',
        'Value 40': '40',
        'Value 50': '50',
      },
      '',
      // consts.CONTENT, // fails when used with number in storybook 4.1.4
    ],
    prop: 'value',
  },
  up: {
    group: 'attr',
    type: boolean,
    config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'up',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'inline',
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : null),
  },
  helperTextSlot: {
    group: 'slots',
    slot: 'helper-text',
    value: 'Some helpful text',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : null),
  },
  invalidMessageSlot: {
    group: 'slots',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
};

let variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events', 'helperText', 'invalidMessage'],
  },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
  <cv-dropdown ${settings.group.attr}>${settings.group.slots}
    <cv-dropdown-item value="10">Option with value 10</cv-dropdown-item>
    <cv-dropdown-item value="20">Option with value 20</cv-dropdown-item>
    <cv-dropdown-item value="30">Option with value 30</cv-dropdown-item>
    <cv-dropdown-item value="40">Option with value 40</cv-dropdown-item>
    <cv-dropdown-item value="50">Option with value 50</cv-dropdown-item>
  </cv-dropdown>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    sv-margin
    :sv-alt-back="this.$options.propsData.theme !== 'light'"
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
    <template slot="other">
      <div v-if="${templateString.indexOf('v-model') > 0}">
        <span>V-Model value</span>
          <select v-model="modelValue" >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </span>
      </div>
    </template>
  </sv-template-view>
  `;

      return {
        components: {
          CvDropdown,
          CvDropdownItem,
          SvTemplateView,
        },
        props: settings.props,
        data() {
          return {
            modelValue: this.value,
          };
        },
        methods: {
          actionChange: action('CV Dropdown - change'),
        },
        template: templateViewString,
        watch: {
          value() {
            this.modelValue = this.value;
          },
        },
      };
    },
    {
      notes: { markdown: CvDropdownNotesMD },
    }
  );
}

// cv-dropdown-skeleton

preKnobs = {
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'inline',
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);
for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
      <cv-dropdown-skeleton${settings.group.attr}></cv-dropdown-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component"><div style="width: 300px">${templateString}</div></template>
      </sv-template-view>
    `;

      return {
        components: { CvDropdownSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvDropdownNotesMD },
    }
  );
}
