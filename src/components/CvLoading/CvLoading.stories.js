import CvLoading from '.';

import { action } from '@storybook/addon-actions';
import { sbCompPrefix, storyParametersObject } from '@/global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvLoading`,
  component: CvLoading,
  argTypes: {},
};

const template = `<cv-loading v-bind="args" @loading-end="actionEnd />`;
const Template = args => ({
  components: { CvLoading },
  setup: () => ({ args, copy: action('actionEnd') }),
  template,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
