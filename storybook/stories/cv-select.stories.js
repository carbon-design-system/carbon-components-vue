import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvSelect, CvSelectOption, CvSelectOptgroup } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvSelect',
  component: CvSelect,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvSelect),
    ...removeArgTypes(['actionChange', 'actionFilter', 'modelEvent', 'v-model', 'filter', 'change']),
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');
const actionFilter = action('filter');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionFilter: null, filter: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSelect, CvSelectOption, CvSelectOptgroup },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-select v-bind="{...$props, ...extractedProps}" @change="actionChange" @filter="actionFilter" ref="target">>
    ${slotHelp.html}
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
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvSelect = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvSelect.args = {
  actionChange,
  actionFilter,
  id: 'an ID',
  label: 'Select choose an option',
};

_CvSelect.parameters = {
  docs: {
    source: betterSource(Template, _CvSelect),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, actionFilter: null, filter: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSelect, CvSelectOption, CvSelectOptgroup },
  data() {
    return { value: null, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-select v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
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
  <demo-container>
    <label>A standard HTML Select control
      <select v-model="value">
        <option value="cv-select-option1">cv-select-option 1</option>
        <option value="cv-select-option2">cv-select-option 2</option>
        <option value="cv-select-option3">cv-select-option 3</option>
        <option value="cv-select-option4">cv-select-option 4</option>
      </select>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvSelectWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvSelectWithVModel.args = {
  actionChange,
  actionFilter,
  id: 'an ID',
  label: 'Select choose an option',
};
CvSelectWithVModel.parameters = { controls: { include: ['label', 'options'] } };
