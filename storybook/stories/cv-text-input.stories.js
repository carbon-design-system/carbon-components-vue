import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvTextInput } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];
const warnText = [undefined, 'Warning text takes precedence over use of "warnText" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
  { slot: 'warn-text', options: warnText },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTextInput',
  component: CvTextInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvTextInput),
    ...removeArgTypes(['actionChange', 'actionInput', 'modelEvent', 'v-model']),
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');
const actionInput = action('input');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTextInput },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-text-input v-bind="{...$props, ...extractedProps}" @change="actionChange" @input="actionInput" ref="target">
    ${slotHelp.html}
  </cv-text-input>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvTextInput = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTextInput.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'TextInput label',
  placeholder: 'Placeholder text',
};

_CvTextInput.parameters = {
  docs: {
    source: betterSource(Template, _CvTextInput),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTextInput },
  data() {
    return { value: null, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-text-input v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
  </cv-text-input>
  <demo-container>
    <label>A standard HTML input control
      <input type="text" v-model="value"></input>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvTextInputWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvTextInputWithVModel.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'TextInput label',
  placeholder: 'Placeholder text',
};
CvTextInputWithVModel.parameters = { controls: { include: ['label'] } };
