import { CvButtonSet, CvButton } from './';

import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbBtnPrefix } from './sbBtnPrefix';

export default {
  title: `${sbCompPrefix}/${sbBtnPrefix}/CvButtonSet`,
  component: CvButtonSet,
};

const template = `
<cv-button-set v-bind="args">
  <cv-button>One</cv-button>
  <cv-button kind="secondary">Two</cv-button>
  <cv-button kind="danger">Three</cv-button>
</cv-button-set>`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvButtonSet, CvButton },
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
