import { CvButtonSkeleton } from './';
import { BUTTON_SIZE } from '@carbon/web-components/es/components/button/button';

const meta = {
  title: 'Components/CvButtons/CvButtonSkeleton',
  component: CvButtonSkeleton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(BUTTON_SIZE),
      default: BUTTON_SIZE.LARGE,
    },
  },
};
export default meta;

export const Default = {
  args: {
    size: BUTTON_SIZE.LARGE,
  },
};
export const Small = {
  args: {
    size: BUTTON_SIZE.SMALL,
  },
};

export const ExtraExtraLarge = {
  args: {
    size: BUTTON_SIZE.EXTRA_EXTRA_LARGE,
  },
};
