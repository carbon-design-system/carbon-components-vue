import { action } from '@storybook/addon-actions';

import {
  CvForm,
  CvFormGroup,
  CvTextArea,
  CvTextInput,
  CvSelect,
  CvButton,
  CvRadioButton,
  CvRadioGroup,
  CvSelectOptgroup,
  CvSelectOption,
} from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvForm',
  component: CvForm,
  argTypes: {
    default: {
      description: 'This component hosts children as content in the default slot.',
    },
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionSubmit = action('submit');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvForm,
    CvFormGroup,
    CvTextArea,
    CvTextInput,
    CvSelect,
    CvButton,
    CvRadioButton,
    CvRadioGroup,
    CvSelectOptgroup,
    CvSelectOption,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-form @submit.prevent="actionSubmit">
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
</cv-form>`,
});

export const _CvForm = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvForm.args = {};
