import { CvButton } from './';
import { fn } from '@storybook/test';
import {
  BUTTON_KIND,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
  BUTTON_TYPE,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button';

const meta = {
  title: 'Components/CvButtons/CvButton',
  component: CvButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    kind: {
      control: 'select',
      options: Object.values(BUTTON_KIND),
      default: BUTTON_KIND.SECONDARY,
    },
    tooltipAlignment: {
      control: 'select',
      options: Object.values(BUTTON_TOOLTIP_ALIGNMENT),
      default: BUTTON_TOOLTIP_ALIGNMENT,
    },
    tooltipPosition: {
      control: 'select',
      options: Object.values(BUTTON_TOOLTIP_POSITION),
      default: BUTTON_TOOLTIP_POSITION,
    },
    type: {
      control: 'select',
      options: Object.values(BUTTON_TYPE),
      default: BUTTON_TYPE.BUTTON,
    },
    size: {
      control: 'select',
      options: Object.values(BUTTON_SIZE),
      default: BUTTON_SIZE.LARGE,
    },
  },
};
export default meta;

export const Primary = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
    default: 'Primary',
  },
};
export const Secondary = {
  args: {
    kind: BUTTON_KIND.SECONDARY,
    default: 'Secondary',
  },
};
export const Danger = {
  args: {
    kind: BUTTON_KIND.DANGER,
    default: 'Danger',
  },
};

export const Ghost = {
  args: {
    kind: BUTTON_KIND.GHOST,
    default: 'Ghost',
  },
};

export const Small = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
    size: BUTTON_SIZE.SMALL,
    default: 'Small size',
  },
};

export const ExtraExtraLarge = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
    size: BUTTON_SIZE.EXTRA_EXTRA_LARGE,
    default: 'Extra extra large size',
  },
};

export const Link = {
  args: {
    href: 'https://www.ibm.com',
    default: 'Click to open ibm.com',
    target: '_blank',
  },
};
