import { sbCompPrefix, storyParametersObject } from '@/global/storybook-utils';

import { CvContentSwitcher } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  title: 'Combo Box title',
  helperText: 'Combobox helper text',
};

export default {
  title: `${sbCompPrefix}/CvContentSwitcher`,
  component: CvContentSwitcher,
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
<div style='width: 18.75rem'>
<cv-content-switcher aria-label='Choose a fruit' v-bind='args' />
</div>
<script>
import CvContentSwitcher from './CvContentSwitcher';
export default {
components: { CvContentSwitcher }
 };
</script>`;
const Template = args => {
  return {
    components: { CvContentSwitcher },
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
