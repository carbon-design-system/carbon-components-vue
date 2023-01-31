import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes } from '../utils/storybook-helper';

import { CvInlineNotification } from '../../packages/core/src';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvInlineNotification',
  component: CvInlineNotification,
  argTypes: {
    ...deprecatedArgTypes(CvInlineNotification),
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionClose = action('close');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvInlineNotification,
  },
  data() {
    return { actionClose };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-inline-notification v-bind="$props" @close="actionClose" />`,
});

export const _CvInlineNotification = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvInlineNotification.args = {
  actionClose,
  title: 'notification title',
  subTitle:
    'Lorem ipsum dolor sit amet, <a href="#">consectetur adipisicing elit</a>, seed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua.',
  actionLabel: 'Action',
  lowContrast: false,
  hideCloseButton: false,
};
