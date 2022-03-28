import CvTextInput from './CvTextInput';
import {
  sbCompPrefix,
  storyParametersObject,
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
  },
};

const template = `<CvTextInput v-bind="args" />`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTextInput },
    template,
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
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
