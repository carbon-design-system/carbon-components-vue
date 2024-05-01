import { CvButtonSet, CvButton } from './';

const meta = {
  title: 'Components/CvButtons/CvButtonSet',
  render: args => ({
    components: { CvButton, CvButtonSet },
    setup() {
      return { args };
    },
    template: `
<cv-button-set v-bind="args">
  <cv-button> Secondary 1</cv-button>
  <cv-button> Primary 2</cv-button>
</cv-button-set>`,
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
