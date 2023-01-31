import '@storybook/addon-actions';
import { buttonSizes } from '../../packages/core/src/components/cv-button/consts';
import { deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';
import { CvButtonSkeleton } from '../../packages/core/src/';

import { Bee20, Carbon20, Watson20, IbmCloud20, EdtLoop20, IbmSecurity20 } from '@carbon/icons-vue';

const icons = {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
};

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvButton',
  component: CvButtonSkeleton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    size: {
      control: { type: 'select' },
      options: buttonSizes,
      defaultValue: buttonSizes[0],
    },
    ...deprecatedArgTypes(CvButtonSkeleton),
    ...removeArgTypes(['icon', 'default', 'kind', 'click']),
  },
};

// these props are explicitly used by the component under test
const extractedProps = { click: null, default: null, icon: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvButtonSkeleton },
  data() {
    return { extractedProps, icons };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: '<cv-button-skeleton v-bind="{...$props, ...extractedProps}" />',
  // as named slot: `<cv-button-skeleton v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]"><template v-slot:default>{{label}}</template></cv-button-skeleton>`,
});

export const _CvButtonSkeleton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvButtonSkeleton.args = {
  default: 'CvButtonSkeleton',
};
