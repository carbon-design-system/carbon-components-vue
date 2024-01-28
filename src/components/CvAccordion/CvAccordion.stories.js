import { action } from '@storybook/addon-actions';
import { CvAccordion, CvAccordionItem } from '.';
import { alignConsts, sizeConsts } from './consts';
import { ref } from 'vue';

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
      <p>Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? R2! R2-D2, where are you? At last! Where have you been? They're heading in this direction.</p>
    </template>
  </cv-accordion-item>
</cv-accordion>`;
const Template = (args, { argTypes }) => {
  // eslint-disable-next-line no-param-reassign
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

/* V-MODEL STORY */

const open = ref({
  accItem1: false,
  accItem2: false,
  accItem3: false,
  accItem4: false,
});

const templateVModel = `
<div>
  <cv-accordion @change="onChange" v-bind="args">
  <cv-accordion-item v-for="n in 4" :key="\`acc-item-\${n}\`" :id="\`accItem\${n}\`" v-model:open="open[\`accItem\${n}\`]">
    <template #title>Section {{n}} title </template>
    <template #content>
      <p>Give us a few minutes to lock it down. Large leak...very dangerous. Who is this? What's your operating number? Boring conversation anyway. Luke! We're going to have company! Aren't you a little short to be a stormtrooper? What? Oh...the uniform.</p>
    </template>
  </cv-accordion-item>
  </cv-accordion>
<div style="margin-top:1rem; background-color: #888888;  padding:1rem"><div style="font-size: 150%">Sample interaction</div>
<label for="checkbox">V-model: Check 1:</label>
<input id="checkbox" type="checkbox" v-model="open.accItem1"/>
<span>Checked: <span style="font-weight: bold;">{{open.accItem1}}</span></span><br/>
<label for="checkbox">V-model: Check 2:</label>
<input id="checkbox" type="checkbox" v-model="open.accItem2"/>
<span>Checked: <span style="font-weight: bold;">{{open.accItem2}}</span></span><br/>
<label for="checkbox">V-model: Check 3:</label>
<input id="checkbox" type="checkbox" v-model="open.accItem3"/>
<span>Checked: <span style="font-weight: bold;">{{open.accItem3}}</span></span><br/>
<label for="checkbox">V-model: Check 4:</label>
<input id="checkbox" type="checkbox" v-model="open.accItem4"/>
<span>Checked: <span style="font-weight: bold;">{{open.accItem4}}</span></span>
</div>
</div>
`;

const TemplateVModel = args => {
  return {
    components: { CvAccordion, CvAccordionItem },
    setup: () => ({
      args,
      onChange: action('change'),
      open,
    }),
    template: templateVModel,
  };
};

export const VModel = TemplateVModel.bind({});
VModel.parameters = storyParametersObject(
  VModel.parameters,
  templateVModel,
  VModel.args
);
