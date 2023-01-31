import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import { CvToggle } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvToggle',
  component: CvToggle,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvToggle),
    ...removeArgTypes(['actionChange', 'modelEvent', 'v-model']),
  },
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvToggle },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-toggle v-bind="{...$props, ...extractedProps}" @change="actionChange" ref="target" />
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvToggle = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvToggle.args = {
  actionChange,
  label: 'Toggle Label',
  value: 'toggle-1',
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, checked: null, mixed: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvToggle },
  data() {
    return { checked: false, extractedProps: extractedPropsWithVModel };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-toggle v-bind="{...$props, ...extractedProps}" v-model="checked"  />
  <demo-container>
    <label>A standard HTML checkbox
      <input type="checkbox" v-model="checked" />
    </label>
    <br><br>
    <span>Current value: {{ checked }}</span>
  </demo-container>
</div>`,
});

export const CvToggleWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvToggleWithVModel.args = {
  label: 'Toggle Label',
  value: 'toggle-1',
};
CvToggleWithVModel.parameters = { controls: { include: ['label', 'value'] } };

// these props are explicitly used by the component under test
const extractedPropsWithVModelArray = { actionChange: null, change: null, checked: null, mixed: null, value: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateModelWithVModelArray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvToggle },
  data() {
    return { toggles: ['toggle-1', 'toggle-2', 'toggle-3'], values: [], extractedProps: extractedPropsWithVModelArray };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-toggle v-for="item in toggles" v-bind="{...$props, ...extractedProps}" v-model="values" :label="item" :value="item" />
  <demo-container>
    <label v-for="item in toggles" v-bind="{...$props, ...extractedProps}">
      <input type="checkbox" v-model="values" :value="item" />
      {{item}}
      <br>
    </label>
    <br>
    <br>
    <span>Current value of array: {{ values }}</span>
   </demo-container>
</div>`,
});

export const CvToggleWithVModelArray = TemplateModelWithVModelArray.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvToggleWithVModelArray.args = {};
CvToggleWithVModelArray.parameters = { controls: { include: [] } };
