import { CvIconButton } from './';
import { fn } from '@storybook/test';
import {
  BUTTON_KIND,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
  BUTTON_TYPE,
  BUTTON_SIZE,
} from '@carbon/web-components/es/components/button/button';
import {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
} from '@carbon/icons-vue';
import { markRaw } from 'vue';

const icons = {
  Bee: markRaw(Bee20),
  Carbon: markRaw(Carbon20),
  Watson: markRaw(Watson20),
  'IBM Cloud': markRaw(IbmCloud20),
  EdtLoop: markRaw(EdtLoop20),
  'IBM Security': markRaw(IbmSecurity20),
};

const meta = {
  title: 'Components/CvButtons/CvIconButton',
  component: CvIconButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    tooltipText: 'This is only a icon',
    tooltipAlignment: BUTTON_TOOLTIP_ALIGNMENT.START,
    tooltipPosition: BUTTON_TOOLTIP_POSITION.BOTTOM,
    icon: Bee20,
  },
  parameters: {
    docs: {
      controls: {
        exclude: ['onClick'],
      },
    },
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
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
  },
};
export default meta;

export const Primary = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
  },
};
export const Secondary = {
  args: {
    kind: BUTTON_KIND.SECONDARY,
  },
};
export const Small = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
    size: BUTTON_SIZE.SMALL,
  },
};
export const ExtraLarge = {
  args: {
    kind: BUTTON_KIND.PRIMARY,
    size: BUTTON_SIZE.EXTRA_LARGE,
  },
};
