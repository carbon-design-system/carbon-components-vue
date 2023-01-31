import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes } from '../utils/storybook-helper';

import { CvToastNotification } from '../../packages/core/src';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvToastNotification',
  component: CvToastNotification,
  argTypes: {
    ...deprecatedArgTypes(CvToastNotification),
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionClose = action('close');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvToastNotification,
  },
  data() {
    return { actionClose };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-toast-notification v-bind="$props" />`,
});

export const _CvToastNotification = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvToastNotification.args = {
  actionClose,
  title: 'notification title',
  subTitle: 'a subtitle',
  caption: 'Time stamp <a href="#">[00:00:00]</a>',
  lowContrast: false,
  hideCloseButton: false,
};
