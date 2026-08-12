import { action } from '@storybook/addon-actions';
import { CvIconButton } from './';
import { buttonKinds, buttonSizes } from './consts.js';
import { storybookControlsFromProps } from '../../global/storybook-utils';
import { TipAlignments, TipDirections } from '../CvTooltip/consts.js';
import { props as commonCvButtonProps } from './CvButtonCommon';
import {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
} from '@carbon/icons-vue';
import { computed } from 'vue';

const icons = {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
};

export default {
  title: 'Component/CvIconButton',
  component: CvIconButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    icon: {
      control: 'select',
      options: Object.keys(icons),
    },
    kind: {
      control: 'select',
      options: buttonKinds,
    },
    size: {
      control: 'select',
      options: buttonSizes,
    },
    tipAlignment: {
      control: 'select',
      options: Object.values(TipAlignments),
    },
    tipPosition: {
      control: 'select',
      options: Object.values(TipDirections),
    },
  },
  args: {
    icon: 'Bee20',
    kind: CvIconButton.props.kind.default,
    size: CvIconButton.props.size.default,
    tipAlignment: CvIconButton.props.tipAlignment.default,
    tipPosition: CvIconButton.props.tipPosition.default,
  },
};

const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvIconButton },
    setup() {
      return {
        newArgs: computed(() => ({
          ...args,
          icon: icons[args.icon],
        })),
        onClick: action('click'),
      };
    },
    template: `<cv-icon-button @click="onClick" v-bind="newArgs" />`,
  }),
});

export const Primary = Template({
  kind: 'primary',
  label: 'primary',
});

export const Secondary = Template({
  kind: 'secondary',
  label: 'Secondary',
});

export const Field = Template({
  label: 'Field size',
  size: 'field',
});

export const Small = Template({
  label: 'sm',
  size: 'sm',
});

export const Large = Template({
  label: 'Large size',
  size: 'lg',
});
