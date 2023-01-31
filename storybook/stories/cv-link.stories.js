import { CvLink } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvLink',
  component: CvLink,
  decorators: [
    () => ({
      template: `<div>Lorem ipsum dolor sit amet. <story />. Consectetur adipiscing elit.</div>`,
    }),
  ],
  argTypes: {
    default: {
      description: 'This component hosts children as content in the default.',
    },
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvLink,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-link v-bind="$props">{{$props.default}}</cv-link>`,
});

export const _CvLinkHref = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvLinkHref.args = {
  href: 'javascript:void(0)',
  default: 'A link',
  disabled: false,
  inline: false,
};
// remove control from just this template
_CvLinkHref.parameters = { controls: { exclude: ['to'] } };

export const _CvLinkRouterLink = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvLinkRouterLink.args = {
  to: 'javascript:void(0)',
  default: 'A router-link',
  disabled: false,
  inline: false,
};
// remove control from just this template
_CvLinkRouterLink.parameters = { controls: { exclude: ['href'] } };
