import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvToggleNotesMD from './cv-toggle-notes.md';
import CvToggle from './cv-toggle';

const stories = storiesOf('CvToggle', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  small: boolean('small', false, consts.CONFIG) ? '\n  small' : '',
  textLeft: text('slot:text-left', 'Off', consts.CONTENT),
  textRight: text('slot:text-right', 'On', consts.CONTENT),
  checked: boolean('checked', false, consts.CONFIG) ? '\n  checked' : '',
  disabled: boolean('disabled', false, consts.CONFIG) ? '\n  disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? '\n  v-model="checked"'
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'Default',
  withNotes(CvToggleNotesMD)(() => {
    const settings = knobs();

    settings.textLeft = settings.textLeft.length
      ? `\n  <template slot="text-left">${settings.textLeft}</template>`
      : '';
    settings.textRight = settings.textRight.length
      ? `\n  <template slot="text-right">${settings.textRight}</template>`
      : '';
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-toggle${settings.checked}${settings.disabled}${settings.small}${
      settings.vModel
    }${settings.otherAttributes}
  @change="actionChange"
  @keydown="actionKeydown"
  >${settings.textLeft}${settings.textRight}
</cv-toggle>
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
      components: { CvToggle, SvTemplateView },
      data() {
        return {
          checked: settings.checked.includes('checked'),
        };
      },
      methods: {
        actionChange: action('CV Toggle - change'),
        actionKeydown: action('CV Toggle - keydown'),
      },
      template: templateViewString,
    };
  })
);

stories.add(
  'Array v-model',
  withNotes(CvToggleNotesMD)(() => {
    const templateString = `
<cv-toggle v-model="checks" name="check-1" value="check-1" @change="actionChange"></cv-toggle>
<cv-toggle v-model="checks" name="check-2" value="check-2" @change="actionChange"></cv-toggle>
<cv-toggle v-model="checks" name="check-3" value="check-3" @change="actionChange"></cv-toggle>
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
      components: { CvToggle, SvTemplateView },
      data() {
        return {
          checks: array(
            'Initial cheks',
            ['check-3', 'check-2'],
            ',',
            consts.CONFIG
          ),
        };
      },
      methods: {
        actionChange: action('CV Toggle - change'),
      },
      template: templateViewString,
    };
  })
);
