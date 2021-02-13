import CvTag from './CvTag';
import { tagKinds } from './consts.js';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/CvTag',
  component: CvTag,
  argTypes: {
    kind: { control: { type: 'select', options: tagKinds } },
  },
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTag },
    template: `<CvTag @remove="onRemove" v-bind="$props" />`,
    setup(props) {
      return {
        onRemove: action('remove'),
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  kind: 'red',
  label: 'This is a tag',
  filter: false,
};
Default.parameters = {
  docs: {
    source: {
      code: `
<CvTag
  kind="red"
  label="This is a tag"
  :filter="false"
/>
`,
    },
  },
};

export const Filter = Template.bind({});
Filter.args = {
  kind: 'teal',
  label: 'This is a tag',
  filter: true,
};
Filter.parameters = {
  docs: {
    source: {
      code: `
<CvTag
  kind="teal"
  label="This is a tag"
  :filter="true"
/>
`,
    },
  },
};
