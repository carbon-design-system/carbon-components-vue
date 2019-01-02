import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvSelectNotesMD from './cv-select-notes.md';
import CvSelect from './cv-select';

const stories = storiesOf('CvSelect', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

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
    value: val => (val ? '\n  inline' : ''),
  },
  vModel: {
    group: 'attr',
    type: boolean,
    config: ['v-model', false, consts.OTHER],
    value: val => (val ? '\n  v-model="selectValue" ' : ''),
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
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
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
        <div v-if="showVModel">
          <span>V-Model value</span>
            <select v-model="selectValue" >
              <option value="cv-select-option1">cv-select-option 1</option>
              <option value="cv-select-option2">cv-select-option 2</option>
              <option value="cv-select-option3">cv-select-option 3</option>
              <option value="cv-select-option4">cv-select-option 4</option>
            </select>
          </span>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvSelect, SvTemplateView },
        data() {
          return {
            showVModel: settings.raw.vModel,
            selectValue: 'cv-select-option3',
            light: settings.raw.light,
          };
        },
        methods: {
          actionChange: action('CV Select - change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvSelectNotesMD },
    }
  );
}
