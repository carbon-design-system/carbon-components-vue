import { storyParametersObject } from '../../global/storybook-utils';
import CvContent from './CvContent.vue';

export default {
  title: 'Component/ui-select/CvContent',
  component: CvContent,
  argTypes: {},
};

const template = `<cv-content>Hello main</cv-content>`;
const Template = () => {
  return {
    template,
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
