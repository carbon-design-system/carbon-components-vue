// import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvOverflowMenu, CvOverflowMenuItem } from '../../packages/core/src/';

const slotsInfo = [
  {
    slot: 'trigger',
    options: [
      undefined,
      'Menu',
      '<div style="width: 16px; height: 16px; background-color: black; border-radius: 50%"></div>',
    ],
  },
];
const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvOverflowMenu',
  component: CvOverflowMenu,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    overflowMenuOptions: {
      control: {
        type: 'select',
        labels: {
          0: 'Three items',
          1: 'Four items',
          2: 'Four items, third disabled',
        },
      },
      options: [0, 1, 2],
      defaultValue: 0,
    },
    trigger: {
      control: {
        type: 'select',
        labels: {
          0: 'Three items',
          1: 'Four items',
          2: 'Four items, third disabled',
        },
      },
      options: [0, 1, 2],
      defaultValue: 0,
    },
    // ...deprecatedArgTypes(CvOverflowMenu),
    ...slotHelp.argTypes,
    ...removeArgTypes(['actionChange']),
    default: {
      description: 'Thd default slot of the OverflowMenuItem hosts children as content.',
    },
  },
};

const mapping = option => {
  let opt = [{ length: 3 }, { length: 4 }, { length: 4, disabled: 3 }][option];
  let result = [];
  for (let i = 0; i < opt.length; i++) {
    result.push({
      primaryFocus: i === 0,
      disabled: opt?.disabled === i + 1,
      danger: opt.length === i + 1,
      content: `Overflow item ${i + 1}`,
    });
  }
  return result;
};

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, overflowMenuOptions: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvOverflowMenu, CvOverflowMenuItem },
  data() {
    return { extractedProps };
  },
  computed: {
    overflowMenuItems() {
      return mapping(this.overflowMenuOptions);
    },
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-overflow-menu v-bind="{...$props, ...extractedProps}">
  ${slotHelp.html}
  <cv-overflow-menu-item v-for="item in overflowMenuItems" :danger="item.danger" :disabled="item.disabled" :primary-focus="item.primaryFocus"  >
    {{item.content}}
  </cv-overflow-menu-item>
</cv-overflow-menu>`,
});

export const _CvOverflowMenu = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvOverflowMenu.args = {
  label: 'Overflow menu',
};
