import '@storybook/addon-actions';
import { buttonKinds, buttonSizes } from '../../packages/core/src/components/cv-button/consts';
import { deprecatedArgTypes } from '../utils/storybook-helper';
import { CvButton } from '../../packages/core/src/';

import { Bee20, Carbon20, Watson20, IbmCloud20, EdtLoop20, IbmSecurity20 } from '@carbon/icons-vue';

const icons = {
  'No Icon': undefined,
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
  component: CvButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    default: {
      control: { type: 'text' },
      description: 'This component hosts children as content in the default slot.',
    },
    icon: {
      control: { type: 'select' },
      options: Object.keys(icons), // An array of serializable values
    },
    kind: {
      control: { type: 'select' },
      options: buttonKinds,
      defaultValue: buttonKinds[0],
    },
    click: { action: 'clicked' },
    size: {
      control: { type: 'select' },
      options: buttonSizes,
      defaultValue: buttonSizes[0],
    },
    ...deprecatedArgTypes(CvButton),
  },
};

// these props are explicitly used by the component under test
const extractedProps = { click: null, default: null, icon: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvButton },
  data() {
    return { extractedProps, icons };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template:
    '<cv-button v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]">{{$props.default}}</cv-button>',
  // as named slot: `<cv-button v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]"><template v-slot:default>{{label}}</template></cv-button>`,
});

export const _CvButton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvButton.args = {
  default: 'CvButton',
  disabled: false,
};
