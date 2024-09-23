import { storyParametersObject } from '../../global/storybook-utils';

import { CvTextInput, CvTextInputSkeleton } from '.';
import { ref } from 'vue';

export default {
  title: 'Component/CvTextInput',
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
    },
    hideLabel: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
        defaultValue: false,
      },
    },
    invalidMessage: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    label: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
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
    },
    passwordHideLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    passwordShowLabel: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    passwordVisible: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
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
    },
    warnText: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
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
<form @submit.prevent='()=>{}'>
  <cv-text-input v-bind="args">
    <template v-if="args['helper-text']" v-slot:helper-text />
    <template v-if="args['warn-text']" v-slot:warn-text />
    <template v-if="args['invalid-message']" v-slot:invalid-message />
  </cv-text-input>
</form>
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
  autocomplete: 'password',
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

Skeleton.parameters = {
  controls: {
    include: ['hideLabel'],
  },
};

Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  templateSkeleton,
  Skeleton.args
);
