import { storyParametersObject } from '../../global/storybook-utils';
import CvTagSkeleton from './CvTagSkeleton.vue';

export default {
  title: 'Component/CvTagSkeleton',
  component: CvTagSkeleton,
};

const template = `<cv-tag-skeleton v-bind="args"></cv-tag-skeleton>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTagSkeleton },
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

export const Small = Template.bind({});
Small.args = {
  small: true,
};
Small.parameters = storyParametersObject(
  Small.parameters,
  template,
  Small.args
);
