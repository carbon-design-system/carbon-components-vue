import { action } from '@storybook/addon-actions';
import DocumentationTemplate from './CvToastNotificationTemplate.mdx';
import { sbCompPrefix, storySourceCode } from '../../global/storybook-utils';
import { CvToastNotification, CvNotificationConsts } from '.';

export default {
  title: `${sbCompPrefix}/CvToastNotification`,
  component: CvToastNotification,
  argTypes: {
    kind: {
      control: 'select',
      options: CvNotificationConsts.notificationKinds,
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.kind.default}"`,
        },
      },
    },
    title: {
      control: 'text',
      default: 'Notification title',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.title.default}"`,
        },
      },
    },
    subTitle: {
      control: 'text',
      default: 'Subtitle text goes here.',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.subTitle.default}"`,
        },
      },
    },
    caption: {
      control: 'text',
      default: '00:00:00 AM',
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.caption.default}"`,
        },
      },
    },
    closeAriaLabel: {
      control: 'text',
      default: CvToastNotification.props.closeAriaLabel.default,
      table: {
        defaultValue: {
          summary: `"${CvToastNotification.props.closeAriaLabel.default}"`,
        },
      },
    },
    lowContrast: {
      control: 'boolean',
    },
    // slots
    default: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Slot for additional custom content.',
    },
    'title ': {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Title slot for more custom content.',
    },
    subtitle: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Subtitle slot for more custom content.',
    },
    'caption ': {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Caption slot for more custom content.',
    },
  },
  parameters: {
    docs: {
      page: DocumentationTemplate,
    },
  },
};

const template = `
<cv-toast-notification v-bind="args" @close="onClose" >
  <template v-if="args.titleSlot" #title>
    <strong style="color: orange; font-size: 1.25rem;">Custom</strong> <span style="color: yellow;">title</span>
  </template>

  <template v-if="args.subtitleSlot" #subtitle>
    Some <strong style="color: orange; font-size: 1.25rem;">custom</strong> <span style="color: yellow;">subtitle</span>
  </template>

  <template v-if="args.captionSlot" #caption>
    Some <span style="color: green;">custom</span> <strong style="color: orange; font-size: 0.75rem;">caption</strong>
  </template>

  <template v-if="args.defaultSlot">
    Default slot content.
  </template>
</cv-toast-notification>`;
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

export const Default = Template.bind({});
Default.args = {
  kind: CvNotificationConsts.notificationKinds[0],
  title: 'info',
  subTitle: 'subtitle',
  caption: 'more information',
};
Default.parameters = {
  docs: { source: { code: storySourceCode(template, Default.args) } },
};

export const InfoSquare = Template.bind({});
InfoSquare.storyName = 'Info square';
InfoSquare.args = {
  kind: CvNotificationConsts.notificationKinds[1],
  title: 'info²',
  subTitle: 'subtitle',
  caption: 'more information',
};
InfoSquare.parameters = {
  docs: { source: { code: storySourceCode(template, InfoSquare.args) } },
};

export const Success = Template.bind({});
Success.args = {
  kind: CvNotificationConsts.notificationKinds[2],
  title: 'success',
  subTitle: 'subtitle',
  caption: 'more information',
};
Success.parameters = {
  docs: { source: { code: storySourceCode(template, Success.args) } },
};
export const Warning = Template.bind({});
Warning.args = {
  kind: CvNotificationConsts.notificationKinds[3],
  title: 'warning',
  subTitle: 'subtitle',
  caption: 'more information',
};
Warning.parameters = {
  docs: { source: { code: storySourceCode(template, Warning.args) } },
};

export const WarningAlt = Template.bind({});
WarningAlt.storyName = 'Warning (alt)';
WarningAlt.args = {
  kind: CvNotificationConsts.notificationKinds[4],
  title: 'warning △',
  subTitle: 'subtitle',
  caption: 'more information',
};
WarningAlt.parameters = {
  docs: { source: { code: storySourceCode(template, WarningAlt.args) } },
};

export const Error = Template.bind({});
Error.args = {
  kind: CvNotificationConsts.notificationKinds[5],
  title: 'error',
  subTitle: 'subtitle',
  caption: 'more information',
};
Error.parameters = {
  docs: { source: { code: storySourceCode(template, Error.args) } },
};

export const SlotDefault = Template.bind({});
SlotDefault.args = {
  kind: CvNotificationConsts.notificationKinds[4],
  title: 'title',
  subTitle: 'subtitle',
  defaultSlot: true,
};
SlotDefault.parameters = {
  docs: { source: { code: storySourceCode(template, SlotDefault.args) } },
};

export const SlotTitle = Template.bind({});
SlotTitle.args = {
  kind: CvNotificationConsts.notificationKinds[0],
  titleSlot: true,
  subTitle: 'subtitle',
  caption: 'more information',
};
SlotTitle.parameters = {
  docs: { source: { code: storySourceCode(template, SlotTitle.args) } },
};

export const SlotSubtitle = Template.bind({});
SlotSubtitle.args = {
  kind: CvNotificationConsts.notificationKinds[3],
  subtitleSlot: true,
  title: 'title',
  caption: 'more information',
};
SlotSubtitle.parameters = {
  docs: { source: { code: storySourceCode(template, SlotSubtitle.args) } },
};

export const SlotCaption = Template.bind({});
SlotCaption.args = {
  kind: CvNotificationConsts.notificationKinds[1],
  captionSlot: true,
  title: 'title',
  subTitle: 'subtitle',
};
SlotCaption.parameters = {
  docs: { source: { code: storySourceCode(template, SlotCaption.args) } },
};
