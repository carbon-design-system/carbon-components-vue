import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvRadioButtonNotesMD from './cv-radio-button-notes.md';
import CvRadioButton from './cv-radio-button';

const stories = storiesOf('CvRadioButton', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  checked: boolean('radio-1:checked', true, consts.CONFIG) ? 'checked' : '',
  disabled: boolean('radio-2:disabled', true, consts.CONFIG) ? 'disabled' : '',
  vModel: boolean('v-model', false, consts.OTHER) ? 'v-model="radioVal" ' : '',
  otherAttributes: text('radio-3:other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvRadioButtonNotesMD)(() => {
    const settings = knobs();
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
  <cv-radio-group @change="actionChange">
    <cv-radio-button name="group-1" label="radio-1" value="value-1" ${
      settings.vModel
    }${settings.checked} />
    <cv-radio-button name="group-1" label="radio-2" value="value-2" ${
      settings.vModel
    }${settings.disabled} />
    <cv-radio-button name="group-1" label="radio-3" value="value-3" ${
      settings.vModel
    }${settings.otherAttributes} />
  </cv-radio-group>
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
        )}">Radio value ''{{radioVal}}''</span>
      </template>
    </sv-template-view>
  `;

    return {
      components: { CvRadioButton, SvTemplateView },
      data() {
        return {
          radioVal: 'value-2',
        };
      },
      methods: {
        actionChange: action('CV Radio Button - change'),
      },
      template: templateViewString,
    };
  })
);
