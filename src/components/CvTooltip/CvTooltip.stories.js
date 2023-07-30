import CvTooltip from './CvTooltip.vue';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { alignments, directions } from './consts';
import { sbTooltipPrefix } from './sbTooltipPrefix';

export default {
  title: `${sbCompPrefix}/${sbTooltipPrefix}/CvTooltip`,
  component: CvTooltip,
  argTypes: {
    alignment: {
      control: {
        type: 'select',
      },
      options: alignments,
      defaultValue: CvTooltip.props.alignment.default,
    },
    direction: {
      control: {
        type: 'select',
      },
      options: directions,
      defaultValue: CvTooltip.props.direction.default,
    },
    default: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Tooltip trigger slot.',
    },
    content: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Tooltip text slot',
    },
  },
};

const TipText = 'This is a tooltip';

const template = `<cv-tooltip v-bind="args" />`;

const Template = args => {
  return {
    components: { CvTooltip },
    template,
    setup() {
      return {
        args,
      };
    },
  };
};

export const Default = Template.bind({});
Default.args = {
  tip: TipText,
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

const triggerSlotTemplate = `
  <cv-tooltip v-bind="args">
    <svg width="16" height="12" viewBox="0 0 16 12">
      <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  </cv-tooltip>
`;

const TriggerSlotTemplate = args => {
  return {
    components: { CvTooltip },
    template: triggerSlotTemplate,
    setup() {
      return {
        args,
      };
    },
  };
};

export const TriggerSlot = TriggerSlotTemplate.bind({});
TriggerSlot.parameters = storyParametersObject(
  TriggerSlot.parameters,
  triggerSlotTemplate,
  TriggerSlot.args
);

const contentSlotTemplate = `
  <cv-tooltip v-bind="args">
    <template #content>
    <div>
      <p style="color:green;font-weight:bold;margin-bottom:5px;">Title</p>
      <p>Lorem ipsum dolor</p>
    </div>
    </template>
  </cv-tooltip>
`;

const ContentSlotTemplate = args => {
  return {
    components: { CvTooltip },
    template: contentSlotTemplate,
    setup() {
      return {
        args,
      };
    },
  };
};

export const ContentSlot = ContentSlotTemplate.bind({});
ContentSlot.parameters = storyParametersObject(
  ContentSlot.parameters,
  contentSlotTemplate,
  ContentSlot.args
);
