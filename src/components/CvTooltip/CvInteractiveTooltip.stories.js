import CvInteractiveTooltip from './CvInteractiveTooltip.vue';
import { storyParametersObject } from '../../global/storybook-utils';
import { alignments, directions } from './consts';
import Filter16 from '@carbon/icons-vue/es/filter/16';

export default {
  title: 'Component/CvInteractiveTooltip',
  component: CvInteractiveTooltip,
  argTypes: {
    alignment: {
      control: {
        type: 'select',
      },
      options: alignments,
      defaultValue: CvInteractiveTooltip.props.alignment.default,
    },
    direction: {
      control: {
        type: 'select',
      },
      options: directions,
      defaultValue: CvInteractiveTooltip.props.direction.default,
    },
    visible: {
      control: {
        type: 'boolean',
      },
      defaultValue: CvInteractiveTooltip.props.visible.default,
      description: 'Initial tooltip visibility state',
    },
    label: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Label slot.',
    },
    content: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Content slot.',
    },
    trigger: {
      table: {
        type: { summary: 'string | html | Component' },
        category: 'slots',
      },
      description: 'Trigger slot',
    },
  },
};
const template = `
  <cv-interactive-tooltip v-bind="args">
    <template #label>
      Tooltip label
    </template>
    <template #trigger>
      <Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
    </template>
    <template #content>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <button class="bx--button">Clicky one</button>
    </template>
  </cv-interactive-tooltip>
`;

const Template = args => {
  return {
    components: { CvInteractiveTooltip, Filter16 },
    template,
    setup() {
      return {
        args,
      };
    },
  };
};

export const Default = Template.bind({});
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
