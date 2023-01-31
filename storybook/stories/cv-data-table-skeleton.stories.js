import { CvDataTableSkeleton } from '../../packages/core/src/';
import storyData from './cv-data-table-data';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvDataTable',
  component: CvDataTableSkeleton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    columnType: {
      control: { type: 'select', labels: ['Use column count', 'Use column headings'] },
      options: [0, 1],
      defaultValue: 0,
      description: 'Array applied to columns property.',
    },
    columns: {
      control: { type: 'number' },
      defaultValue: 5,
    },
  },
};

// these props are explicitly used by the component under test
const extractedProps = { columns: null, columnType: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDataTableSkeleton },
  data() {
    return { extractedProps };
  },
  computed: {
    columns() {
      if (this.$props.columnType === 0) {
        return this.$props.columns;
      } else {
        return storyData.columns[0].value;
      }
    },
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: '<cv-data-table-skeleton v-bind="{...$props, ...extractedProps}" :columns="columns" />',
});

export const _CvDataTableSkeleton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDataTableSkeleton.args = {
  columns: 5,
  rows: 5,
};
