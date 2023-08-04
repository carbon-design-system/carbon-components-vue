import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbSliderPrefix } from './sbSliderPrefix';
import { CvSlider } from '.';

export default {
  title: `${sbCompPrefix}/${sbSliderPrefix}/CvSlider`,
  component: CvSlider,
  argTypes: {
    // TODO
  },
};

const template = `<cv-slider v-bind="args" />`;
const Template = args => {
  return {
    components: { CvSlider },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
