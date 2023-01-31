import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import { CvProgress, CvProgressStep } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvProgress',
  component: CvProgress,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    initialStep: {
      description: 'Not used when steps are slotted.',
    },
    // ...deprecatedArgTypes(CvProgress),
    ...removeArgTypes(['default']),
  },
};

const actionStepClicked = action('step-clicked');

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvProgress, CvProgressStep },
  data() {
    return {
      actionStepClicked,
      extractedProps,
    };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-progress v-bind="{...$props, ...extractedProps}" @step-clicked="actionStepClicked" />`,
});

export const _CvProgress = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvProgress.args = {
  steps: ['Step 1', 'Step 2 overflows and shows a tip', 'Step 3', 'Step 4', 'Step 5'],
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateSlotted = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvProgress, CvProgressStep },
  data() {
    return {
      actionStepClicked,
      complete: [true, true, false, false, false],
      extractedProps,
    };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-progress v-bind="{...$props, ...extractedProps}" >
<cv-progress-step label="Step 1" additional-info="Optional info" :complete="complete[0]" description="This is the first step" @step-clicked="actionStepClicked" />
  <cv-progress-step label="Step 2 is a bit longer" :complete="complete[1]" description="This is the second step" @step-clicked="actionStepClicked"/>
  <cv-progress-step label="Step 3" :complete="complete[2]" tip-text="Step 3 has hard coded tip" description="This is the third step" @step-clicked="actionStepClicked" />
  <cv-progress-step label="Step 4" :complete="complete[3]" invalid description="This is the penultimate step" @step-clicked="actionStepClicked"/>
  <cv-progress-step label="Step 4" :complete="complete[4]" disabled description="This is the last step" @step-clicked="actionStepClicked"/>
</cv-progress>`,
});

export const _CvProgressSlotted = TemplateSlotted.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvProgressSlotted.args = {};
