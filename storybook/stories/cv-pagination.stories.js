import '@storybook/addon-actions';
import { CvPagination } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvPagination',
  component: CvPagination,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    change: { action: 'changed' },
  },
};

// these props are explicitly used by the component under test
const extractedProps = { change: null, default: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvPagination },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: '<cv-pagination v-bind="{...$props, ...extractedProps}" @change="$props.change" />',
  // as named slot: `<cv-pagination v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]"><template v-slot:default>{{label}}</template></cv-pagination>`,
});

export const _CvPagination = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvPagination.args = {
  backwardsText: 'Previous page',
  forwardsText: 'Next page',
  pageNumberLabel: 'Page number',
  pageSizesLabel: 'Items per page:',
  numberOfItems: 103,
  page: 2,
  pageSizes: [
    10,
    {
      value: 20,
      selected: true,
    },
    30,
    40,
    50,
  ],
  disableBackwards: false,
  disabledForwards: false,
};
