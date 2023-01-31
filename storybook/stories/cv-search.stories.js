import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvSearch } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvSearch',
  component: CvSearch,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvSearch),
    ...removeArgTypes(['actionChange', 'actionInput', 'modelEvent', 'v-model', 'input', 'change']),
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');
const actionInput = action('input');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSearch },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-search v-bind="{...$props, ...extractedProps}" @change="actionChange" @input="actionInput">
      ${slotHelp.html}
    </cv-search>`,
});

export const _CvSearch = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvSearch.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'Search label',
  placeholder: 'Placeholder text',
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSearch },
  data() {
    return { value: null, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-search v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
  </cv-search>
  <demo-container>
    <label>A standard HTML input control
      <input type="text" v-model="value"></input>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvSearchWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvSearchWithVModel.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'Search label',
  placeholder: 'Placeholder text',
};
CvSearchWithVModel.parameters = { controls: { include: ['label'] } };
