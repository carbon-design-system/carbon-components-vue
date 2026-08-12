import { CvButtonSet, CvButton } from './';
import { computed } from 'vue';

export default {
  title: 'Component/CvButtonSet',
  component: CvButtonSet,
};

const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvButtonSet, CvButton },
    setup() {
      return { args: computed(() => args) };
    },
    template: `
      <cv-button-set v-bind="args">
        <cv-button>One</cv-button>
        <cv-button kind="secondary">Two</cv-button>
        <cv-button kind="danger">Three</cv-button>
      </cv-button-set>
    `,
  }),
});

export const Default = Template({});
