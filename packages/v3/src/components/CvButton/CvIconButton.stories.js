import { action } from '@storybook/addon-actions';
import { CvIconButton } from './';
import { buttonKinds, buttonSizes } from './consts.js';
import {
  sbCompPrefix,
  storybookControlsFromProps,
  storyParametersObject,
} from '../../global/storybook-utils';
import { sbBtnPrefix } from './sbBtnPrefix';

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
  title: `${sbCompPrefix}/${sbBtnPrefix}/CvIconButton`,
  component: CvIconButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    /**
     * \@carbon/icons-vue icon, href, svg or symbol
     */
    icon: {
      control: {
        type: 'select',
        options: Object.keys(icons),
      },
    },
    /**
     * Carbon button kind
     */
    kind: {
      control: { type: 'select', options: buttonKinds },
      defaultValue: CvIconButton.props.kind.default,
    },
    /**
     * Size of the button
     */
    size: {
      control: { type: 'select', options: buttonSizes },
      defaultValue: CvIconButton.props.size.default,
    },
  },
};

const template = `<cv-icon-button @click="onClick" v-bind="newArgs" />`;
const Template = (args, { argTypes }) => {
  const newArgs = { ...args, icon: icons[args.icon] };
  return {
    props: Object.keys(argTypes),
    components: { CvIconButton },
    template,
    setup() {
      return { newArgs, onClick: action('click') };
    },
  };
};

const defaultArgs = { icon: 'Bee20' };

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  kind: 'primary',
  label: 'primary',
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
  label: 'Secondary',
  icon: 'Bee20',
};
Secondary.parameters = storyParametersObject(
  Secondary.parameters,
  template,
  Secondary.args,
  'v-bind="newArgs"'
);

export const Field = Template.bind({});
Field.args = {
  label: 'Field size',
  size: 'field',
  icon: 'Bee20',
};
Field.parameters = storyParametersObject(
  Field.parameters,
  template,
  Field.args,
  'v-bind="newArgs"'
);

export const Small = Template.bind({});
Small.args = {
  label: 'sm',
  size: 'sm',
  icon: 'Bee20',
};
Small.parameters = storyParametersObject(
  Small.parameters,
  template,
  Small.args,
  'v-bind="newArgs"'
);

export const Large = Template.bind({});
Large.args = {
  label: 'Large size',
  size: 'lg',
  icon: 'Bee20',
};
Large.parameters = storyParametersObject(
  Large.parameters,
  template,
  Large.args,
  'v-bind="newArgs"'
);
