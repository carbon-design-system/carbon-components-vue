import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes } from '../utils/storybook-helper';

import { CvLoading } from '../../packages/core/src';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvLoading',
  component: CvLoading,
  argTypes: {
    ...deprecatedArgTypes(CvLoading),
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionLoadingEnd = action('loading-end');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvLoading,
  },
  data() {
    return { actionLoadingEnd };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-loading v-bind="$props" @loading-end="actionLoadingEnd" />`,
});

export const _CvLoading = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvLoading.args = {};
