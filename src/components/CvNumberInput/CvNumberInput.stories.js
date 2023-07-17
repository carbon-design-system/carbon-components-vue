import { ref } from 'vue';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { StorybookGroupConst } from './StorybookGroupConst';
import CvNumberInput from './CvNumberInput.vue';

export default {
  title: `${sbCompPrefix}/${StorybookGroupConst}/CvNumberInput`,
  component: CvNumberInput,
  argTypes: {
    // attrs
    ariaLabelForDownButton: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'attributes',
      },
      description: 'Aria label for down (decrease) button',
    },
    ariaLabelForUpButton: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'attributes',
      },
      description: 'Aria label for up (increase) button',
    },
    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'attributes',
      },
      description: 'Specify whether the `<input>` should be disabled',
    },
    max: {
      type: 'string',
      table: {
        type: { summary: 'string | number' },
        category: 'attributes',
      },
      description: '`max` attribute for input HTML element',
    },
    min: {
      type: 'string',
      table: {
        type: { summary: 'string | number' },
        category: 'attributes',
      },
      description: '`min` attribute for input HTML element',
    },
    step: {
      type: 'string',
      table: {
        type: { summary: 'string | number' },
        category: 'attributes',
      },
      description: '`step` attribute for input HTML element',
    },
    // props
    formItem: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
        defaultValue: true,
      },
      description:
        "Adds .bx--form-item class to component's wrapping HTML element",
    },
    helperText: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description:
        'Provide text that is used alongside the control label for additional help',
    },
    invalidMessage: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description:
        'Provide the text that is displayed when the control is in an invalid state',
    },
    label: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: "Input's label",
    },
    light: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
        defaultValue: false,
      },
      description:
        "Toggles light version. For use on `$ui-01` backgrounds only. Don't use this to make tile background color same as container background color.",
    },
    warnText: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description:
        'Provide the text that is displayed when the control is in warning state',
    },
    // slots
    'label ': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Input label slot',
    },
    'helper-text': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description:
        "Helper text slot. It isn't shown if invalid message or warn text, either props or slots, are available",
    },
    'invalid-message': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Invalid message slot.',
    },
    'warn-text': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description:
        "Warn text slot. It isn't shown if invalid message, either prop or slot, is available",
    },
    // events
    'update:modelValue': {
      type: 'event',
      table: {
        type: { summary: 'event' },
        category: 'events',
      },
      control: { type: null },
      description:
        "Triggered on textarea update. `update:modelValue` is the vue3 default 'event' for two-way data binding with v-model",
    },
  },
};

const template = `
  <cv-number-input v-bind="args">
    <template v-if="args['helper-text']" v-slot:helper-text />
    <template v-if="args['warn-text']" v-slot:warn-text />
    <template v-if="args['invalid-message']" v-slot:invalid-message />
    <template v-if="args['label']" v-slot:label />
  </cv-number-input>
`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvNumberInput },
    template,
    setup: () => ({
      args,
    }),
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const vModelHTML = `
  <cv-number-input v-bind="args" v-model="modelValue" />
  <p style="margin-top: 1rem;">Entered value: {{ modelValue }} | typeof: {{ typeof modelValue }}</p>
`;
const NumericVModelTemplate = args => {
  return {
    components: { CvNumberInput },
    setup: () => ({ args, modelValue: ref(3) }),
    template: vModelHTML,
  };
};
export const vModel = NumericVModelTemplate.bind({});
vModel.parameters = storyParametersObject(
  vModel.parameters,
  vModelHTML,
  vModel.args
);

export const NumberValue = NumericVModelTemplate.bind({});
NumberValue.parameters = storyParametersObject(
  NumberValue.parameters,
  vModelHTML,
  NumberValue.args
);

const StringVModelTemplate = args => {
  return {
    components: { CvNumberInput },
    setup: () => ({ args, modelValue: ref('3') }),
    template: vModelHTML,
  };
};

export const StringValue = StringVModelTemplate.bind({});
NumberValue.parameters = storyParametersObject(
  NumberValue.parameters,
  vModelHTML,
  NumberValue.args
);

export const Slots = Template.bind({});
Slots.args = {
  'invalid-message': 'Some invalid message from slot',
  'warn-text': 'Some warn message from slot',
  'helper-text': 'Some help message from slot',
  label: 'Number input label from slot',
};
Slots.parameters = storyParametersObject(
  Slots.parameters,
  template,
  Slots.args
);
