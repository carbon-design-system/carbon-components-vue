import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvCheckboxNotesMD from './cv-checkbox-notes.md';
import CvCheckbox from './cv-checkbox';

const stories = storiesOf('CvCheckbox', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  label: text('label', 'checkbox', consts.CONFIG),
  value: `\n value="${text('value', 'check-1', consts.CONFIG)}"`,
  checked: boolean('checked', false, consts.CONFIG) ? '\n  checked' : '',
  mixed: boolean('mixed', false, consts.CONFIG) ? `\n  mixed` : '',
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="checked"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'Default',
  withNotes(CvCheckboxNotesMD)(() => {
    const settings = knobs();

    settings.label = settings.label.length
      ? `\n  label="${settings.label}"`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------
    console.dir(settings);
    const templateString = `
<cv-checkbox${settings.checked}${settings.value}${settings.mixed}${
      settings.label
    }${settings.disabled}${settings.vModel}${settings.otherAttributes}
  @change="actionChange"
  @keydown="actionKeydown"
  >
</cv-checkbox>
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
        )}">Checked value {{checked}}</span>
      </template>
    </sv-template-view>
  `;

    return {
      components: { CvCheckbox, SvTemplateView },
      data() {
        return {
          checked: settings.checked.includes('checked'),
        };
      },
      methods: {
        actionChange: action('CV Checkbox - change'),
        actionKeydown: action('CV Checkbox - keydown'),
      },
      template: templateViewString,
    };
  })
);

stories.add(
  'Array v-model',
  withNotes(CvCheckboxNotesMD)(() => {
    const templateString = `
<cv-checkbox v-model="checks" name="check-1" value="check-1" @change="actionChange" label="check-1"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-2" value="check-2" @change="actionChange" label="check-2" mixed></cv-checkbox>
<cv-checkbox v-model="checks" name="check-3" value="check-3" @change="actionChange" label="check-3"></cv-checkbox>
<cv-checkbox v-model="checks" name="check-4" value="check-4" @change="actionChange" label="check-4" mixed></cv-checkbox>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <p>This story only demonstrates the array syntax for v-model</p>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <span class="v-model-example">Checked values: {{checks}}</span>
      </template>
    </sv-template-view>
  `;

    return {
      components: { CvCheckbox, SvTemplateView },
      data() {
        return {
          checks: array(
            'Initial cheks',
            ['check-3', 'check-4'],
            ',',
            consts.CONFIG
          ),
        };
      },
      methods: {
        actionChange: action('CV Checkbox - change'),
      },
      template: templateViewString,
    };
  })
);
