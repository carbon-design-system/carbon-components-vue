import { shallowRef } from '@vue/reactivity';

import CvIconButton from './CvIconButton';
import { buttonKinds, buttonSizes } from './consts.js';
import commonPropsControls from '../../global/storybook-utils';

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
  title: 'Components/CvIconButton',
  component: CvIconButton,
  argTypes: {
    ...commonPropsControls(commonCvButtonProps),
    icon: {
      control: {
        type: 'select',
        options: Object.keys(icons),
        value: 'Bee20',
      },
    },
    kind: { control: { type: 'select', options: buttonKinds } },
    size: { control: { type: 'select', options: buttonSizes, value: 'sm' } },
  },
  parameters: {
    actions: {
      handles: ['mouseover', 'mousedown .bx--btn', 'click'],
    },
  },
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvIconButton },
    template: `<cv-icon-button :data-test="label" v-bind="$props" :icon="icon"/>`,
    setup(props) {
      const icon = shallowRef(icons[props.icon]);

      if (icon.value === undefined) {
        // assigning an icon seem sto need a kick
        setTimeout(() => {
          icon.value === icons[props.icon];
        }, 1);
      }

      return { icon };
    },
  };
};

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
  label: 'primary',
  icon: 'Bee20',
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
  label: 'Secondary',
  icon: 'Bee20',
};

export const Field = Template.bind({});
Field.args = {
  label: 'Field size',
  size: 'field',
  icon: 'Bee20',
};

export const Small = Template.bind({});
Small.args = {
  label: 'sm',
  size: 'sm',
  icon: 'Bee20',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large size',
  size: 'lg',
  icon: 'Bee20',
};
