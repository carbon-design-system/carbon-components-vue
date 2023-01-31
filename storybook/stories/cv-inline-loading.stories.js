import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes } from '../utils/storybook-helper';

import { CvInlineLoading, STATES } from '../../packages/core/src/components/cv-inline-loading';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvInlineLoading',
  component: CvInlineLoading,
  argTypes: {
    state: {
      control: { type: 'select' },
      options: STATES,
      defaultValue: STATES[0],
    },
    ...deprecatedArgTypes(CvInlineLoading),
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionSubmit = action('submit');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvInlineLoading,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-inline-loading v-bind="$props" />`,
});

export const _CvInlineLoading = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvInlineLoading.args = {
  description: 'Loading indicator',
  endingText: 'Ending...',
  errorText: 'Error.',
  loadingText: 'Loading...',
  loadedText: 'Complete.',
};
