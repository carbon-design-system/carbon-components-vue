import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvFormNotesMD from '@carbon/vue/src/components/cv-form/cv-form-notes.md';
import CvForm from '@carbon/vue/src/components/cv-form/cv-form';
import CvTextInput from '@carbon/vue/src/components/cv-text-input/cv-text-input';
import CvTextArea from '@carbon/vue/src/components/cv-text-area/cv-text-area';
import CvSelect from '@carbon/vue/src/components/cv-select/cv-select';
import CvSelectOption from '@carbon/vue/src/components/cv-select/cv-select-option';
import CvSelectOptgroup from '@carbon/vue/src/components/cv-select/cv-select-optgroup';

const storiesDefault = storiesOf('Current/CvForm', module);
const storiesExperimental = storiesOf('Experimental/CvForm', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(false)) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
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
            CvSelectOptgroup,
            CvSelectOption,
            SvTemplateView,
          },
          data: () => ({ experimental: version.experimental }),
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
