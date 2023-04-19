import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';
import { sbCompPrefix } from '../../global/storybook-utils';
import CvButton from '../CvButton';
import CvTextInput from '../CvTextInput';
import CvTextArea from '../CvTextArea';
import { CvForm, CvFormGroup, CvFormItem } from '.';

<Meta title={`${sbCompPrefix}/CvForm`} component={CvForm} />

export const Template = args => ({
  components: {
    CvForm,
    CvFormGroup,
    CvFormItem,
    CvButton,
    CvTextInput,
    CvTextArea,
  },
  setup: () => {
    const doSubmit = action('cv-form -submit event');
    return {
      args: { ...args, template: undefined },
      onSubmit(ev) {
        console.dir([].slice.call(ev.target, [0, ev.target.length]));
        doSubmit(ev);
      },
    }
  },
  template: args.template,
});

export const defaultTemplate = `
  <cv-form @submit.prevent="onSubmit">
    <cv-text-input
      label="Text input label"
      placeholder="Optional placeholder text"
      helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
    />
    <cv-text-area
      label="Text area label"
      placeholder="Optional placeholder text"
      helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
    />
    <cv-button>Submit</cv-button>
  </cv-form>
`;

export const formGroupTemplate = `
  <cv-form-group v-bind="args">
    <template #label>
      FormGroup label-legend
    </template>
    <template #content>
      <cv-text-input label="First name" />
      <cv-text-input label="Last name" />
    </template>
  </cv-form-group>
`;

export const formItemTemplate = `
  <cv-form-item>
    <label for="text-input-3" class="bx--label">Text Input label</label>
    <input id="text-input-3" type="text" class="bx--text-input" placeholder="Optional placeholder text" />
  </cv-form-item>
`;

# CvForm

These components are purely wrapper elements for use in creating forms.

## Usage CvForm

CvForm has no properties and a single default slot

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: ['template']
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      template: defaultTemplate,
    }}
    argTypes={{
      default: {
        control: 'none',
        table: {
          type: { summary: 'text | html | Component' },
          category: 'slots',
        }
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>


## CvFormGroup

Used inside a form to group components such as checkboxes and radio buttons.

<Canvas>
  <Story
    name="FormGroup-Default"
    parameters={{
      controls: {
        exclude: ['template', 'default']
      },
      docs: { source: { code: formGroupTemplate.replace('v-bind="args"', '') } },
    }}
    args={{
      template: formGroupTemplate,
    }}
    argTypes={{
      content: {
        control: 'none',
        table: {
          type: { summary: 'text | html | Component' },
          category: 'slots',
        },
      },
      label: {
        control: 'none',
        table: {
          type: { summary: 'text | html | Component' },
          category: 'slots',
        },
        description: 'Legend element content',
      },
      invalid: {
        type: 'boolean',
        table: {
          type: { summary: 'boolean' },
          category: 'props',
        },
        description: 'Specify whether the `FormGroup` is invalid',
      },
      message: {
        type: 'string',
        table: {
          type: { summary: 'string' },
          category: 'props',
        },
        description: 'Specify a message to be placed at the end of the `FormGroup`',
      },
      noMargin: {
        type: 'boolean',
        table: {
          type: { summary: 'boolean' },
          category: 'props',
        },
        description: 'Remove default margins set on `FormGroup`',
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

## CvFormItem

Used inside a form to provide positional styling.

<Canvas>
  <Story
    name="FormItem-Default"
    parameters={{
      controls: {
        exclude: ['template']
      },
      docs: { source: { code: formItemTemplate } },
    }}
    args={{
      template: formItemTemplate,
    }}
    argTypes={{
      default: {
        control: 'none',
        table: {
          type: { summary: 'text | html | Component' },
          category: 'slots',
        }
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
