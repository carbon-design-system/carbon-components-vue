import {
  sbCompPrefix,
  storybookControlsFromProps,
  storyParametersObject,
} from '@/global/storybook-utils';

import { CvCheckbox } from '.';
import { action } from '@storybook/addon-actions';
import { props as propsCvCheck } from '@/use/cvCheck';

export default {
  title: `${sbCompPrefix}/CvCheckbox`,
  component: CvCheckbox,
  argTypes: {
    ...storybookControlsFromProps(propsCvCheck),
    label: { description: 'checkbox label' },
    value: {
      type: 'string',
      table: {
        type: { summary: 'string' },
        category: 'props',
      },
    },
    hideLabel: {
      description:
        'makes the label visually hidden but still labels the checkbox',
    },
    mixed: {
      type: 'boolean',
      description: 'if true aria-checkbox set to mixed if checked is false',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
    change: { description: 'emitted when state changes' },
    modelValue: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    checked: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
  },
};

const template = `
<cv-checkbox @change="onChange" v-bind='args' >
</cv-checkbox>
  `;
const Template = args => {
  return {
    components: { CvCheckbox },
    setup: () => ({ args, onChange: action('change') }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = { label: 'checkbox', value: 'check-1' };
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
