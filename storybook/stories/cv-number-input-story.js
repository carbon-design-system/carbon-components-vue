import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvNumberInputNotesMD from '../../packages/core/src/components/cv-number-input/cv-number-input-notes.md';
import { CvNumberInput, CvNumberInputSkeleton } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvNumberInput', module);
// const storiesExperimental = storiesOf('Experimental/CvNumberInput', module);

let preKnobs = {
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
    config: ['label', 'Text input label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid message', ''],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'content',
    slot: 'invalid-message',
    value: 'Invalid message text',
  },
  helperText: {
    group: 'attr',
    type: text,
    config: ['helper text', ''],
    prop: 'helper-text',
    value: val => (val.length ? val : undefined),
  },
  helperTextSlot: {
    group: 'content',
    slot: 'helper-text',
    value: 'Some helpful textThis is some helpful text',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  value: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
    value: val => `${val}`,
  },
  numValue: {
    group: 'attr',
    type: number,
    config: ['value', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'value',
  },
  min: {
    group: 'attr',
    type: number,
    config: ['min', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'min',
    value: val => `${val}`,
  },
  numMin: {
    group: 'attr',
    type: number,
    config: ['min', 0], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'min',
  },
  max: {
    group: 'attr',
    type: number,
    config: ['max', 10], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'max',
    value: val => `${val}`,
  },
  numMax: {
    group: 'attr',
    type: number,
    config: ['max', 10], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'max',
  },
  step: {
    group: 'attr',
    type: number,
    config: ['step', 1], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'step',
    value: val => `${val}`,
  },
  numStep: {
    group: 'attr',
    type: number,
    config: ['step', 1], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'step',
  },
  mobile: {
    group: 'attr',
    type: boolean,
    config: ['mobile', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'mobile',
  },
  vModel: {
    group: 'attr',
    value: `v-model="modelValue"`,
  },
  vModelNum: {
    group: 'attr',
    value: `v-model="modelValueNum"`,
  },
  events: {
    group: 'attr',
    value: `@input="onInput"`,
  },
};

let variants = [
  {
    name: 'default',
    excludes: [
      'vModel',
      'invalidMessageSlot',
      'helperTextSlot',
      'numValue',
      'vModelNum',
      'numMin',
      'numMax',
      'numStep',
    ],
  },
  {
    name: 'number value',
    excludes: ['vModel', 'invalidMessageSlot', 'helperTextSlot', 'value', 'vModelNum', 'min', 'max', 'step'],
  },
  {
    name: 'helper and invalid slots',
    excludes: ['vModel', 'events', 'numValue', 'vModelNum', 'numMin', 'numMax', 'numStep'],
  },
  { name: 'minimal', includes: ['label'] },
  { name: 'vModel', includes: ['label', 'vModel', 'step', 'mobile', 'events'] },
  { name: 'vModelNum', includes: ['label', 'vModelNum', 'numStep', 'mobile', 'events'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-number-input${settings.group.attr}>${settings.group.content}
</cv-number-input>
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
          <label>Model value:
            <input type="number" v-model="modelValue" :step="propStep" />
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvNumberInput, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            modelValue: '100',
            modelValueNum: 100,
            storyName: story.name,
          };
        },
        watch: {
          modelValue() {
            let val;
            val = parseFloat(this.modelValue);

            if (isNaN(val)) {
              val = 0;
            }
            this.modelValueNum = val;
          },
          modelValueNum() {
            // NOTE: DELIBERATE USE OF != TO COMPARE this.modelValueNum and this.modelValue
            if (this.modelValue != this.modelValueNum) {
              this.modelValue = '' + this.modelValueNum;
            }
          },
        },
        methods: {
          onInput: action('cv-number-input - input event'),
        },
        computed: {
          propStep() {
            return this.$props.step || this.$props.numStep.toString();
          },
        },
      };
    },
    {
      notes: { markdown: CvNumberInputNotesMD },
    }
  );
}

preKnobs = {};
variants = [{ name: 'skeleton' }];
storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-number-input-skeleton></cv-number-input-skeleton>
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
        components: { CvNumberInputSkeleton, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvNumberInputNotesMD },
    }
  );
}
