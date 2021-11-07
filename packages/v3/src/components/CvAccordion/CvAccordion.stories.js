import { action } from '@storybook/addon-actions';
import { CvAccordion, CvAccordionItem } from '.';
import { alignConsts, sizeConsts } from './consts';

import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

export default {
  title: `${sbCompPrefix}/CvAccordion`,
  component: CvAccordion,
  argTypes: {
    align: {
      control: { type: 'select', options: Object.keys(alignConsts.$labels) },
    },
    size: {
      control: { type: 'select', options: Object.keys(sizeConsts.$labels) },
    },
  },
};

// <cv-button @click="onClick" v-bind="newArgs">{{defaultSlot}}</cv-button>
const template = `<cv-accordion @change="onChange" v-bind="args">
  <cv-accordion-item v-for="n in 4" :key="\`acc-item-\${n}\`" :id="n % 2 ? \`acc-item-\${n}\` : ''">
    <template v-slot:title>Section {{n}} title </template>
    <template v-slot:content>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </template>
  </cv-accordion-item>
</cv-accordion>`;
const Template = (args, { argTypes }) => {
  args = {
    ...args,
    align: alignConsts[alignConsts.$labels[args.align]],
    size: sizeConsts[sizeConsts.$labels[args.size]],
  };
  return {
    props: Object.keys(argTypes),
    components: { CvAccordion, CvAccordionItem },
    setup() {
      return { args, onChange: action('change') };
    },
    template,
  };
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
