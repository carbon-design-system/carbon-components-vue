import '@storybook/addon-actions';
import { CvPagination } from '../../packages/core/src';
import { betterSource } from '../utils/storybook-helper';

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
  template: `<cv-pagination v-bind="{...$props, ...extractedProps}" @change="$props.change">
    <template v-slot:range-text="{scope}">From {{scope.start}} to {{scope.end}} out of {{scope.items}}</template>
    <template v-slot:of-n-pages="{scope}">out of {{scope.pages}} pages</template>
  </cv-pagination>`,
  // as named slot: `<cv-pagination v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]"><template v-slot:default>{{label}}</template></cv-pagination>`,
});

export const _CvPaginationSlotted = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvPaginationSlotted.args = {
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

_CvPaginationSlotted.parameters = {
  docs: {
    source: betterSource(Template, _CvPaginationSlotted),
  },
};
