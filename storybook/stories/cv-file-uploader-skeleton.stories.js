import { CvFileUploaderSkeleton } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvFileUploader',
  component: CvFileUploaderSkeleton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvFileUploaderSkeleton },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: '<cv-file-uploader-skeleton v-bind="$props" />',
});

export const _CvFileUploaderSkeleton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvFileUploaderSkeleton.args = {};
