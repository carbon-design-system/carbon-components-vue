import { sbCompPrefix, storyParametersObject } from '@/global/storybook-utils';

import { CvCheckbox } from '.';

export default {
  title: `${sbCompPrefix}/CvCheckbox`,
  component: CvCheckbox,
  argTypes: {
    control: { type: 'boolean' },
  },
};

const template = `
<cv-checkbox v-bind='args' value="check-1">
</cv-checkbox>
  `;
const Template = args => {
  return {
    components: { CvCheckbox },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
