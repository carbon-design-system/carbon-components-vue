import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDropdownNotesMD from './cv-dropdown-notes.md';
import CvDropdown from './cv-dropdown';

const stories = storiesOf('CvDropdown', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'theme',
      value: val => (val ? 'light' : ''),
    },
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'Choose an option'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'placeholder',
    },
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
    prop: {
      name: 'value',
      type: String,
    },
  },
  up: {
    group: 'attr',
    type: boolean,
    config: ['up', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'up',
      type: Boolean,
    },
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['value'] },
  { name: 'events', includes: ['value', 'events'] },
  { name: 'vModel', includes: ['value', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);
for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
  <cv-dropdown ${settings.group.attr}>
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
      };
    },
    {
      notes: { markdown: CvDropdownNotesMD },
    }
  );
}
