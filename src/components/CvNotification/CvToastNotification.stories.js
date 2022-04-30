import { action } from '@storybook/addon-actions';
import { sbCompPrefix } from '../../global/storybook-utils';

import { CvToastNotification, CvNotificationConsts } from '.';

export default {
  title: `${sbCompPrefix}/CvToastNotification`,
  component: CvToastNotification,
  argTypes: {
    kind: {
      control: {
        type: 'select',
        options: CvNotificationConsts.notificationKinds,
      },
      defaultValue: CvNotificationConsts.notificationKinds[0],
      table: {
        defaultValue: {
          summary: `"${CvNotificationConsts.notificationKinds[0]}"`,
        },
      },
    },
    title: {
      control: { type: 'text' },
      defaultValue: 'Notification title',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.title.default}"`,
        },
      },
    },
    subTitle: {
      control: { type: 'text' },
      defaultValue: 'Subtitle text goes here.',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.subTitle.default}"`,
        },
      },
    },
    caption: {
      control: { type: 'text' },
      defaultValue: '00:00:00 AM',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.caption.default}"`,
        },
      },
    },
    closeAriaLabel: {
      control: { type: 'text' },
      defaultValue: CvToastNotification.props.closeAriaLabel.default,
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.closeAriaLabel.default}"`,
        },
      },
    },
    lowContrast: {
      control: { type: 'boolean' },
    },
  },
};

const template = `<cv-toast-notification v-bind="args" @close="onClose" />`;
const Template = args => {
  return {
    components: { CvToastNotification },
    template,
    setup() {
      return {
        args,
        onClose: action('close'),
      };
    },
  };
};

export const Info = Template.bind({});
Info.args = {
  kind: CvNotificationConsts.notificationKinds[0],
};

export const InfoSquare = Template.bind({});
InfoSquare.storyName = 'Info square';
InfoSquare.args = {
  kind: CvNotificationConsts.notificationKinds[1],
};

export const Success = Template.bind({});
Success.args = {
  kind: CvNotificationConsts.notificationKinds[2],
};

export const Warning = Template.bind({});
Warning.args = {
  kind: CvNotificationConsts.notificationKinds[3],
};

export const WarningAlt = Template.bind({});
WarningAlt.storyName = 'Warning (alt)';
WarningAlt.args = {
  kind: CvNotificationConsts.notificationKinds[4],
};

export const Error = Template.bind({});
Error.args = {
  kind: CvNotificationConsts.notificationKinds[5],
};
