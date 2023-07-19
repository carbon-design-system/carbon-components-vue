import { CvRadioButton } from '.';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvRadioButton`,
  component: CvRadioButton,
  argTypes: {
    // TODO
  },
};

const template = `<cv-radio-button v-bind="args" />`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvRadioButton },
    template,
    setup() {
      return { args };
    },
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
