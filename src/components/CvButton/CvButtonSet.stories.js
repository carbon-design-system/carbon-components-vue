import { CvButtonSet, CvButton } from './';

const template = `
<cv-button-set v-bind="args">
  <cv-button>One</cv-button>
  <cv-button kind="secondary">Two</cv-button>
  <cv-button kind="danger">Three</cv-button>
</cv-button-set>`;

const meta = {
  title: 'Components/CvButtons/CvButtonSet',
  render: args => ({
    components: { CvButton, CvButtonSet },
    setup() {
      return { args };
    },
    template,
  }),
  args: {
    stacked: false,
  },
  tags: ['autodocs'],
};
export default meta;
export const Default = {
  args: {
    stacked: false,
  },
};

export const Vertical = {
  args: {
    stacked: true,
  },
};
