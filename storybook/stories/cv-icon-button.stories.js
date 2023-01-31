import '@storybook/addon-actions';
import { buttonKinds, buttonSizes } from '../../packages/core/src/components/cv-button/consts';
import { deprecatedArgTypes } from '../utils/storybook-helper';
import { CvIconButton } from '../../packages/core/src/';

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
  component: CvIconButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    icon: {
      options: Object.keys(icons), // An array of serializable values
      defaultValue: Object.keys(icons)[0],
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
    ...deprecatedArgTypes(CvIconButton),
  },
};

// these props are explicitly used by the component under test
const extractedProps = { click: null, icon: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvIconButton },
  data() {
    return { extractedProps, icons };
  },
  template:
    '<cv-icon-button v-bind="{...$props, ...extractedProps}" @click="$props.click" :icon="icons[$props.icon]" />',
});

export const _CvIconButton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvIconButton.args = {
  label: 'CvIconButton',
  disabled: false,
};
