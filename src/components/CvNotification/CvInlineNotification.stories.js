import { action } from '@storybook/addon-actions';
import { sbCompPrefix, storySourceCode } from '../../global/storybook-utils';

import { CvInlineNotification, CvNotificationConsts } from '.';
import DocumentationTemplate from './CvInlineNotificationTemplate.mdx';

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
  parameters: {
    docs: {
      page: DocumentationTemplate,
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
  primary: true,
};
Info.parameters = {
  docs: { source: { code: storySourceCode(template, Info.args) } },
};

export const InfoSquare = Template.bind({});
InfoSquare.storyName = 'Info square';
InfoSquare.args = {
  kind: CvNotificationConsts.notificationKinds[1],
};
InfoSquare.parameters = {
  docs: { source: { code: storySourceCode(template, InfoSquare.args) } },
};

export const Success = Template.bind({});
Success.args = {
  kind: CvNotificationConsts.notificationKinds[2],
};
Success.parameters = {
  docs: { source: { code: storySourceCode(template, Success.args) } },
};

export const Warning = Template.bind({});
Warning.args = {
  kind: CvNotificationConsts.notificationKinds[3],
};
Warning.parameters = {
  docs: { source: { code: storySourceCode(template, Warning.args) } },
};

export const WarningAlt = Template.bind({});
WarningAlt.storyName = 'Warning (alt)';
WarningAlt.args = {
  kind: CvNotificationConsts.notificationKinds[4],
};
WarningAlt.parameters = {
  docs: { source: { code: storySourceCode(template, WarningAlt.args) } },
};

export const Error = Template.bind({});
Error.args = {
  kind: CvNotificationConsts.notificationKinds[5],
};
Error.parameters = {
  docs: { source: { code: storySourceCode(template, Error.args) } },
};

const templateSlots = `
  <cv-inline-notification v-bind="args">
    <template #title>
      <h2>Big title</h2>
    </template>
    <template #subtitle>
    Lorem ipsum dolor sit amet, <a href="#">consectetur adipisicing elit</a>, seed do eiusmod tempor <strong>incididunt ut labore</strong> et dolore magna aliqua.
    </template>
  </cv-inline-notification>`;
const SlotTemplate = args => {
  return {
    components: { CvInlineNotification },
    template: templateSlots,
    setup() {
      return {
        onAction: action('action'),
        onClose: action('close'),
        args,
      };
    },
  };
};
export const Slots = SlotTemplate.bind({});
Slots.args = {
  kind: CvNotificationConsts.notificationKinds[0],
  actionLabel: '',
  hideCloseButton: true,
};
Slots.parameters = {
  docs: { source: { code: storySourceCode(templateSlots, Slots.args) } },
};
