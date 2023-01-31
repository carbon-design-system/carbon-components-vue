import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvNumberInput } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];
const warnText = [undefined, 'Some warn text, takes precedence over use of "warnText" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
  { slot: 'warn-text', options: warnText },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvNumberInput',
  component: CvNumberInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvNumberInput),
    ...removeArgTypes(['actionInput', 'modelEvent', 'v-model']),
  },
}; // will have dif wrapped round it in story template

const actionInput = action('input');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvNumberInput },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-number-input v-bind="{...$props, ...extractedProps}" @input="actionInput" ref="target">
    ${slotHelp.html}
  </cv-number-input>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvNumberInput = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvNumberInput.args = {
  actionInput,
  id: 'an ID',
  label: 'NumberInput label',
};

_CvNumberInput.parameters = {
  docs: {
    source: betterSource(Template, _CvNumberInput),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvNumberInput },
  data() {
    return { value: 0, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-number-input v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
  </cv-number-input>
  <demo-container>
    <label>A standard HTML input control
      <input type="number" v-model="value"></input>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvNumberInputWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvNumberInputWithVModel.args = {
  actionInput,
  id: 'an ID',
  label: 'NumberInput label',
};
CvNumberInputWithVModel.parameters = { controls: { include: ['label'] } };
