import { Canvas, Meta, Story } from '@storybook/addon-docs';
import CvSearch from './CvSearch.vue';
import { sbCompPrefix } from '../../global/storybook-utils';
import { SEARCH_SIZES } from './index';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
const myValue = ref('searching galaxies');

<Meta title={`${sbCompPrefix}/CvSearch`} component={CvSearch} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvSearch,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      light: args.light,
      label: args.label,
      placeholder: args.placeholder,
      disabled: args.disabled,
      size: args.size,
      ariaLabel: args.ariaLabel,
      clearAriaLabel: args.clearAriaLabel,
      formItem: args.formItem,
      expandable: args.expandable,
      modelValue: args.modelValue,
      myValue: myValue,
      onInput: action('input'),
    };
  },
  template: args.template,
});
const defaultTemplate = `
<cv-search
  :light="light"
  :label="label"
  :placeholder="placeholder"
  :disabled="disabled"
  :size="size"
  :expandable="expandable"
  :modelValue="modelValue"
  :form-item="formItem"
  :aria-label="ariaLabel"
  :clear-aria-label="clearAriaLabel"
  @input="onInput"
  >
</cv-search>
`;
const vModelTemplate = `
<div>
  <cv-search
    v-model="myValue"
    :light="light"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :expandable="expandable"
    :form-item="formItem"
    :aria-label="ariaLabel"
    :clear-aria-label="clearAriaLabel"
    >
  </cv-search>
  <div style="margin-top:1rem; background-color: #888888;  padding:1rem">
    <div style="padding:1rem">v-model: {{ myValue }}</div>
    <input type="search" v-model="myValue"/>
  </div>
</div>
`;

# CvSearch

Migration notes:

- The "toolbar" mode is removed in this version. Please use the `expandable` mode instead.

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: [
          'input',
          'template',
          'update:modelValue',
          'large',
          'small',
          'toolbarAriaLabel',
          'kind',
        ],
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      template: defaultTemplate,
      light: false,
      disabled: false,
      placeholder: 'JWST: search for light from the first stars',
    }}
    argTypes={{
      light: {
        description: '`true` to use the light version.',
        table: { category: 'props', defaultValue: { summary: false } },
      },
      size: {
        control: 'select',
        default: 'xl',
        options: SEARCH_SIZES,
        table: { defaultValue: { summary: 'xl' } },
      },
    }}
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
          'input',
          'template',
          'update:modelValue',
          'large',
          'small',
          'toolbarAriaLabel',
          'kind',
        ],
      },
      docs: { source: { code: vModelTemplate } },
    }}
    args={{
      template: vModelTemplate,
      light: false,
      disabled: false,
      placeholder: 'JWST: search for light from the first stars',
    }}
    argTypes={{
      light: {
        description: '`true` to use the light version.',
        table: { category: 'props', defaultValue: { summary: false } },
      },
      size: {
        control: 'select',
        default: 'xl',
        options: SEARCH_SIZES,
        table: { defaultValue: { summary: 'xl' } },
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
