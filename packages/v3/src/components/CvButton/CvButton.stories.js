import { action } from '@storybook/addon-actions';
import { CvButton } from './';
import { buttonKinds, buttonSizes } from './consts';
import {
  sbCompPrefix,
  splitSlotArgs,
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
  title: `${sbCompPrefix}/${sbBtnPrefix}/CvButton`,
  component: CvButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    default: { control: { type: 'text' } },
    icon: { control: { type: 'select', options: Object.keys(icons) } },
    kind: {
      control: { type: 'select', options: buttonKinds },
      defaultValue: CvButton.props.kind.default,
    },
    size: {
      control: {
        type: 'select',
        options: buttonSizes,
      },
      defaultValue: CvButton.props.size.default,
    },
  },
};

const template = `<cv-button @click="onClick" v-bind="args">{{slotArgs.default}}</cv-button>`;
const Template = (argsIn, { argTypes }) => {
  let { args, slotArgs } = splitSlotArgs(argsIn, ['default']);
  args = { ...args, icon: icons[args.icon] };

  return {
    props: Object.keys(argTypes),
    components: { CvButton },
    setup() {
      return { args, onClick: action('click'), slotArgs };
    },
    template,
  };
};

export const Primary = Template.bind({});
Primary.args = {
  kind: 'primary',
  default: 'Primary',
};
Primary.parameters = storyParametersObject(
  Primary.parameters,
  template,
  Primary.args
);

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'secondary',
  default: 'Secondary',
};
Secondary.parameters = storyParametersObject(
  Secondary.parameters,
  template,
  Secondary.args
);

export const Field = Template.bind({});
Field.args = {
  'slotArgs.default': 'Field size',
  size: 'field',
};
Field.parameters = storyParametersObject(
  Field.parameters,
  template,
  Field.args
);

export const Small = Template.bind({});
Small.args = {
  'slotArgs.default': 'sm',
  size: 'sm',
};
Small.parameters = storyParametersObject(
  Small.parameters,
  template,
  Small.args
);

export const Large = Template.bind({});
Large.args = {
  'slotArgs.default': 'Large size',
  size: 'lg',
};
Large.parameters = storyParametersObject(
  Large.parameters,
  template,
  Large.args
);
