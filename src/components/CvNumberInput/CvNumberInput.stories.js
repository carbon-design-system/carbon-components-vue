import { action } from '@storybook/addon-actions';
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
    modelValue: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description:
        "Input's value, modelValue is the vue3 default 'prop' for two-way data binding with v-model",
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

const template = `<cv-number-input @change="onChange" @input="onInput" v-bind="args"></cv-number-input>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvNumberInput },
    template,
    setup: () => ({
      args,
      onInput: action('input'),
      onChange: action('change'),
    }),
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
