import CvTag from './CvTag';
import { tagKinds } from './consts.js';
import { action } from '@storybook/addon-actions';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvTag`,
  component: CvTag,
  argTypes: {
    kind: { control: { type: 'select', options: tagKinds } },
  },
};

const template = `<CvTag @remove="onRemove" v-bind="args" />`;
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvTag },
    template,
    setup() {
      return {
        args,
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
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

export const Filter = Template.bind({});
Filter.args = {
  kind: 'teal',
  label: 'This is a tag',
  filter: true,
};
Filter.parameters = storyParametersObject(
  Filter.parameters,
  template,
  Filter.args
);

export const Skeleton = Template.bind({});
Skeleton.args = {
  skeleton: true,
};
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  template,
  Skeleton.args
);
