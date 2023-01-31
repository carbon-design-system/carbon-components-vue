import { CvAspectRatio, ratios } from '../../packages/core/src/components/cv-aspect-ratio/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvAspectRatio',
  component: CvAspectRatio,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ratios,
      defaultValue: ratios[0],
    },
  },
  decorators: [
    () => ({
      template: `<div class="cv-sb__width--quarter cv-sb__position--middle"><story /></div>`,
    }),
  ],
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvAspectRatio },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-aspect-ratio v-bind="$props" style="background: #f1f1ff; padding: 1rem;">
  <div>
      Content ({{$props.ratio}})
      <br/>
      Width based only
  </div>
</cv-aspect-ratio>`,
});

export const _CvAspectRatio = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvAspectRatio.args = {};
