import { action } from '@storybook/addon-actions';
import { CvButton } from './';
import { buttonKinds, buttonSizes } from './consts';
import { computed } from 'vue';
import {
  splitSlotArgs,
  storybookControlsFromProps,
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
  title: 'Component/CvButton',
  component: CvButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    default: { control: { type: 'text' } },
    icon: { control: { type: 'select' }, options: Object.keys(icons) },
    kind: { control: { type: 'select' }, options: buttonKinds },
    size: { control: { type: 'select' }, options: buttonSizes },
  },
  args: {
    kind: CvButton.props.kind.default,
    size: CvButton.props.size.default,
  },
};

const Template = argsIn => ({
  args: argsIn,
  render: args => ({
    components: { CvButton },
    setup() {
      return {
        args: computed(() => ({
          ...splitSlotArgs(args, ['default']).args,
          icon: icons[args.icon],
        })),
        slotArgs: computed(() => splitSlotArgs(args, ['default']).slotArgs),
        onClick: action('click'),
      };
    },
    template: `
    <cv-button @click="onClick" aria-label="button story" v-bind="args">{{slotArgs.default}}</cv-button>
    `,
  }),
});

export const Primary = Template({
  kind: 'primary',
  default: 'Primary',
});

export const Secondary = Template({
  kind: 'secondary',
  default: 'Secondary',
});

export const Field = Template({
  default: 'Field size',
  size: 'field',
});

export const Small = Template({
  default: 'sm',
  size: 'sm',
});

export const Large = Template({
  default: 'Large size',
  size: 'lg',
});
