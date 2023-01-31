import { CvList, CvListItem } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvList',
  component: CvList,
  argTypes: {
    default: {
      description: 'This component hosts children as content in the default slot, as do the list item components.',
    },
    nestOrdered: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    () => ({
      template: `<div style="padding-left: 32px"><story /></div>`,
    }),
  ],
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const extractedProps = { nested: null, nestOrdered: null, ordered: null, default: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvList,
    CvListItem,
  },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-list v-bind="{...$props, ...extractedProps}" ordered>
  <cv-list-item>list item 1
  </cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>`,
});

export const _CvList = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvList.args = {
  ordered: false,
};
// remove control from just this template
_CvList.parameters = { controls: { exclude: ['nested', 'nestOrdered'] } };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateNested = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvList,
    CvListItem,
  },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-list v-bind="{...$props, ...extractedProps}" :ordered="ordered">
  <cv-list-item>list item 1
    <cv-list nested :ordered="nestOrdered">
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
  </cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>`,
});

export const _CvListNested = TemplateNested.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvListNested.args = {
  nestOrdered: false,
  ordered: false,
};
// remove control from just this template
_CvListNested.parameters = { controls: { exclude: ['nested'] } };
