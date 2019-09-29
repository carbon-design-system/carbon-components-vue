import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvSliderNotesMD from '@carbon/vue/src/components/cv-slider/cv-slider-notes.md';
import { CvSlider, CvSliderSkeleton } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvSlider', module);
const storiesExperimental = storiesOf('Experimental/CvSlider', module);

let preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'theme',
      value: val => (val ? 'light' : ''),
    },
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Slider label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'label',
    },
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'disabled',
    },
  },
  min: {
    group: 'attr',
    type: text,
    config: ['min', '-50'], // consts.CONFIG],
    prop: { name: 'min' },
  },
  max: {
    group: 'attr',
    type: text,
    config: ['max', '150'], // consts.CONFIG],
    prop: { name: 'max' },
  },
  value: {
    group: 'attr',
    type: text,
    config: ['value', '50'], // consts.CONFIG],
    prop: { name: 'value' },
  },
  step: {
    group: 'attr',
    type: text,
    config: ['step', '1'], // consts.CONFIG],
    prop: { name: 'step' },
  },
  stepMultiplier: {
    group: 'attr',
    type: text,
    config: ['step-multiplier', '10'], // consts.CONFIG],
    prop: { name: 'step-multiplier' },
  },
  minLabel: {
    group: 'attr',
    type: text,
    config: ['min-label', 'Min'], // consts.CONFIG],
    prop: { name: 'min-label' },
  },
  maxLabel: {
    group: 'attr',
    type: text,
    config: ['max-label', 'Max'], // consts.CONFIG],
    prop: { name: 'max-label' },
  },
  vModel: {
    group: 'attr',
    value: 'v-model="modelValue"',
  },
  events: {
    group: 'attr',
    value: '@change="onChange"',
  },
};

let variants = [
  { name: 'default', excludes: ['vModel', 'events'] },
  { name: 'minimal', includes: ['label'] },
  { name: 'events', includes: ['label', 'events'] },
  { name: 'vModel', includes: ['label', 'vModel'] },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-slider${settings.group.attr}></cv-slider>
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
            <input type="text" v-model="modelValue" />
          </label>
        </div>
        <div>Note cv-slider defaults to min: 0, max: 100, value: Math.floor((min + max) / 2). This is consistent with standard slider when submitted.</div>
      </template>
    </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: '45',
          };
        },
        components: { CvSlider, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('cv-slider - change event'),
        },
      };
    },
    {
      notes: { markdown: CvSliderNotesMD },
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

      const templateString = `
        <cv-slider-skeleton></cv-slider-skeleton>
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
        components: { CvSliderSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvSliderNotesMD },
    }
  );
}
