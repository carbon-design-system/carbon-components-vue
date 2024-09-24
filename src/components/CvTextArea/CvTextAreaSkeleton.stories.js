import { storyParametersObject } from '../../global/storybook-utils';
import { CvTextAreaSkeleton } from './';

export default {
  title: 'Component/CvTextAreaSkeleton',
  component: CvTextAreaSkeleton,
};

const template = `<cv-text-area-skeleton></cv-text-area-skeleton>`;
const Template = args => {
  return {
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
