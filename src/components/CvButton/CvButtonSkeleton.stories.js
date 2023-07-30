import { CvButtonSkeleton } from '.';
import { buttonSizes } from './consts.js';
import {
  sbCompPrefix,
  storybookControlsFromProps,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbBtnPrefix } from './sbBtnPrefix';

import { props as commonCvButtonProps } from './CvButtonCommon';

export default {
  title: `${sbCompPrefix}/${sbBtnPrefix}/CvButtonSkeleton`,
  component: CvButtonSkeleton,
  argTypes: {
    ...storybookControlsFromProps({ size: commonCvButtonProps.size }),
    size: {
      control: { type: 'select', options: buttonSizes },
      defaultValue: 'default',
    },
  },
};

const template = `<cv-button-skeleton v-bind="buttonProps" />`;
const Template = (args, { argTypes }) => {
  const buttonProps = { ...args };
  return {
    props: Object.keys(argTypes),
    components: { CvButtonSkeleton },
    template,
    setup() {
      return { buttonProps };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  size: 'default',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args,
  'v-bind="buttonProps"'
);

export const Field = Template.bind({});
Field.args = {
  size: 'field',
};
Field.parameters = storyParametersObject(
  Field.parameters,
  template,
  Field.args,
  'v-bind="buttonProps"'
);

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};
Small.parameters = storyParametersObject(
  Small.parameters,
  template,
  Small.args,
  'v-bind="buttonProps"'
);

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};
Large.parameters = storyParametersObject(
  Large.parameters,
  template,
  Large.args,
  'v-bind="buttonProps"'
);
