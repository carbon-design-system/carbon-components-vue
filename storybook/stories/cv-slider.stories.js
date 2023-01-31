import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';

import { CvSlider } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvSlider',
  component: CvSlider,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    stepMultiplier: {
      control: { type: 'number' },
    },
    ...deprecatedArgTypes(CvSlider),
    ...removeArgTypes(['actionInput', 'modelEvent', 'v-model']),
  },
}; // will have dif wrapped round it in story template

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSlider },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-slider v-bind="{...$props, ...extractedProps}" @change="actionChange" ref="target" />
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvSlider = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvSlider.args = {
  actionChange,
  id: 'an ID',
  label: 'Slider label',
};

_CvSlider.parameters = {
  docs: {
    source: betterSource(Template, _CvSlider),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionInput: null, input: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvSlider },
  data() {
    return { value: 0, extractedProps: extractedPropsWithVModel };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-slider v-bind="{...$props, ...extractedProps}"
    v-model="value">
  </cv-slider>
  <demo-container>
    <label>A standard HTML input control
      <input type="number" v-model="value"></input>
    </label>
    <br><br>
    <span>Current value: {{ value }}</span>
  </demo-container>
</div>`,
});

export const CvSliderWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvSliderWithVModel.args = {
  actionChange,
  id: 'an ID',
  label: 'Slider label',
};
CvSliderWithVModel.parameters = { controls: { include: ['label'] } };
