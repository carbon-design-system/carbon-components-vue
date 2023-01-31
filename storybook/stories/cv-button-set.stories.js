import '@storybook/addon-actions';
// import { buttonKinds, buttonSizes } from '../../packages/core/src/consts';
import { deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';
import { CvButton, CvButtonSet } from '../../packages/core/src/';

const sets = [
  { label: 'One' },
  { label: 'Two', kind: 'secondary' },
  { label: 'Three', kind: 'tertiary' },
  { label: 'Four', kind: 'danger' },
];

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvButton',
  component: CvButtonSet,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    buttonOption: {
      control: {
        type: 'select',
        labels: {
          2: 'Two',
          3: 'Three',
          4: 'Four',
        },
      },
      options: [2, 3, 4],
      defaultValue: 2,
    },
    ...deprecatedArgTypes(CvButtonSet),
    ...removeArgTypes(['default']),
  },
};

// these props are explicitly used by the component under test
const extractedProps = { buttonOption: null, default: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvButtonSet, CvButton },
  data() {
    return { extractedProps, sets };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-button-set v-bind="{...$props, ...extractedProps}">
    <CvButton v-for="set in $props.buttonOption" :kind="sets[set - 1]?.kind">
      {{sets[set - 1].label}}
    </CvButton>
  </cv-button-set>`,
});

export const _CvButtonSet = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvButtonSet.args = {};
