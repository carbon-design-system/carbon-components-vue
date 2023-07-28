import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { StorybookGroupConst } from './StorybookGroupConst';
import CvNumberInputSkeleton from './CvNumberInputSkeleton.vue';

export default {
  title: `${sbCompPrefix}/${StorybookGroupConst}/CvNumberInputSkeleton`,
  component: CvNumberInputSkeleton,
};

const template = `<cv-number-input-skeleton></cv-number-input-skeleton>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvNumberInputSkeleton },
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
