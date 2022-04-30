import { action } from '@storybook/addon-actions';
import { sbCompPrefix } from '../../global/storybook-utils';

import { CvInlineNotification, CvNotificationConsts } from '.';

export default {
  title: `${sbCompPrefix}/CvInlineNotification`,
  component: CvInlineNotification,
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
          summary: `"${CvInlineNotification.props.title.default}"`,
        },
      },
    },
    subTitle: {
      control: { type: 'text' },
      defaultValue: 'Subtitle text goes here.',
      table: {
        defaultValue: {
          summary: `"${CvInlineNotification.props.subTitle.default}"`,
        },
      },
    },
    actionLabel: {
      control: { type: 'text' },
      defaultValue: 'Action',
      table: {
        defaultValue: {
          summary: `"${CvInlineNotification.props.actionLabel.default}"`,
        },
      },
    },
    closeAriaLabel: {
      control: { type: 'text' },
      defaultValue: CvInlineNotification.props.closeAriaLabel.default,
      table: {
        defaultValue: {
          summary: `"${CvInlineNotification.props.closeAriaLabel.default}"`,
        },
      },
    },
    lowContrast: {
      control: { type: 'boolean' },
    },
  },
};

const template = `<cv-inline-notification v-bind="args" @action="onAction" @close="onClose" />`;
const Template = args => {
  return {
    components: { CvInlineNotification },
    template,
    setup() {
      return {
        args,
        onAction: action('action'),
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
