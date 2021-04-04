import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvSkeletonText } from '.';

export default {
  title: `${sbCompPrefix}/CvSkeletonText`,
  component: CvSkeletonText,
  argTypes: {
    heading: { control: { type: 'boolean' } },
    lineCount: { control: { type: 'number', min: 1 } },
    width: { control: { type: 'text' } },
  },
};

const template = `<cv-skeleton-text v-bind="args" />`;
const Template = args => {
  return {
    components: { CvSkeletonText },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {
  width: '100%',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Minimal = Template.bind({});
Minimal.args = {
  width: '100%',
};
Minimal.argTypes = {
  heading: { table: { disable: true } },
  lineCount: { table: { disable: true } },
  width: { table: { disable: true } },
};
Minimal.parameters = storyParametersObject(
  Minimal.parameters,
  template,
  Minimal.args
);
