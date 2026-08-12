import { CvButtonSkeleton } from '.';
import { buttonSizes } from './consts.js';
import { storybookControlsFromProps } from '../../global/storybook-utils';
import { props as commonCvButtonProps } from './CvButtonCommon';
import { computed } from 'vue';

export default {
  title: 'Component/CvButtonSkeleton',
  component: CvButtonSkeleton,
  argTypes: {
    ...storybookControlsFromProps({ size: commonCvButtonProps.size }),
    size: {
      control: { type: 'select' },
      options: buttonSizes,
    },
  },
  args: {
    size: 'default',
  },
};

const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvButtonSkeleton },
    setup() {
      return { args: computed(() => args) };
    },
    template: `<cv-button-skeleton v-bind="args" />`,
  }),
});

export const Default = Template({
  size: 'default',
});

export const Field = Template({
  size: 'field',
});

export const Small = Template({
  size: 'sm',
});

export const Large = Template({
  size: 'lg',
});
