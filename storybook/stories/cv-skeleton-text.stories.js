import { CvSkeletonText } from '../../packages/core/src';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvSkeletonText',
  component: CvSkeletonText,
  // argTypes: {
  //   default: {
  //     description: 'This component hosts children as content in the default.',
  //   },
  // },
};

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvSkeletonText,
  },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-skeleton-text v-bind="{...$props, ...extractedProps}" />`,
});

export const _CvSkeletonText = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvSkeletonText.args = {};
