import { computed } from 'vue';
import CvCopyButton from '.';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Component/CvCopyButton',
  component: CvCopyButton,
  argTypes: {},
};

const template = `<cv-copy-button v-bind="args" @copy="copy" />`;
const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvCopyButton },
    setup: () => ({
      args: computed(() => args),
      copy: action('copy'),
    }),
    template,
  }),
});

export const Default = Template({});
