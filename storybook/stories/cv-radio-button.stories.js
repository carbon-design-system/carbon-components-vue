import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ betterSource, removeArgTypes } from '../utils/storybook-helper';

import { CvRadioButton, CvRadioGroup } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvRadioButton',
  component: CvRadioButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvRadioButton),
    ...removeArgTypes(['change', 'actionChange', 'modelEvent', 'v-model']),
  },
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvRadioButton, CvRadioGroup },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-radio-group :vertical="$props.vertical">
    <cv-radio-button group="group-1"value="radio-1" label="Radio 1" @change="actionChange" ref="target" />
    <cv-radio-button group="group-1"value="radio-2" label="Radio 2" @change="actionChange" />
    <cv-radio-button group="group-1"value="radio-3" label="Radio 3" @change="actionChange"/>
  </cv-radio-group>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvRadioButton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvRadioButton.args = {
  actionChange,
};

_CvRadioButton.parameters = {
  docs: {
    source: betterSource(Template, _CvRadioButton),
  },
};
_CvRadioButton.parameters = { controls: { include: ['vertical'] } };

// these props are explicitly used by the component under test
const extractedPropsWithVModel = { actionChange: null, change: null, checked: null, mixed: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvRadioButton, CvRadioGroup },
  data() {
    return { checked: false, extractedProps: extractedPropsWithVModel, radioVal: '' };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-radio-group  :vertical="$props.vertical">
    <cv-radio-button group="group-1"value="radio-1" label="Radio 1" v-model="radioVal"  />
    <cv-radio-button group="group-1"value="radio-2" label="Radio 2" @change="actionChange" v-model="radioVal"/>
    <cv-radio-button group="group-1"value="radio-3" label="Radio 3" @change="actionChange"v-model="radioVal"/>
  </cv-radio-group>
  <demo-container>
    <label>A standard HTML radio-button
      <input type="radio" group="test" value="radio-1" v-model="radioVal">Radio 1
      <input type="radio" group="test" value="radio-2" v-model="radioVal">Radio 2
      <input type="radio" group="test" value="radio-3" v-model="radioVal">Radio 3

    </label>
    <br><br>
    <span>Current value: {{ radioVal }}</span>
  </demo-container>
</div>`,
});

export const CvRadioButtonWithVModel = TemplateWithVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvRadioButtonWithVModel.args = {};
CvRadioButtonWithVModel.parameters = { controls: { include: ['vertical'] } };
