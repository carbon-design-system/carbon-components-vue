import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTimePickerNotesMD from './cv-time-picker-notes.md';
import CvTimePicker from './cv-time-picker';

const stories = storiesOf('CvTimePicker', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  light: boolean('light-theme', false, consts.CONFIG)
    ? '\n  theme="light"'
    : '',
  label: text('label', '', consts.CONTENT),
  initialValue: text(
    'initial-value',
    `{ time: '', ampm: '', timezone: ''}`,
    consts.CONFIG
  ),
  pattern: text('pattern', '', consts.CONFIG),
  placeholder: text('placeholder', '', consts.CONFIG),
  timezones: array(
    'timezones',
    [
      { label: 'Timezone-1', value: 'timezone1' },
      { label: 'Timezone-2', value: 'timezone2' },
    ],
    consts.CONFIG
  ),
  timezonesSelectLabel: text('timzones-select-label', '', consts.CONTENT),
  ampmSelectLabel: text('ampm-select-label', '', consts.CONTENT),
  invalidMessage: text('invalid-message', '', consts.CONTENT),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',

  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvTimePickerNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length
      ? `\n  label="${settings.label}"`
      : '';
    settings.pattern = settings.pattern.length
      ? `\n  pattern="${settings.pattern}"`
      : '';
    settings.placeholder = settings.placeholder.length
      ? `\n  placeholder="${settings.placeholder}"`
      : '';
    settings.timezonesSelectLabel = settings.timezonesSelectLabel.length
      ? `\n  timezonesSelectLabel="${settings.timezonesSelectLabel}"`
      : '';
    settings.ampmSelectLabel = settings.ampmSelectLabel.length
      ? `\n  ampmSelectLabel="${settings.ampmSelectLabel}"`
      : '';
    settings.invalidMessage = settings.invalidMessage.length
      ? `\n  invalidMessage="${settings.invalidMessage}"`
      : '';
    settings.listeners = !settings.vModel.includes('v-model')
      ? '\n   @change="onChange"'
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------
    const templateString = `
<cv-time-picker :initial-value="initialValue" ${settings.vModel}${
      settings.label
    }${settings.pattern}${settings.placeholder}${settings.light}${
      settings.timezonesSelectLabel
    }${settings.ampmSelectLabel}${settings.invalidMessage}${settings.disabled}${
      settings.otherAttributes
    }${settings.listeners}>
</cv-time-picker>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <span class="v-model-example" v-if="${settings.vModel.includes(
          'v-model'
        )}">Model value: {{modelValue}}</span>
      </template>
    </sv-template-view>
  `;

    return {
      data() {
        return {
          initialValue: settings.initialValue,
          modelValue: { value: '', ampm: 'AM', timezone: '' },
          light: settings.light.length === 0,
        };
      },
      components: { CvTimePicker, SvTemplateView },
      template: templateViewString,
      methods: {
        onChange: action('cv-time-picker - chnage event'),
      },
    };
  })
);
