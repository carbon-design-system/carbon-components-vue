import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { StorybookGroupConst } from './StorybookGroupConst';
import CvNumberInput from './CvNumberInput.vue';

export default {
  title: `${sbCompPrefix}/${StorybookGroupConst}/CvNumberInput`,
  component: CvNumberInput,
  argTypes: {},
};

const template = `<cv-number-input v-bind="args"></cv-number-input>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvNumberInput },
    template,
    setup: () => ({ args }),
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
