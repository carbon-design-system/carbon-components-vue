import { CvTooltip } from '../../packages/core/src';

import { betterSource, radioArgTypes, /* removeArgTypes, */ slotHelper } from '../utils/storybook-helper';
import { Filter16 } from '@carbon/icons-vue';
import { alignments, directions } from '../../packages/core/src/components/cv-tooltip/consts';

const _default = [
  undefined,
  '<svg width="16" height="12" viewBox="0 0 16 12"><path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>',
];

const slotsInfo = [{ slot: 'default', options: _default }];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTooltip',
  component: CvTooltip,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    alignment: radioArgTypes(alignments),
    direction: radioArgTypes(directions),
  },
  decorators: [
    () => ({
      template: `<div class="cv-sb__width--quarter cv-sb__position--middle" style="margin: 200px 300px;"><story /></div>`,
    }),
  ],
};

// these props are explicitly used by the component under test
const extractedProps = {};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTooltip, Filter16 },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tooltip v-bind="{...$props, ...extractedProps}" @tooltip-shown="actionShown" @tooltip-hidden="actionHidden">
  ${slotHelp.html}
</cv-tooltip>`,
});

export const _CvTooltip = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTooltip.args = {
  tip: 'This is your tip.',
};

_CvTooltip.parameters = {
  docs: {
    source: betterSource(Template, _CvTooltip),
  },
};
