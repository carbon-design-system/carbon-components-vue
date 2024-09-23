import CvCopyButton from '.';

import { action } from '@storybook/addon-actions';
import { storyParametersObject } from '../../global/storybook-utils';

export default {
  title: 'Component/CvCopyButton',
  component: CvCopyButton,
  argTypes: {},
};

const template = `<cv-copy-button v-bind="args" @copy="copy" />`;
const Template = args => ({
  components: { CvCopyButton },
  setup: () => ({ args, copy: action('copy') }),
  template,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
