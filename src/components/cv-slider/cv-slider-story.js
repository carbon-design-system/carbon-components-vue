import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvSliderNotesMD from './cv-slider-notes.md';
import CvSlider from './cv-slider';

const stories = storiesOf('CvSlider', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['Label', 'Text input label', consts.CONTENT],
    value: val => (val.length ? `\n  Label="${val}"` : ''),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? '\n  disabled' : ''),
  },
  min: {
    group: 'attr',
    type: text,
    config: ['min', '', consts.CONFIG],
    value: val => (val.length ? `\n  min="${val}"` : ''),
  },
  max: {
    group: 'attr',
    type: text,
    config: ['max', '', consts.CONFIG],
    value: val => (val.length ? `\n  max="${val}"` : ''),
  },
  value: {
    group: 'attr',
    type: text,
    config: ['initial-value', '', consts.CONFIG],
    value: val => (val.length ? `\n  value="${val}"` : ''),
  },
  step: {
    group: 'attr',
    type: text,
    config: ['step', '', consts.CONFIG],
    value: val => (val.length ? `\n  step="${val}"` : ''),
  },
  stepMultiplier: {
    group: 'attr',
    type: text,
    config: ['step-multiplier', '', consts.CONFIG],
    value: val => (val.length ? `\n  step-multiplier="${val}"` : ''),
  },
  minLabel: {
    group: 'attr',
    type: text,
    config: ['min-label', '', consts.CONFIG],
    value: val => (val.length ? `\n  min-label="${val}"` : ''),
  },
  maxLabel: {
    group: 'attr',
    type: text,
    config: ['max-label', '', consts.CONFIG],
    value: val => (val.length ? `\n  max-label="${val}"` : ''),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val =>
      val ? '\n  v-model="modelValue"' : '\n  @change="afterChange"',
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
    withNotes(CvSliderNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-slider${settings.group.attr}></cv-slider>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="!light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div class="v-model-example" v-if="${
          settings.raw.vModel
        }">Model value: {{modelValue}}</div>
        <div>Note slider defaults to min: 0, max: 100, value: Math.floor((min + max) / 2). This is consistent with standard slider when submitted.</div>
      </template>
    </sv-template-view>
  `;

      return {
        data() {
          return {
            modelValue: '45',
            light: settings.raw.light,
          };
        },
        components: { CvSlider, SvTemplateView },
        template: templateViewString,
        methods: {
          afterChange: action('cv-slider - after change event'),
          // afterChange() { console.log('after change event'); },
        },
      };
    })
  );
}
