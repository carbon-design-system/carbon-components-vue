import { shallowRef } from '@vue/reactivity';

import CvButton from './CvButton';
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
  title: 'Components/CvButton',
  component: CvButton,
  argTypes: {
    ...commonPropsControls(commonCvButtonProps),
    icon: { control: { type: 'select', options: Object.keys(icons) } },
    kind: { control: { type: 'select', options: buttonKinds } },
    size: { control: { type: 'select', options: buttonSizes } },
  },
  parameters: {
    actions: {
      handles: ['mouseover', 'mousedown .bx--btn', 'click'],
    },
  },
};

// Some magic passes args
const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { CvButton },
    template: `<cv-button :data-test="label" v-bind="$props" :icon="icon">{{label}}</cv-button>`,
    setup(props) {
      const icon = shallowRef(icons[props.icon]);

      if (icon.value === undefined) {
        // assigning an icon seem sto need a kick
        setTimeout(() => {
          console.log(props.icon);
          icon.value === icons[props.icon];
          console.dir(icon.value);
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
  banana: 'banana',
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
  label: 'Secondary',
};

export const Field = Template.bind({});
Field.args = {
  label: 'Field size',
  size: 'field',
};

export const Small = Template.bind({});
Small.args = {
  label: 'sm',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large size',
  size: 'large',
};
