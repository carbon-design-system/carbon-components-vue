import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvMultiSelect } from '../../packages/core/src';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: `val-${nameVal}`,
  };
});

const helperText = [undefined, 'Some helper text, takes precedence over use of "helperText" prop.'];
const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [
  { slot: 'helper-text', options: helperText },
  { slot: 'invalid-message', options: invalidMessage },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvMultiSelect',
  component: CvMultiSelect,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvMultiSelect),
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
  components: { CvMultiSelect },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
    <cv-multi-select v-bind="{...$props, ...extractedProps}" @change="actionChange" @filter="actionFilter" ref="target">
      ${slotHelp.html}
    </cv-multi-select>
    <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
  </div>`,
});

export const _CvMultiSelect = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvMultiSelect.args = {
  actionChange,
  actionFilter,
  id: 'an ID',
  label: 'MultiSelect choose an option',
  options: fruits,
  title: 'MultiSelect title',
};

_CvMultiSelect.parameters = {
  docs: {
    source: betterSource(Template, _CvMultiSelect),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, actionFilter: null, filter: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvMultiSelect },
  data() {
    return { fruits, checks: [], extractedProps: extractedPropsWithVModel };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-multi-select v-bind="{...$props, ...extractedProps}"
    v-model="checks">
    ${slotHelp.html}
  </cv-multi-select>
  <demo-container>
    <label>A standard HTML Select control
      <span v-for="item in fruits">
        <input type="checkbox" :value="item.value" v-model="checks">
        {{item.label}}
      </span>
    </label>
    <br><br>
    <span>Current value: {{ checks }}</span>
  </demo-container>
</div>`,
});

export const CvMultiSelectWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvMultiSelectWithVModel.args = {
  actionChange,
  actionFilter,
  id: 'an ID',
  label: 'MultiSelect choose an option',
  options: fruits,
  title: 'MultiSelect title',
};
CvMultiSelectWithVModel.parameters = { controls: { include: ['label', 'options'] } };
