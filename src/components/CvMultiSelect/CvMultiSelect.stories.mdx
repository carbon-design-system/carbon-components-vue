import { Canvas, Meta, Story } from '@storybook/addon-docs';
import CvMultiSelect from './CvMultiSelect.vue';
import { tagKinds } from '../CvTag/consts';
import { sbCompPrefix } from '../../global/storybook-utils';
import { DIRECTIONS, selectionFeedbackOptions } from './consts';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
const myValue = ref(['iran_deckard']);
const pkdCharacters = [
  'Rick Deckard',
  'Garland',
  'Rachael Rosen',
  'Roy Batty',
  'Harry Bryant',
  'Hannibal Chew',
  'Dave Holden',
  'Leon Kowalski',
  'Taffey Lewis',
  'Pris Stratton',
  'J.F. Sebastian',
  'Dr. Eldon Rosen',
  'Zhora Salome',
  'John "J.R." Isidore',
  'Iran Deckard',
  'Wilbur Mercer',
  'Buster Friendly',
  'Phil Resch',
];
const pkdOptions = pkdCharacters.map(item => {
  const nameVal = item.replace(/\W+/g, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: nameVal,
    disabled: false,
  };
});
const pkdValues = pkdOptions.map(item => item.value);

<Meta title={`${sbCompPrefix}/CvMultiSelect`} component={CvMultiSelect} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvMultiSelect,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      options: args.options,
      autoFilter: args.autoFilter,
      autoHighlight: args.autoHighlight,
      disabled: args.disabled,
      filterTagKind: args.filterTagKind,
      inline: args.inline,
      invalidMessage: args.invalidMessage,
      helperText: args.helperText,
      title: args.title,
      label: args.label,
      highlight: args.highlight,
      modelValue: args.modelValue,
      selectionFeedback: args.selectionFeedback,
      filterable: args.filterable,
      light: args.light,
      direction: args.direction,
      warningMessage: args.warningMessage,
      slotInvalidText: args.slotInvalidText,
      slotWarningText: args.slotWarningText,
      slotHelperText: args.slotHelperText,
      myValue: myValue,
      onChange: action('change'),
      onFilter: action('filter'),
      onVmodel: action('update:modelValue'),
    };
  },
  template: args.template,
});
const defaultTemplate = `
  <div :style="{width: '19rem', paddingTop: direction==='top' ? '90px' : undefined}">
  <cv-multi-select
  :autoFilter="autoFilter"
  :autoHighlight="autoHighlight"
  :direction="direction"
  :disabled="disabled"
  :filterable="filterable"
  :filterTagKind="filterTagKind"
  :helperText="helperText"
  :highlight="highlight"
  :inline="inline"
  :invalidMessage="invalidMessage"
  :label="label"
  :light="light"
  :options="options"
  :selectionFeedback="selectionFeedback"
  :title="title"
  :modelValue="modelValue"
  :warningMessage="warningMessage"
  @change="onChange"
  @filter="onFilter"
  >
  </cv-multi-select>
  </div>
`;
const slotsTemplate = `
  <div :style="{width: '19rem'}">
  <cv-multi-select
  :label="label"
  :options="options"
  :title="title"
  @change="onChange"
  @filter="onFilter"
  >
    <template v-if="slotInvalidText" v-slot:invalid-message>That is <span style="font-weight:900">NOT</span> a replicant</template>
    <template v-if="slotWarningText" v-slot:warning-message>Are you sure that is a <span style="font-variant-caps: petite-caps;">Replicant</span></template>
    <template v-if="slotHelperText" v-slot:helper-text>Help Rick Deckard <span style="font-variant: small-caps;">“retire”</span> rogue androids</template>
  </cv-multi-select>
  </div>
`;
const vModelTemplate = `
  <div :style="{width: '19rem'}">
  <div>current values: {{myValue}} </div>
  <cv-multi-select
  :label="label"
  :options="options"
  :title="title"
  v-model="myValue"
  @change="onChange"
  @filter="onFilter"
  >
  </cv-multi-select>
  <div style="margin-top:2rem">
    <div>v-model</div>
    <select name="cars" id="cars" v-model="myValue" multiple>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.value}}</option>
    </select>
  </div>
  </div>
`;

