import CvTag from './CvTag';
import { tagKinds } from './consts.js';
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/CvTag',
  component: CvTag,
  argTypes: {
    kind: { control: { type: 'select', options: tagKinds } },
  }
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTag },
    template: `<CvTag @remove="remove" v-bind="$props" />`,
    setup(props) {
      return {
        remove: action('remove')
      };
    },
  };
};

export const Primary = Template.bind({});
Primary.args = {
  kind: 'red',
  label: 'something',
  filter: true
};