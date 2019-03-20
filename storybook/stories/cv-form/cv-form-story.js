import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvFormNotesMD from './cv-form-notes.md';
import CvForm from './cv-form';
import CvTextInput from '../cv-text-input/cv-text-input';
import CvTextArea from '../cv-text-area/cv-text-area';
import CvSelect from '../cv-select/cv-select';

const storiesDefault = storiesOf('Default/CvForm', module);
const storiesExperimental = storiesOf('Experimental/CvForm', module);
import { override, reset } from '../../_internal/_feature-flags';

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
  <cv-form>
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
    <cv-button disabled>Done</cv-button>
  </cv-form>
    `;

        // ----------------------------------------------------------------

        const templateViewString = `
      <sv-template-view
        :sv-experimental="experimental"
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: {
            CvForm,
            CvTextInput,
            CvTextArea,
            CvSelect,
            SvTemplateView,
          },
          data: () => ({ experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvFormNotesMD },
      }
    );
  }
}
