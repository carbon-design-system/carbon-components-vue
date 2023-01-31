import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvTextArea } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTextArea',
  component: CvTextArea,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvTextArea),
    ...removeArgTypes(['actionChange', 'actionInput', 'modelEvent', 'v-model', 'input', 'change']),
    default: {
      description: 'Thd default slot of the OverflowMenuItem hosts children as content.',
    },
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');
const actionInput = action('input');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTextArea },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-text-area v-bind="{...$props, ...extractedProps}" @change="actionChange" @input="actionInput" ref="target">
    ${slotHelp.html}
  </cv-text-area>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvTextArea = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTextArea.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'TextArea label',
  placeholder: 'Placeholder text',
};

_CvTextArea.parameters = {
  docs: {
    source: betterSource(Template, _CvTextArea),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTextArea },
  data() {
    return { value: null, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-text-area v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
  </cv-text-area>
  <demo-container>
    <label>A standard HTML textarea
      <textarea v-model="value" />
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvTextAreaWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvTextAreaWithVModel.args = {
  actionChange,
  actionInput,
  id: 'an ID',
  label: 'TextArea label',
  placeholder: 'Placeholder text',
};
CvTextAreaWithVModel.parameters = { controls: { include: ['label'] } };
