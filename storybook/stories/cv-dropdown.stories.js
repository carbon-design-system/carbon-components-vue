import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvDropdown, CvDropdownItem } from '../../packages/core/src/';

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvDropdown',
  component: CvDropdown,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvDropdown),
    ...removeArgTypes(['actionChange', 'modelEvent', 'v-model', 'items', 'change']),
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, items: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDropdown, CvDropdownItem },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-dropdown v-bind="{...$props, ...extractedProps}" @change="actionChange" ref="target">
      ${slotHelp.html}
      <cv-dropdown-item value="10"><span>Option with value 10 & 10.0</span></cv-dropdown-item>
      <cv-dropdown-item value="20">Option with value 20</cv-dropdown-item>
      <cv-dropdown-item value="30">Option with value 30</cv-dropdown-item>
      <cv-dropdown-item value="40">Option with value 40</cv-dropdown-item>
      <cv-dropdown-item value="50">Option with value 50</cv-dropdown-item>
    </cv-dropdown>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvDropdown = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDropdown.args = {
  actionChange,
  id: 'an ID',
  label: 'Dropdown choose an option',
};

_CvDropdown.parameters = {
  docs: {
    source: betterSource(Template, _CvDropdown),
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateUsingItems = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDropdown, CvDropdownItem },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-dropdown v-bind="{...$props, ...extractedProps}" @change="actionChange" :items="['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']" />`,
});

export const _CvDropdownUsingItems = TemplateUsingItems.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDropdownUsingItems.args = {
  actionChange,
  id: 'an ID',
  label: 'Dropdown choose an option',
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDropdown, CvDropdownItem },
  data() {
    return { value: null, extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-dropdown v-bind="{...$props, ...extractedProps}"
    v-model="value">
    ${slotHelp.html}
      <cv-dropdown-item value="10"><span>Option with value 10 & 10.0</span></cv-dropdown-item>
      <cv-dropdown-item value="20">Option with value 20</cv-dropdown-item>
      <cv-dropdown-item value="30">Option with value 30</cv-dropdown-item>
      <cv-dropdown-item value="40">Option with value 40</cv-dropdown-item>
      <cv-dropdown-item value="50">Option with value 50</cv-dropdown-item>
  </cv-dropdown>
  <demo-container>
    <label>A standard HTML Dropdown control
      <select v-model="value">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvDropdownWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvDropdownWithVModel.args = {
  actionChange,
  id: 'an ID',
  label: 'Dropdown choose an option',
};
CvDropdownWithVModel.parameters = { controls: { include: ['label', 'options'] } };
