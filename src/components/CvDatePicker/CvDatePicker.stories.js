import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvDatePicker } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  dateLabel: 'Date label',
  invalidText: 'Invalid value',
};

export default {
  title: `${sbCompPrefix}/CvDatePicker`,
  component: CvDatePicker,
  parameters: {
    a11y: {
      config: {
        rules: [],
      },
      manual: true,
    },
  },
  argTypes: {
    dateLabel: { type: String, description: 'Date picker label' },
    invalidText: {
      type: String,
      description: 'Date picker text on invalid value',
    },
  },
};

const template = `
<div>
  <cv-date-picker v-bind='args' @change='onChange'>
  </cv-date-picker>
</div>
`;
const Template = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = initArgs;
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const now = new Date();
const modelValue = ref(now.toLocaleDateString());
const templateVModel = `
<div>
  <cv-date-picker v-bind='args' @change='onChange' v-model="modelValue">
  </cv-date-picker>
</div>
<div style="margin: 32px 0;">
  <div style="font-size: 150%;">Sample interaction</div>
  <label for="date-model" style='margin-right: 0.5rem'>V-model:</label>
  <input id="date-model" type="text" :value="modelValue" @change="ev => modelValue = ev.currentTarget.value"/>
</div>
`;

// <input id="date-model" type="date" :value="now.toLocaleDateString('en-CA')" @change="ev => modelValue = new Date(ev.currentTarget.value).toLocaleDateString()"/>

const TemplateVModel = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      modelValue,
      now,
      onChange: action('change'),
      onFilter: action('filter'),
    }),
    template: templateVModel,
  };
};

export const vModel = TemplateVModel.bind({});
vModel.args = initArgs;
vModel.parameters = storyParametersObject(
  vModel.parameters,
  templateVModel,
  vModel.args
);
