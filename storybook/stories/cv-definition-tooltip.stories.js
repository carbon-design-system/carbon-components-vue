import { CvDefinitionTooltip } from '../../packages/core/src';

import { betterSource /* removeArgTypes, slotHelper*/ } from '../utils/storybook-helper';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTooltip',
  component: CvDefinitionTooltip,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  decorators: [
    () => ({
      template: `<div class="cv-sb__width--quarter cv-sb__position--middle" style="margin: 200px 300px;"><story /></div>`,
    }),
  ],
};

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvDefinitionTooltip },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-definition-tooltip v-bind="{...$props, ...extractedProps}" @tooltip-shown="actionShown" @tooltip-hidden="actionHidden"/>`,
});

export const _CvDefinitionTooltip = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDefinitionTooltip.args = {
  definition: 'Brief description of the dotted, underlined term',
  term: 'A term needeing definition',
};

_CvDefinitionTooltip.parameters = {
  docs: {
    source: betterSource(Template, _CvDefinitionTooltip),
  },
};
