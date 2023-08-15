import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { StorybookGroupConst } from './StorybookGroupConst';
import { CvTextAreaSkeleton } from './';

export default {
  title: `${sbCompPrefix}/${StorybookGroupConst}/CvTextAreaSkeleton`,
  component: CvTextAreaSkeleton,
};

const template = `<cv-text-area-skeleton></cv-text-area-skeleton>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTextAreaSkeleton },
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
