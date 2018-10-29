import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvSliderNotesMD from './cv-slider-notes.md';
import CvSlider from './cv-slider';

const stories = storiesOf('CvSlider', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('Label', 'Text input label', consts.CONTENT),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  min: text('min', '', consts.CONFIG),
  max: text('max', '', consts.CONFIG),
  value: text('initial-value', '', consts.CONFIG),
  step: text('step', '', consts.CONFIG),
  stepMultiplier: text('step-multiplier', '', consts.CONFIG),
  minLabel: text('min-label', '', consts.CONFIG),
  maxLabel: text('max-label', '', consts.CONFIG),
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvSliderNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length
      ? `\n  label="${settings.label}"`
      : '';
    settings.min = settings.min.length ? `\n  min="${settings.min}"` : '';
    settings.max = settings.max.length ? `\n  max="${settings.max}"` : '';
    settings.value = settings.value.length
      ? `\n  value="${settings.value}"`
      : '';
    settings.stepMultiplier = settings.stepMultiplier.length
      ? `\n  step-multiplier="${settings.stepMultiplier}"`
      : '';
    settings.step = settings.step.length ? `\n  step="${settings.step}"` : '';
    settings.minLabel = settings.minLabel.length
      ? `\n  min-label="${settings.minLabel}"`
      : ``;
    settings.maxLabel = settings.maxLabel.length
      ? `\n  max-label="${settings.maxLabel}"`
      : ``;
    settings.listeners = !settings.vModel.includes('v-model')
      ? '\n @change="afterChange"'
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-slider${Object.values(settings).join('')}></cv-slider>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <div class="v-model-example" v-if="${settings.vModel.includes(
          'v-model'
        )}">Model value: {{modelValue}}</div>
        <div>Note slider defaults to min: 0, max: 100, value: Math.floor((min + max) / 2). This is consistent with standard slider when submitted.</div>
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
      methods: {
        afterChange: action('cv-slider - after change event'),
        // afterChange() { console.log('after change event'); },
      },
    };
  })
);
