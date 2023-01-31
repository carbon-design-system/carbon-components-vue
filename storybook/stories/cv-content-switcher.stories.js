import { action } from '@storybook/addon-actions';
import { deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';

import { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent } from '../../packages/core/src/';
import { Bee20, Carbon20, Watson20, IbmCloud20, EdtLoop20, IbmSecurity20 } from '@carbon/icons-vue';

const icons = {
  'No Icon': undefined,
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
};

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvContentSwitcher',
  component: CvContentSwitcher,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: Object.keys(icons), // An array of serializable values
    },
    size: {
      controls: { type: 'select' },
      options: [undefined, 'sm', 'xl'],
      defaultValue: undefined,
    },
    ...deprecatedArgTypes(CvContentSwitcher),
    ...removeArgTypes(['actionSelected', 'selected', 'default']),
    default: { description: 'The content switcher components host children as content in their default slot.' },
  },
}; // will have dif wrapped round it in story template

const actionSelected = action('selected');

const switchers = Array.from({ length: 3 }, (_, index) => `csb-${index + 1}`);

// these props are explicitly used by the component under test
const extractedProps = { actionSelected: null, change: null, icon: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent },
  data() {
    return { extractedProps, switchers, selectedId: switchers[0], icons };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-content-switcher v-bind="{...$props, ...extractedProps}" @selected="actionSelected">
    <cv-content-switcher-button v-for="(item, index) in switchers" :owner-id="item" :selected="item === selectedId"  :icon="icons[$props.icon]">Button {{index + 1}}</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <cv-content-switcher-content v-for="(item, index) in switchers" :owner-id="item">
      <p>This is the content for option {{index + 1}}</p>
    </cv-content-switcher-content>
  </section>
</div>`,
});
//   <cv-content-switcher-button owner-id="csb-3" :selected="isSelected(2)" v-if="toggle3"
// :toggle3="toggle3"
// :disabled="disabled3"
// :icon="icon">Button Name 3</cv-content-switcher-button>

export const _CvContentSwitcher = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvContentSwitcher.args = {
  actionSelected,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateDom = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent },
  data() {
    return { extractedProps, switchers, selectedId: switchers[0], icons };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-content-switcher v-bind="{...$props, ...extractedProps}" @selected="actionSelected">
    <cv-content-switcher-button v-for="(item, index) in switchers" :content-selector="'.' + item" :selected="item === selectedId"  :icon="icons[$props.icon]">Button {{index + 1}}</cv-content-switcher-button>
  </cv-content-switcher>
  <section style="margin: 10px 0;">
    <div v-for="(item, index) in switchers" :class="item">
      <p>This is the content for option {{index + 1}}</p>
    </div>
  </section>
</div>`,
});
//   <cv-content-switcher-button owner-id="csb-3" :selected="isSelected(2)" v-if="toggle3"
// :toggle3="toggle3"
// :disabled="disabled3"
// :icon="icon">Button Name 3</cv-content-switcher-button>

export const _CvContentSwitcherDirectDom = TemplateDom.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvContentSwitcherDirectDom.args = {
  actionSelected,
};
