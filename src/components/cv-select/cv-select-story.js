import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvSelectNotesMD from './cv-select-notes.md';
import CvSelect from './cv-select';

const stories = storiesOf('CvSelect', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  light: boolean('light-theme', false, consts.CONFIG)
    ? '\n  theme="light"'
    : '',
  inline: boolean('inline', false, consts.CONFIG) ? ' inline' : '',
  vModel: boolean('v-model', false, consts.OTHER)
    ? 'v-model="selectValue" '
    : '',
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvSelectNotesMD)(() => {
    const settings = knobs();
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
  <cv-select label="test-label" @change="actionChange" ${settings.inline} ${
      settings.vModel
    }${settings.light} ${settings.otherAttributes}>
    <cv-select-option disabled selected hidden>Choose an option</cv-select-option>
    <cv-select-option value="solong">A much longer cv-select-option that is worth having around to check how text flows</cv-select-option>
    <cv-select-optgroup label="Category 1">
      <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
      <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
    </cv-select-optgroup>
    <cv-select-optgroup label="Category 2">
      <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
      <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
    </cv-select-optgroup>
  </cv-select>
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
        )}">Select value ''{{selectValue}}''</span>
      </template>
    </sv-template-view>
  `;

    return {
      components: { CvSelect, SvTemplateView },
      data() {
        return {
          selectValue: 'cv-select-option3',
          light: settings.light.length === 0,
        };
      },
      // test changing of selectValue
      // mounted() {
      //   setTimeout(() => {
      //     this.selectValue = 'cv-select-option1';
      //   }, 1000);
      // },
      methods: {
        actionChange: action('CV Select - change'),
      },
      template: templateViewString,
    };
  })
);
