import { action } from '@storybook/addon-actions';
import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import { CvAccordion, CvAccordionItem } from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvAccordion',
  component: CvAccordion,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    accordionOptions: {
      control: {
        type: 'select',
        labels: {
          0: 'Three items',
          1: 'Four items',
          2: 'Four items, third disabled',
        },
      },
      options: [0, 1, 2],
      mapping: ['test1', 'test2', 'test3'],
      defaultValue: 0,
    },
    align: {
      controls: { type: 'select' },
      options: [undefined, 'start', 'end'],
      defaultValue: undefined,
    },
    size: {
      controls: { type: 'select' },
      options: [undefined, 'sm', 'md', 'lg', 'xl'],
      defaultValue: undefined,
    },
    // ...deprecatedArgTypes(CvAccordion),
    ...removeArgTypes(['actionChange', 'change']),
    default: {
      description: 'Thd default slot of the AccordionItem hosts children as content.',
    },
    label: {
      control: { type: 'select' },
      options: ['Normal', 'Bold', 'Italic'],
      mapping: {
        Bold: 'B_O_L_D',
        Italic: 'I_T_A_L_I_C',
      },
    },
  },
};

const mapping = option => {
  let opt = [{ length: 3 }, { length: 4 }, { length: 4, disabled: 3 }][option];
  let result = [];
  for (let i = 0; i < opt.length; i++) {
    result.push({
      title: `Section ${i + 1} title`,
      disabled: opt?.disabled === i + 1,
      content: `<p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>`,
    });
  }
  return result;
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, accordionOptions: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvAccordion, CvAccordionItem },
  data() {
    return { extractedProps };
  },
  computed: {
    accordionItems() {
      return mapping(this.accordionOptions);
    },
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-accordion v-bind="{...$props, ...extractedProps}" @change="actionChange" :data-test="label">
  <cv-accordion-item v-for="item in accordionItems" :disabled="item.disabled" >
    <template slot="title">{{item.title}}</template>
    <template slot="content"><div v-html="item.content" /></template>
  </cv-accordion-item>
</cv-accordion>`,
});

export const _CvAccordion = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvAccordion.args = {
  actionChange,
};
