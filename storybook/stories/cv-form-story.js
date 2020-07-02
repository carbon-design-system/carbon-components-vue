import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvFormNotesMD from '../../packages/core/src/components/cv-form/cv-form-notes.md';
import {
  CvForm,
  CvTextArea,
  CvTextInput,
  CvSelect,
  CvButton,
  CvSelectOptgroup,
  CvSelectOption,
} from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvForm', module);
// const storiesExperimental = storiesOf('Experimental/CvForm', module);

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
  <cv-form @submit.prevent="actionSubmit">
    <cv-text-input
      label="Example text label"
      helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
      placeholder="Optional placeholder text">
    </cv-text-input>
    <cv-text-area
      label="Example text label"
      helper-text="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
      placeholder="Optional placeholder text">
    </cv-text-area>
    <cv-select label="Example select label">
      <cv-select-option disabled selected hidden>Choose an option</cv-select-option>
      <cv-select-optgroup label="Category 1">
        <cv-select-option value="cv-select-option1">cv-select-option 1</cv-select-option>
        <cv-select-option value="cv-select-option2">cv-select-option 2</cv-select-option>
      </cv-select-optgroup>
      <cv-select-optgroup label="Category 2">
        <cv-select-option value="cv-select-option3">cv-select-option 3</cv-select-option>
        <cv-select-option value="cv-select-option4">cv-select-option 4</cv-select-option>
      </cv-select-optgroup>
    </cv-select>
    <cv-button>Submit</cv-button>
  </cv-form>
    `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: {
          CvForm,
          CvButton,
          CvTextInput,
          CvTextArea,
          CvSelect,
          CvSelectOptgroup,
          CvSelectOption,
          SvTemplateView,
        },

        template: templateViewString,
        props: settings.props,
        mounted() {
          this.doSubmit = action('cv-form -submit event');
        },
        methods: {
          actionSubmit(ev) {
            // eslint-disable-next-line
            console.dir([].slice.call(ev.target, [0, ev.target.length]));

            this.doSubmit();
          },
        },
      };
    },
    {
      notes: { markdown: CvFormNotesMD },
    }
  );
}
