import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbSliderPrefix } from './sbSliderPrefix';
import { CvSliderSkeleton } from '.';

export default {
  title: `${sbCompPrefix}/${sbSliderPrefix}/CvSliderSkeleton`,
  component: CvSliderSkeleton,
};

const template = `<cv-slider-skeleton />`;
const Template = () => {
  return {
    components: { CvSliderSkeleton },
    template,
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
