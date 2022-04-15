import CvTextInput from './CvTextInput.vue';
import {
  sbCompPrefix,
  storybookControlsFromProps,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvTextInput`,
  component: CvTextInput,
  argTypes: {
    ...storybookControlsFromProps(CvTextInput.props),
    label: { control: { type: 'text' }, defaultValue: 'Text input label' },
    invalidMessage: {
      control: { type: 'text' },
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password'],
      },
    },
  },
};

const Template = (args) => {
  return {
    components: { CvTextInput },
    template: `<CvTextInput v-bind="args" />`,
    setup() {
      return {
        args,
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  label: 'Text input label',
};