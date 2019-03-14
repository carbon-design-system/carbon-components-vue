import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvSelectNotesMD from './cv-select-notes.md';
import CvSelect from './cv-select';

const stories = storiesOf('Default/CvSelect', module);

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
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'label',
    },
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'hide-label',
    },
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'inline',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'disabled',
    },
  },
  vModel: {
    group: 'attr',
    value: `v-model="selectValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-select${settings.group.attr}>
    <cv-select-option disabled selected hidden>Choose an option</cv-select-option>
    <cv-select-option value="solong">A much longer cv-select-option that is worth having around to check how text flows</cv-select-option>
    <cv-select-optgroup label="Category 1">
      <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
      <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
    </cv-select-optgroup>
    <cv-select-optgroup label="Category 2">
      <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
      <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
    </cv-select-optgroup>
  </cv-select>
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
            <select v-model="selectValue" >
              <option value="cv-select-option1">cv-select-option 1</option>
              <option value="cv-select-option2">cv-select-option 2</option>
              <option value="cv-select-option3">cv-select-option 3</option>
              <option value="cv-select-option4">cv-select-option 4</option>
            </select>
          </span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvSelect, SvTemplateView },
        props: settings.props,
        data() {
          return {
            selectValue: 'cv-select-option3',
          };
        },
        methods: {
          actionChange: action('CV Select - change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvSelectNotesMD },
    }
  );
}
