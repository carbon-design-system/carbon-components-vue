import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvDatePicker } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  dateLabel: 'Date label',
  invalidText: 'Invalid value',
};

export default {
  title: `${sbCompPrefix}/CvDatePicker`,
  component: CvDatePicker,
  parameters: {
    a11y: {
      config: {
        rules: [],
      },
      manual: true,
    },
  },
  argTypes: {
    dateLabel: { type: String, description: 'Date picker label' },
    invalidText: {
      type: String,
      description: 'Date picker text on invalid value',
    },
  },
};

const template = `
<div>
<cv-date-picker aria-label='Date picker' v-bind='args' >
</cv-date-picker>
</div>
`;
const Template = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = initArgs;
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
