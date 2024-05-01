import { CvTextInput } from './';
import { fn } from '@storybook/test';
import { INPUT_SIZE } from '@carbon/web-components/es/components/text-input/text-input';
import {
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
} from '@carbon/web-components/es/components/text-input/text-input.js';
import { ref } from 'vue';
import { CvButtonSet } from '../CvButton/index.js';

const meta = {
  title: 'Components/CvTextInput',
  component: CvTextInput,
  tags: ['autodocs'],
  args: {
    onInput: fn(),
    helperText: 'Some helper text',
    label: 'Text input label',
    placeholder: 'Sample placeholder',
  },
  parameters: {
    docs: {
      controls: {
        exclude: [
          'modelValue',
          'update:modelValue',
          'onInput',
          'passwordVisible',
        ],
      },
    },
    controls: {
      exclude: [
        'modelValue',
        'update:modelValue',
        'onInput',
        'passwordVisible',
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(INPUT_SIZE),
      default: INPUT_SIZE.LARGE,
    },
    tooltipAlignment: {
      control: 'select',
      options: Object.values(INPUT_TOOLTIP_ALIGNMENT),
      default: INPUT_TOOLTIP_ALIGNMENT.LARGE,
    },
    tooltipDirection: {
      control: 'select',
      options: Object.values(INPUT_TOOLTIP_DIRECTION),
      default: INPUT_TOOLTIP_DIRECTION.LARGE,
    },
    type: {
      control: 'select',
      options: Object.values(INPUT_TYPE),
      default: INPUT_TYPE.LARGE,
    },
  },
};
export default meta;

export const Default = {};

export const Password = {
  args: {
    type: INPUT_TYPE.PASSWORD,
    placeholder: 'Enter your password',
  },
};

const myValue = ref('hello');
export const vModel = {
  render: args => ({
    components: { CvTextInput },
    setup() {
      return { args, myValue };
    },
    template: `<cv-text-input v-bind=args v-model='myValue'></cv-text-input>
      <div class="v-model-demo">
      <div style='font-size: smaller'>V-model:</div>
      <input type='text' v-model='myValue'/></div>`,
  }),
  args: {},
};

export const Slots = {
  render: args => ({
    components: { CvTextInput },
    setup() {
      return { args, myValue };
    },
    template: `
    <a href='https://github.com/carbon-design-system/carbon-for-ibm-dotcom/issues/11757' target='_blank'>
      <h4>Not working</h4>
    </a>
    <cv-text-input v-bind=args>
      <template v-slot:helper-text><h3>Fancy help</h3></template>
      <template v-slot:label-text><h3>Fancy label</h3></template>
    </cv-text-input>`,
  }),
  args: {
    helperText: undefined,
    label: undefined,
  },
};
