import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvTextInput, CvTextInputSkeleton } from '.';
import { ref } from 'vue';

export default {
  title: `${sbCompPrefix}/CvTextInput`,
  component: CvTextInput,
  argTypes: {
    // attrs
    disabled: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'attributes',
      },
      description: 'Specify whether the `<input>` should be disabled',
    },
    placeholder: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'attributes',
      },
      description: 'Specify the placeholder attribute for the `<input>`',
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
    passwordHideLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: '"Hide password" tooltip text on password visibility toggle',
    },
    passwordShowLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
      description: '"Show password" tooltip text on password visibility toggle',
    },
    passwordVisible: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
      description: 'Toggle password visibility.',
    },
    type: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
        defaultValue: { summary: 'text' },
      },
      options: ['text', 'password'],
      control: {
        type: 'select',
      },
      description: 'Input type, only `text` and `password` are available',
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
  <cv-text-input v-bind="args">
    <template v-if="args['helper-text']" v-slot:helper-text />
    <template v-if="args['warn-text']" v-slot:warn-text />
    <template v-if="args['invalid-message']" v-slot:invalid-message />
  </cv-text-input>
`;
const Template = args => {
  return {
    components: { CvTextInput },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  helperText: 'Same helper text',
  label: 'Text input label',
  placeholder: 'Sample placeholder',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Slots = Template.bind({});
Slots.args = {
  'invalid-message': 'Same invalid message',
  'warn-text': 'Same warn message',
  'helper-text': 'Same help message',
  label: 'Text input label',
  placeholder: 'Sample placeholder',
};
Slots.parameters = storyParametersObject(
  Slots.parameters,
  template,
  Slots.args
);

const vModelTemplate = `
  <cv-text-input v-bind="args" v-model="value" />
  <p style="margin-top: 1rem;">Value passed to v-model: {{ value }}</p>
`;
const VModelTemplate = args => {
  return {
    components: { CvTextInput },
    setup: () => ({ args, value: ref('') }),
    template: vModelTemplate,
  };
};
export const vModel = VModelTemplate.bind({});
vModel.args = {
  label: 'Text input label',
  placeholder: 'Sample placeholder',
};
vModel.parameters = storyParametersObject(
  vModel.parameters,
  vModelTemplate,
  vModel.args
);

export const Password = Template.bind({});
Password.args = {
  label: 'Password input label',
  type: 'password',
};
Password.parameters = storyParametersObject(
  Password.parameters,
  template,
  Password.args
);

const templateSkeleton = `<cv-text-input-skeleton v-bind='args'/>`;
const TemplateSkeleton = args => {
  return {
    components: { CvTextInputSkeleton },
    setup: () => ({ args }),
    template: templateSkeleton,
  };
};

export const Skeleton = TemplateSkeleton.bind({});
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  templateSkeleton,
  Skeleton.args
);
