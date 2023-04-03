import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvDatePicker } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Kiwi Fruit',
  'Lemon',
  'Lime',
  'Mango',
  'Orange',
  'Passion Fruit',
  'Raisin',
  'Satsuma',
  'Tangerine',
  'Ugli Fruit',
  'Watermelon',
].map(item => {
  const nameVal = item.replace(/\W/, '_').toLowerCase();
  return {
    name: nameVal,
    label: item,
    value: `val-${nameVal}`,
  };
});

const initArgs = {
  title: 'Combo Box title',
  options: fruits,
  helperText: 'Combobox helper text',
};

export default {
  title: `${sbCompPrefix}/CvDatePicker`,
  component: CvDatePicker,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'aria-input-field-name',
            selector: '.bx--combo-box',
          },
        ],
      },
      options: {},
      manual: true,
    },
  },
  argTypes: {
    title: { type: String, description: 'Combo Box title' },
    options: { type: Array, description: 'Combo Box options' },
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
      onFilter: action('filter'),
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
