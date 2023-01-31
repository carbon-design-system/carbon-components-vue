import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ betterSource, removeArgTypes } from '../utils/storybook-helper';

import { CvCheckbox } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvCheckbox',
  component: CvCheckbox,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvCheckbox),
    ...removeArgTypes(['change', 'actionChange', 'modelEvent', 'v-model']),
  },
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvCheckbox },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-checkbox v-bind="{...$props, ...extractedProps}" @change="actionChange" ref="target" />
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvCheckbox = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvCheckbox.args = {
  actionChange,
  label: 'Checkbox Label',
  value: 'check-1',
};

_CvCheckbox.parameters = {
  docs: {
    source: betterSource(Template, _CvCheckbox),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, checked: null, mixed: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvCheckbox },
  data() {
    return { checked: false, extractedProps: extractedPropsWithVModel };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-checkbox v-bind="{...$props, ...extractedProps}" v-model="checked"  />
  <demo-container>
    <label>A standard HTML checkbox
      <input type="checkbox" v-model="checked" />
    </label>
    <br><br>
    <span>Current value: {{ checked }}</span>
  </demo-container>
</div>`,
});

export const CvCheckboxWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvCheckboxWithVModel.args = {
  label: 'Checkbox Label',
  value: 'check-1',
};
CvCheckboxWithVModel.parameters = { controls: { include: ['label', 'value'] } };

// these props are explicitly used by the component under test
const extractedPropsWithVModelArray = { actionChange: null, change: null, checked: null, mixed: null, value: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateModelWithVModelArray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvCheckbox },
  data() {
    return { checkboxes: ['check-1', 'check-2', 'check-3'], checks: [], extractedProps: extractedPropsWithVModelArray };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-checkbox v-for="item in checkboxes" v-bind="{...$props, ...extractedProps}" v-model="checks" :label="item" :value="item" />
  <demo-container>
    <label v-for="item in checkboxes" v-bind="{...$props, ...extractedProps}">
      <input type="checkbox" v-model="checks" :value="item" />
      {{item}}
      <br>
    </label>
    <br>
    <br>
    <span>Current value of array: {{ checks }}</span>
   </demo-container>
</div>`,
});

export const CvCheckboxWithVModelArray = TemplateModelWithVModelArray.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvCheckboxWithVModelArray.args = {};
CvCheckboxWithVModelArray.parameters = { controls: { include: [] } };
