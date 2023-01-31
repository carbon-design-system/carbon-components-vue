import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes } from '../utils/storybook-helper';
import { CvTag, tagKinds } from '../../packages/core/src/components/cv-tag';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTag',
  component: CvTag,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...deprecatedArgTypes(CvTag),
    kind: { control: { type: 'select' }, options: tagKinds },
    size: { control: { type: 'check' } },
    withClickListener: { control: { type: 'boolean' }, description: 'A listener can be added to a non-filter tag.' },
  },
};

const actionClick = action('click');

// these props are explicitly used by the component under test
const extractedProps = { label: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTag },
  data() {
    return { actionClick, ...extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
      <cv-tag key="std" v-if="!$props.withClickListener" v-bind="{...$props, ...extractedProps}" />
      <cv-tag key="interactive" v-else v-bind="{...$props, ...extractedProps}" :label="$props.label + ' with click listener'" @click="actionClick"/>
    </div>`,
});

export const _CvTag = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTag.args = {
  label: 'Tag string',
  withClickListener: false,
};
