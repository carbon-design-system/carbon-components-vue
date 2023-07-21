import { action } from '@storybook/addon-actions';
import { CvRadioButton, CvRadioGroup } from '.';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvRadioButton`,
  component: CvRadioButton,
  argTypes: {
    vertical: Boolean,
  },
};

const DefaultRadioItems = [
  {
    label: 'radio-1',
    id: 'value-1',
    checked: true,
  },
  {
    label: 'radio-2',
    id: 'value-2',
    disabled: true,
  },
  {
    label: 'radio-3',
    id: 'value-3',
  },
];

const template = `
  <cv-radio-group v-bind="args" @change="onChange">
    <cv-radio-button
      v-for="({id, label, checked, disabled}, index) in DefaultRadioItems"
      :key="index"
      name="group-1"
      :label="label"
      :value="id"
      :checked="checked"
      :disabled="disabled"
    />
  </cv-radio-group>
`;

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvRadioButton, CvRadioGroup },
    template,
    setup() {
      return {
        args,
        onChange: action('change'),
        DefaultRadioItems,
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  vertical: false,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
