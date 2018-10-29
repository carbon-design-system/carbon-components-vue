import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTextInputNotesMD from './cv-text-input-notes.md';
import CvTextInput from './cv-text-input';

const stories = storiesOf('CvTextInput', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('label', 'Text input label', consts.CONTENT),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvTextInputNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length ? `${settings.label}` : '';
    settings.listeners = !settings.vModel.includes('v-model')
      ? '\n   @input="onInput"'
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-text-input${settings.disabled}${settings.vModel}${settings.otherAttributes}
  label="${settings.label}" ${settings.listeners}>
</cv-text-input>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
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
          modelValue: 'initial value',
        };
      },
      components: { CvTextInput, SvTemplateView },
      template: templateViewString,
      methods: {
        onInput: action('cv-text-input - input event'),
      },
    };
  })
);