# CvMultiSelect

Migration notes:

- Added the `direction` option to match Carbon React. Note that in the similar dropdown component,
  this property is named `up` and uses a boolean value. If you prefer the boolean here,
  let us know in the Slack channel.
- Added the `warningMessage` option to match Carbon React
- Setting `autoFilter` to true now implies `filterable`. Previous versions required `filterable` to
  be explicitly set to `true` for `autoFilter` to work properly.

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: [
          'change',
          'filter',
          'helper-text',
          'invalid-message',
          'template',
          'update:modelValue',
          'warning-message',
        ],
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      template: defaultTemplate,
      options: pkdOptions,
      light: false,
      label: 'Choose replicants',
      helperText: 'Do Androids Dream of Electric Sheep?',
      title: 'Characters',
      disabled: false,
    }}
    argTypes={{
      filterTagKind: {
        control: 'select',
        default: 'high-contrast',
        options: tagKinds,
      },
      highlight: {
        control: 'select',
        default: undefined,
        options: ['', ...pkdValues],
      },
      selectionFeedback: {
        control: 'select',
        default: 'top-after-reopen',
        options: selectionFeedbackOptions,
        table: { defaultValue: { summary: 'top-after-reopen' } },
      },
      light: {
        description: '`true` to use the light version.',
        table: { category: 'props', defaultValue: { summary: false } },
      },
      direction: {
        control: 'select',
        default: 'bottom',
        options: DIRECTIONS,
        table: { defaultValue: { summary: 'bottom' } },
      },
      options: {
        description: `options in the form [{ label: '', value: '', name: '', disabled: false}]`,
        control: 'inline-radio',
        options: [],
      },
      modelValue: {
        control: 'multi-select',
        options: pkdValues,
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# Use slots with helper, invalid, & warning text

<Canvas>
  <Story
    name="Slots"
    parameters={{
      controls: {
        exclude: [
          'autoFilter',
          'autoHighlight',
          'change',
          'direction',
          'filter',
          'filterTagKind',
          'filterable',
          'helper-text',
          'helperText',
          'highlight',
          'inline',
          'invalid-message',
          'invalidMessage',
          'light',
          'options',
          'selectionFeedback',
          'template',
          'update:modelValue',
          'warning-message',
          'warningMessage',
          'modelValue'
        ],
      },
      docs: { source: { code: slotsTemplate } },
    }}
    args={{
      template: slotsTemplate,
      options: pkdOptions,
      label: 'Choose replicants',
      title: 'Characters',
      slotInvalidText: false,
      slotWarningText: false,
      slotHelperText: true,
    }}
    argTypes={{}}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# v-model

<Canvas>
  <Story
    name="v-model"
    parameters={{
      controls: {
        exclude: [
          'autoFilter',
          'autoHighlight',
          'change',
          'direction',
          'disabled',
          'filter',
          'filterTagKind',
          'filterable',
          'helper-text',
          'helperText',
          'highlight',
          'inline',
          'invalid-message',
          'invalidMessage',
          'light',
          'modelValue',
          'options',
          'selectionFeedback',
          'template',
          'update:modelValue',
          'warning-message',
          'warningMessage',
        ],
      },
      docs: { source: { code: vModelTemplate } },
    }}
    args={{
      template: vModelTemplate,
      options: pkdOptions,
      light: false,
      label: 'Choose replicants',
      helperText: 'Do Androids Dream of Electric Sheep?',
      title: 'Characters',
    }}
    argTypes={{
      options: {
        description: `options in the form [{ label: '', value: '', name: '', disabled: false}]`,
        control: 'inline-radio',
        options: [],
      },
      modelValue: {
        control: 'multi-select',
        options: pkdValues,
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
