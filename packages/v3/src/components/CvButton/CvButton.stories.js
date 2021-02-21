import { action } from '@storybook/addon-actions';
import { CvButton } from './';
import { buttonKinds, buttonSizes } from './consts.js';
import {
  storybookControlsFromProps,
  storyParametersObject,
} from '../../global/storybook-utils';
import { props as commonCvButtonProps } from './CvButtonCommon';
import {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
} from '@carbon/icons-vue';

const icons = {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
};

export default {
  title: 'Components/CvButton',
  component: CvButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    icon: { control: { type: 'select', options: Object.keys(icons) } },
    kind: { control: { type: 'select', options: buttonKinds } },
    size: { control: { type: 'select', options: buttonSizes } },
  },
};

const template = `<cv-button @click="onClick" v-bind="newArgs">{{defaultSlot}}</cv-button>`;
const Template = (args, { argTypes }) => {
  const newArgs = { ...args, icon: icons[args.icon] };
  return {
    props: Object.keys(argTypes),
    components: { CvButton },
    setup() {
      return { newArgs, onClick: action('click') };
    },
    template,
  };
};

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
  defaultSlot: 'Primary',
};
Primary.parameters = storyParametersObject(
  Primary.parameters,
  template,
  Primary.args,
  'v-bind="newArgs"'
);

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
  defaultSlot: 'Secondary',
};
Secondary.parameters = storyParametersObject(
  Secondary.parameters,
  template,
  Secondary.args,
  'v-bind="newArgs"'
);

export const Field = Template.bind({});
Field.args = {
  defaultSlot: 'Field size',
  size: 'field',
};
Field.parameters = storyParametersObject(
  Field.parameters,
  template,
  Field.args,
  'v-bind="newArgs"'
);

export const Small = Template.bind({});
Small.args = {
  defaultSlot: 'sm',
  size: 'sm',
};
Small.parameters = storyParametersObject(
  Small.parameters,
  template,
  Small.args,
  'v-bind="newArgs"'
);

export const Large = Template.bind({});
Large.args = {
  defaultSlot: 'Large size',
  size: 'lg',
};
Large.parameters = storyParametersObject(
  Large.parameters,
  template,
  Large.args,
  'v-bind="newArgs"'
);
