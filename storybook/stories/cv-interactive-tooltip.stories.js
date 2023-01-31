import { action } from '@storybook/addon-actions';
import { CvInteractiveTooltip } from '../../packages/core/src';

import { betterSource, /* removeArgTypes, */ slotHelper } from '../utils/storybook-helper';
import { Filter16 } from '@carbon/icons-vue';

const label = [undefined, 'Tooltip label'];
const trigger = [undefined, '<Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />'];
const content = [
  undefined,
  `<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><button class="bx--button">Clicky one</button></div>`,
];

const slotsInfo = [
  { slot: 'label', options: label },
  { slot: 'trigger', options: trigger, containsComponent: true },
  { slot: 'content', options: content, defaultIndex: 1 },
];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTooltip',
  component: CvInteractiveTooltip,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
  },
  decorators: [
    () => ({
      template: `<div class="cv-sb__width--quarter cv-sb__position--middle" style="margin: 200px 300px;"><story /></div>`,
    }),
  ],
};

const actionShown = action('shown');
const actionHidden = action('hidden');

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvInteractiveTooltip, Filter16 },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-interactive-tooltip v-bind="{...$props, ...extractedProps}" @tooltip-shown="actionShown" @tooltip-hidden="actionHidden">
  ${slotHelp.html}
</cv-interactive-tooltip>`,
});

export const _CvInteractiveTooltip = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvInteractiveTooltip.args = {
  actionHidden,
  actionShown,
};

_CvInteractiveTooltip.parameters = {
  docs: {
    source: betterSource(Template, _CvInteractiveTooltip),
  },
};
