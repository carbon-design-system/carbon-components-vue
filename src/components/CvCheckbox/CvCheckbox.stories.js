import {
  sbCompPrefix,
  storybookControlsFromProps,
  storyParametersObject,
} from '@/global/storybook-utils';

import { CvCheckbox } from '.';
import { action } from '@storybook/addon-actions';
import { props as propsCvCheck } from '@/use/cvCheck';
import { ref } from 'vue';

export default {
  title: `${sbCompPrefix}/CvCheckbox`,
  component: CvCheckbox,
  argTypes: {
    ...storybookControlsFromProps(propsCvCheck),
    label: { description: 'checkbox label' },
    value: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    hideLabel: {
      description:
        'makes the label visually hidden but still labels the checkbox',
    },
    mixed: {
      type: 'boolean',
      description: 'if true aria-checkbox set to mixed if checked is false',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    change: { description: 'emitted when state changes' },
    modelValue: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    checked: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
  },
};

const template = `
<cv-checkbox @change="onChange" v-bind='args' >
</cv-checkbox>
  `;
const Template = args => {
  return {
    components: { CvCheckbox },
    setup: () => ({ args, onChange: action('change') }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = { label: 'checkbox', value: 'check-1' };
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

// v-model story
const modelValue = ref(false);
const templateVModel = `<div>
<cv-checkbox @change="onChange" v-bind='args' v-model="modelValue">
</cv-checkbox>
<div style="margin-top:1rem; background-color: #888888;  padding:1rem"><div style="font-size: 150%">Sample interaction</div>
<label for="checkbox">V-model: Check 1:</label>
<input id="checkbox" type="checkbox" @change="(ev) => {modelValue = ev.currentTarget.checked}" />
<div>Checked: <span style="font-weight: bold;">{{modelValue}}</span></div>
</div>
</div>
  `;

const TemplateVModel = args => {
  return {
    components: { CvCheckbox },
    setup: () => ({
      args,
      modelValue,
      onChange: action('change'),
    }),
    template: templateVModel,
  };
};
export const vModel = TemplateVModel.bind({});
vModel.args = {
  label: 'checkbox',
  value: 'check-1',
};
vModel.parameters = storyParametersObject(
  vModel.parameters,
  templateVModel,
  vModel.args
);
