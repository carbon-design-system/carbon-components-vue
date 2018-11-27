import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvSelectNotesMD from './cv-select-notes.md';
import CvSelect from './cv-select';

const stories = storiesOf('CvSelect', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select label', consts.CONTENT],
    value: val => (val.length ? `\n  label="${val}"` : ''),
  },
  inline: {
    group: 'attr',
    type: boolean,
    config: ['inline', false, consts.CONFIG],
    value: val => (val ? '@change="actionChange"inline' : ''),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '@change="actionChange"v-model="selectValue" ' : ''),
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
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvSelectNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-select${settings.group.attr}>
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
        <span class="v-model-example" v-if="${
          settings.raw.vModel
        }">Select value ''{{selectValue}}''</span>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvSelect, SvTemplateView },
        data() {
          return {
            selectValue: 'cv-select-option3',
            light: settings.raw.light,
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
}
