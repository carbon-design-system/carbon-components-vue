import { storyParametersObject } from '../../global/storybook-utils';
import { CvSliderSkeleton } from '.';

export default {
  title: 'Component/CvSliderSkeleton',
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
