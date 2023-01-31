import { CvAccordionSkeleton } from '../../packages/core/src';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvAccordion',
  component: CvAccordionSkeleton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    align: {
      controls: { type: 'select' },
      options: [undefined, 'start', 'end'],
      defaultValue: undefined,
    },
    size: {
      controls: { type: 'select' },
      options: [undefined, 'sm', 'xl'],
      defaultValue: undefined,
    },
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvAccordionSkeleton },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: '<cv-accordion-skeleton v-bind="$props" />',
});

export const _CvAccordionSkeleton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvAccordionSkeleton.args = {};
