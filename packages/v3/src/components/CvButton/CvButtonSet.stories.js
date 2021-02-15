import { CvButtonSet, CvButton } from './';

export default {
  title: 'Components/CvButtonSet',
  component: CvButtonSet,
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvButtonSet, CvButton },
    template: `
      <cv-button-set v-bind="$props">
        <cv-button>One</cv-button>
        <cv-button kind="secondary">Two</cv-button>
        <cv-button kind="danger">Three</cv-button>
      </cv-button-set>`,
  };
};

export const Default = Template.bind({});
