import { ref } from 'vue';
import { storyParametersObject } from '../../global/storybook-utils';
import CvNumberInput from './CvNumberInput.vue';
import { sizeTypes } from './const';

export default {
  title: 'Component/CvNumberInput',
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
    size: {
      type: 'select',
      options: Array.from(sizeTypes),
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
Default.args = { label: 'Number input label' };
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const vModelHTML = `
  <cv-number-input v-bind="args" v-model="modelValue" />
  <div style="margin-top:1rem; background-color: #888888; padding:1rem">
    <div style="font-size: 150%">
      Sample interaction
    </div>
    <input v-model="modelValue" type="number" />
    <div>
      Entered value:
      <span style="font-weight: bold;">{{modelValue}}</span>
    </div>
  </div>
`;

const VModelTemplate = args => {
  return {
    components: { CvNumberInput },
    setup: () => ({ args, modelValue: ref(3) }),
    template: vModelHTML,
  };
};
export const vModel = VModelTemplate.bind({});
vModel.parameters = storyParametersObject(
  vModel.parameters,
  vModelHTML,
  vModel.args
);

const withTypeofMessageHTML = `
  <cv-number-input v-bind="args" v-model="modelValue" />
  <p style="margin-top: 1rem;">Entered value: {{ modelValue }} | typeof: {{ typeof modelValue }}</p>
`;
const NumberTemplate = args => {
  return {
    components: { CvNumberInput },
    setup: () => ({ args, modelValue: ref(3) }),
    template: withTypeofMessageHTML,
  };
};
export const NumberValue = NumberTemplate.bind({});
NumberValue.parameters = storyParametersObject(
  NumberValue.parameters,
  withTypeofMessageHTML,
  NumberValue.args
);

const StringTemplate = args => {
  return {
    components: { CvNumberInput },
    setup: () => ({ args, modelValue: ref('3') }),
    template: withTypeofMessageHTML,
  };
};
export const StringValue = StringTemplate.bind({});
StringValue.parameters = storyParametersObject(
  StringValue.parameters,
  withTypeofMessageHTML,
  StringValue.args
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
