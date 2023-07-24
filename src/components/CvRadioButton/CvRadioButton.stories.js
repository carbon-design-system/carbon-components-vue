import { action } from '@storybook/addon-actions';
import { CvRadioButton, CvRadioGroup } from '.';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { ref } from 'vue';

export default {
  title: `${sbCompPrefix}/CvRadioButton`,
  component: CvRadioButton,
  argTypes: {
    checked: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    label: { description: 'radio-button label' },
    hideLabel: {
      description:
        'makes the label visually hidden but still labels the radio input',
    },
    labelLeft: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description: 'position label on left',
    },
    vertical: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description:
        'Property of CvRadioGroup component - stacks inside radio components vertically',
    },
  },
};

const DefaultRadioItems = [
  {
    label: 'radio-1',
    id: 'value-1',
    checked: true,
  },
  {
    label: 'radio-2',
    id: 'value-2',
    disabled: true,
  },
  {
    label: 'radio-3',
    id: 'value-3',
  },
];

const defaultTemplate = `
  <cv-radio-group v-bind="args" @change="onChange">
    <cv-radio-button
      v-for="({id, label, checked, disabled}, index) in DefaultRadioItems"
      :key="index"
      name="group-1"
      :label="label"
      :value="id"
      :checked="checked"
      :disabled="disabled"
    />
  </cv-radio-group>
`;

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvRadioButton, CvRadioGroup },
    template: defaultTemplate,
    setup() {
      return {
        args,
        onChange: action('change'),
        DefaultRadioItems,
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  vertical: false,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  defaultTemplate,
  Default.args
);

const vModelTemplate = `
  <cv-radio-group v-bind="args" @change="onChange">
    <cv-radio-button
      v-for="({id, label, checked, disabled}, index) in DefaultRadioItems"
      v-model="modelValue"
      :key="index"
      name="group-1"
      :label="label"
      :value="id"
      :disabled="disabled"
    />
  </cv-radio-group>

  <div style="margin-top:1rem; background-color: #888888;  padding:1rem">
    V-model:
    <template
      v-for="({id, label}, index) in DefaultRadioItems"
      :key="index"
    >
      <input name="modelValue" :id="id" type="radio" @change="(ev) => {modelValue = ev.target.id}" :checked="id === modelValue" />
      <label :for="id" style="margin-right: 16px;">{{label}}:</label>
    </template>

    <div style="margin-top: 16px;">Checked: <span style="font-weight: bold;">{{modelValue}}</span></div>
  </div>
`;

const VModelTemplate = args => {
  return {
    components: { CvRadioButton, CvRadioGroup },
    template: vModelTemplate,
    setup() {
      return {
        args,
        modelValue: ref(DefaultRadioItems[0].id),
        onChange: action('change'),
        DefaultRadioItems,
      };
    },
  };
};

export const VModel = VModelTemplate.bind({});
VModel.parameters = storyParametersObject(
  VModel.parameters,
  vModelTemplate,
  VModel.args
);
