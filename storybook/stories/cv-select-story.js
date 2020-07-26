import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvSelectNotesMD from '../../packages/core/src/components/cv-select/cv-select-notes.md';
import { CvSelect, CvSelectOptgroup, CvSelectOption } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvSelect', module);
// const storiesExperimental = storiesOf('Experimental/CvSelect', module);

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'theme',
    value: val => (val ? 'light' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  hideLabel: {
    group: 'attr',
    type: boolean,
    config: ['hide-label', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'hide-label',
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'inline',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  vModel: {
    group: 'attr',
    value: `v-model="selectValue"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
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
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'slots',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'helperTextSlot', 'invalidMessageSlot'],
  },
  {
    name: 'slots',
    excludes: ['vModel', 'events'],
  },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-select${settings.group.attr}>${settings.group.slots}
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
      ref="templateView"
      sv-margin
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
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
        components: { CvSelect, CvSelectOption, CvSelectOptgroup, SvTemplateView, TimerButton },
        props: settings.props,
        data() {
          return {
            selectValue: 'cv-select-option3',
          };
        },
        methods: {
          actionChange: action('CV Select - change'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvSelectNotesMD },
    }
  );
}
