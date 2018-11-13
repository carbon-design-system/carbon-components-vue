import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvTextAreaNotesMD from './cv-text-area-notes.md';
import CvTextArea from './cv-text-area';

const stories = storiesOf('CvTextArea', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  light: boolean('light-theme', false, consts.CONFIG)
    ? '\n  theme="light" '
    : '',
  label: text('label', 'Text area label', consts.CONTENT),
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="modelValue"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvTextAreaNotesMD)(() => {
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
<cv-text-area${settings.disabled}${settings.vModel}${settings.light}${
      settings.otherAttributes
    }
  label="${settings.label}" ${settings.listeners}>
</cv-text-area>
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
          modelValue: 'initial value',
          light: settings.light.length === 0,
        };
      },
      components: { CvTextArea, SvTemplateView },
      template: templateViewString,
      methods: {
        onInput: action('cv-text-area - input event'),
      },
    };
  })
);
