import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvNumberInputNotesMD from './cv-number-input-notes.md';
import CvNumberInput from './cv-number-input';

const stories = storiesOf('CvNumberInput', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  light: boolean('light-theme', false, consts.CONFIG)
    ? '\n  theme="light"'
    : '',
  label: text('Label', 'Text input label', consts.CONTENT),
  invalidMessage: text('slot:Invalid message', '', consts.CONTENT),
  helperText: text('slot:Helper text', '', consts.CONTENT),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  invalid: boolean('invalid', false, consts.CONFIG) ? '\n  invalid' : '',
  value: text('initial-value', '', consts.CONFIG),
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvNumberInputNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length
      ? `\n  label="${settings.label}"`
      : '';
    settings.value = settings.value.length
      ? `\n  value="${settings.value}"`
      : '';
    settings.invalidMessage = settings.invalidMessage.length
      ? `

  <template slot="invalid-message">
    ${settings.invalidMessage}
  </template>`
      : '';
    settings.helperText = settings.helperText.length
      ? `

  <template slot="helper-text">
    ${settings.helperText}
  </template>`
      : '';
    settings.listeners = !settings.vModel.includes('v-model')
      ? '\n   @change="onChange"'
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-number-input${settings.disabled}${settings.invalid}${settings.vModel}${
      settings.value
    }${settings.light}${settings.otherAttributes} ${settings.label} ${
      settings.listeners
    }>${settings.invalidMessage}${settings.helperText}
</cv-number-input>
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
          modelValue: '100',
          light: settings.light.length === 0,
        };
      },
      components: { CvNumberInput, SvTemplateView },
      template: templateViewString,
      methods: {
        onChange: action('cv-number-input - change event'),
      },
    };
  })
);
