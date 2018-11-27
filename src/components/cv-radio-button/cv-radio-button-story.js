import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvRadioButtonNotesMD from './cv-radio-button-notes.md';
import CvRadioButton from './cv-radio-button';

const stories = storiesOf('CvRadioButton', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  checked: {
    group: 'attr1',
    type: boolean,
    config: ['radio-1:checked', true, consts.CONFIG],
    value: val => (val ? 'checked' : ''),
  },
  disabled: {
    group: 'attr2',
    type: boolean,
    config: ['radio-2:disabled', true, consts.CONFIG],
    value: val => (val ? 'disabled' : ''),
  },
  vModel: {
    group: 'each',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? 'v-model="radioVal" ' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @change="actionChange"`
        : '',
  },
  otherAttributes: {
    group: 'attr3',
    type: text,
    config: ['radio-3:other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvRadioButtonNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-radio-group ${settings.group.attr}>
    <cv-radio-button name="group-1" label="radio-1" value="value-1" ${
      settings.group.each
    }${settings.group.attr1} />
    <cv-radio-button name="group-1" label="radio-2" value="value-2" ${
      settings.group.each
    }${settings.group.attr2} />
    <cv-radio-button name="group-1" label="radio-3" value="value-3" ${
      settings.group.each
    }${settings.group.attr3} />
  </cv-radio-group>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>

      <template slot="other">
        <span class="v-model-example" v-if="${
          settings.raw.vModel
        }">Radio value ''{{radioVal}}''</span>
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
}
