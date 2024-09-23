import {
  storybookControlsFromProps,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvCheckbox, CvCheckboxSkeleton } from '.';
import { action } from '@storybook/addon-actions';
import { props as propsCvCheck } from '../../use/cvCheck';
import { ref } from 'vue';

export default {
  title: 'Component/CvCheckbox',
  component: CvCheckbox,
  argTypes: {
    ...storybookControlsFromProps(propsCvCheck),
    value: {
      type: { raw: 'string', required: true },
      description:
        'The value associated with the input (this is also the value that is sent on submit)',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    mixed: {
      type: 'boolean',
      description: 'Specify whether the Checkbox is in an indeterminate state',
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
      description: 'Specify whether the underlying input should be checked',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
  },
  parameters: { controls: { exclude: ['change', 'update:modelValue'] } },
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
Default.parameters = { controls: { sort: 'requiredFirst' } };
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
<input id="checkbox" type="checkbox" v-model="modelValue" />
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
vModel.parameters = { controls: { sort: 'requiredFirst' } };
vModel.parameters = storyParametersObject(
  vModel.parameters,
  templateVModel,
  vModel.args
);

const templateSkeleton = `<cv-checkbox-skeleton></cv-checkbox-skeleton>`;

const TemplateSkeleton = () => {
  return {
    components: { CvCheckboxSkeleton },
    setup: () => {},
    template: templateSkeleton,
  };
};

export const Skeleton = TemplateSkeleton.bind({});
