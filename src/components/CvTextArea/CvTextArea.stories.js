import { storyParametersObject } from '../../global/storybook-utils';
import CvTextArea from '.';
import { ref } from 'vue';

export default {
  title: 'Component/CvTextArea',
  component: CvTextArea,
  argTypes: {
    // attrs
    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'attributes',
      },
      description: 'Specify whether the textarea should be disabled',
    },
    placeholder: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'attributes',
      },
      description: 'Specify the placeholder attribute for the textarea',
    },
    // props
    helperText: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description:
        'Provide text that is used alongside the control label for additional help',
    },
    hideLabel: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
        defaultValue: false,
      },
      description:
        'Specify whether you want the underlying label to be visually hidden',
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
    // slots
    'helper-text': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description:
        "Helper text slot. It isn't shown if invalid message, either prop or slot, is available",
    },
    'invalid-message': {
      type: 'string',
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Invalid message slot.',
    },
    // events
    'update:modelValue': {
      type: 'event',
      table: {
        category: 'events',
      },
      control: { type: null },
      description:
        "Triggered on textarea update. `update:modelValue` is the vue3 default 'event' for two-way data binding with v-model",
    },
  },
};

const template = `
  <cv-text-area v-bind="args">
    <template v-if="args['helper-text']" v-slot:helper-text />
    <template v-if="args['invalid-message']" v-slot:invalid-message />
  </cv-text-area>
`;
const Template = args => {
  return {
    components: { CvTextArea },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  label: 'Text area label',
  placeholder: 'Sample placeholder',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Slots = Template.bind({});
Slots.args = {
  ['invalid-message']: 'Invalid text area message',
  label: 'Text area label',
  placeholder: 'Sample placeholder',
};
Slots.parameters = storyParametersObject(
  Slots.parameters,
  template,
  Slots.args
);

const vModelTemplate = `
  <cv-text-area v-bind="args" v-model="value" />
  <p style="margin-top: 1rem;">Value passed to v-model: {{ value }}</p>
`;
const VModelTemplate = args => {
  return {
    components: { CvTextArea },
    setup: () => ({ args, value: ref('') }),
    template: vModelTemplate,
  };
};
export const vModel = VModelTemplate.bind({});
vModel.args = {
  label: 'Text area label',
  placeholder: 'Sample placeholder',
};
vModel.parameters = storyParametersObject(
  vModel.parameters,
  vModelTemplate,
  vModel.args
);
