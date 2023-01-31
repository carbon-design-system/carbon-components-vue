import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import { CvTabs, CvTab } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTabs',
  component: CvTabs,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvTabs),
    ...removeArgTypes(['actionTabSelected', 'change']),
    twoSelected: { control: { type: 'boolean' } },
    fourDisabled: { control: { type: 'boolean' } },
    default: {
      description: 'Thd default slot of the AccordionItem hosts children as content.',
    },
  },
};

const actionTabSelected = action('tab-selected');

// these props are explicitly used by the component under test
const extractedProps = { actionTabSelected: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTabs, CvTab },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tabs v-bind="{...$props, ...extractedProps}" @tab-selected="actionTabSelected">
  <cv-tab id="tab-1"label="Tab link 1">
    Sample tab panel content 1
  </cv-tab>
  <cv-tab id="tab-2"label="Tab link 2"
  :selected="twoSelected">
    Sample tab panel content 2
  </cv-tab>
  <cv-tab id="tab-3"label="Tab link 3">
    Sample tab panel content 3
  </cv-tab>
  <cv-tab id="tab-4"label="Tab link 4"
  :disabled="fourDisabled">
    Sample tab panel content 4
  </cv-tab>
  <cv-tab id="tab-5"label="Tab link 5">
    Sample tab panel content 5 <a href="javascript:void(0)">with some active content</a>
  </cv-tab>
</cv-tabs>`,
});

export const _CvTabs = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTabs.args = {
  actionTabSelected,
};
