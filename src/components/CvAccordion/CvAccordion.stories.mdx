import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { action } from '@storybook/addon-actions';
import { CvAccordion, CvAccordionItem } from '.';
import { alignConsts, sizeConsts } from './consts';
import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { ref } from 'vue';
const open = ref({
  accItem1: false,
  accItem2: false,
  accItem3: false,
  accItem4: false,
});
const disabledItems = ref(new Set())
function onToggleEpisode3(){
  if (disabledItems.value.has(3)) disabledItems.value.delete(3)
  else disabledItems.value.add(3)
}

<Meta title={`${sbCompPrefix}/CvAccordion`} component={CvAccordion} />

export const Template = args => ({
  components: { CvAccordion, CvAccordionItem },
  setup() {
    return {
      ...args,
      align: alignConsts[alignConsts.$labels[args.align]],
      size: sizeConsts[sizeConsts.$labels[args.size]],
      onChange: action('change'),
      disabledItems,
      onToggleEpisode3,
      open,
    };
  },
  template: args.template,
});
const template = `<cv-accordion @change="onChange" :align="align" :size="size">
  <cv-accordion-item v-for="n in 4" :key="\`acc-item-\${n}\`" :id="n % 2 ? \`acc-item-\${n}\` : ''" :disabled="disabledItems.has(n)">
    <template v-slot:title>Episode {{n}} </template>
    <template v-slot:content>
      <p>Did you hear that? They've shut down the main reactor. We'll be destroyed for sure. This is madness! We're doomed! There'll be no escape for the Princess this time. What's that? R2! R2-D2, where are you? At last! Where have you been? They're heading in this direction.</p>
    </template>
  </cv-accordion-item>
</cv-accordion>
<div><button @click="onToggleEpisode3">Disable Episode 3</button></div>
`;
const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
const templateVModel = `
<div>
  <cv-accordion @change="onChange" :align="align" :size="size">
  <cv-accordion-item v-for="n in 4" :key="\`acc-item-\${n}\`" :id="\`accItem\${n}\`" v-model:open="open[\`accItem\${n}\`]">
    <template #title>Episode {{n}} </template>
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

# CvAccordion

<Canvas>
  <Story
    name="Default"
    parameters={{
      docs: { source: { code: template } },
      controls: {
        include: ['align', 'size'],
      },
    }}
    args={{
      template: template,
    }}
    argTypes={{
      align: {
        control: 'select',
        options: Object.keys(alignConsts.$labels),
      },
      size: {
        control: 'select',
        options: Object.keys(sizeConsts.$labels),
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# Control open state with v-model

- Notes: The Vue 2 component does not support v-model. One interesting implementation using this would be to create an
  "auto close" component such that opening one section closes other sections.

```javascript
// example auto close
// <cv-accordion @change="onAutoClose">
const open = ref({
  accItem1: false,
  accItem2: false,
  accItem3: false,
  accItem4: false,
});
function autoClose(ev) {
  if (ev.change.open) {
    for (let state in open.value) {
      if (state !== ev.change.id) open.value[state] = false;
    }
  }
}
```

<Canvas>
  <Story
    name="v-model"
    parameters={{
      docs: { source: { code: templateVModel } },
      controls: {
        include: ['align', 'size'],
      },
    }}
    args={{
      template: templateVModel,
    }}
    argTypes={{
      align: {
        control: 'select',
        default: 'end',
        options: Object.keys(alignConsts.$labels),
      },
      size: {
        control: 'select',
        default: 'md',
        options: Object.keys(sizeConsts.$labels),
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
