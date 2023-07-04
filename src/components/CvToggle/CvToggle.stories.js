import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvToggle } from '.';
import { CvToggleSkeleton } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  label: 'label',
  value: 'check-1',
  use_textLeft: false,
  use_textRight: false,
};

const initArgsMinimal = {
  value: 'check-1',
};

export default {
  title: `${sbCompPrefix}/CvToggle`,
  component: CvToggle,
  parameters: {
    a11y: {
      config: {
        rules: [],
      },
      manual: true,
    },
  },
  argTypes: {
    label: { description: 'Toggle label' },
    checked: {
      type: 'boolean',
      table: {
        type: { summary: 'boolean' },
        category: 'props',
      },
    },
  },
};

/* DEFAULT STORY */

const template = `
  <cv-toggle @change="onChange" v-bind='args' >
  <template v-slot:text-left v-if="args.use_textLeft"> 0 </template>
  <template v-slot:text-right v-if="args.use_textRight"> 1 </template>
  </cv-toggle>
`;
const Template = args => {
  return {
    components: { CvToggle },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = initArgs;
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

/* MINIMAL STORY */
const templateMinimal = `
<div>
  <cv-toggle @change="onChange" v-bind='args'> </cv-toggle>
</div>
`;
const TemplateMinimal = args => {
  return {
    components: { CvToggle },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateMinimal,
  };
};

export const Minimal = TemplateMinimal.bind({});
Minimal.args = initArgsMinimal;

/* EVENTS STORY */

const templateEvents = `
  <cv-toggle @change="onChange" v-bind='args'>
  </cv-toggle>
`;
const TemplateEvents = args => {
  return {
    components: { CvToggle },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateEvents,
  };
};

export const Events = TemplateEvents.bind({});
Events.args = initArgs;
Events.parameters = storyParametersObject(
  Events.parameters,
  template,
  Events.args
);
Events.args = initArgsMinimal;

/* VMODEL STORY */

const modelValue = ref(false);

const templateVModel = `
<div>
  <cv-toggle @change="onChange" v-model="modelValue" v-bind='args'>
  </cv-toggle>
<div style="margin-top:1rem; background-color: #888888;  padding:1rem"><div style="font-size: 150%">Sample interaction</div>
<label for="checkbox">V-model: Check 1:</label>
<input id="checkbox" type="checkbox" :checked='modelValue' @change="(ev) => {modelValue = ev.currentTarget.checked}"/>
<div>Checked: <span style="font-weight: bold;">{{modelValue}}</span></div>
</div>
</div>
`;

const TemplateVModel = args => {
  return {
    components: { CvToggle },
    setup: () => ({
      args,
      onChange: action('change'),
      modelValue,
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
VModel.args = initArgsMinimal;

/* ARRAY VMODEL STORY */

const handleModelValue = event => {
  const tempArr = new Set(Object.values(arrayModelValue.value));
  if (event.currentTarget.checked) {
    tempArr.add(event.currentTarget.id);
    arrayModelValue.value = Array.from(tempArr);
    return;
  }
  tempArr.delete(event.currentTarget.id);
  arrayModelValue.value = Array.from(tempArr);
};
let arrayModelValue = ref([]);

const isChecked = value => {
  const tempArr = new Set(Object.values(arrayModelValue.value));
  return tempArr.has(value);
};

const templateArrayVModel = `
<div>
  <cv-toggle v-model="arrayModelValue" name="check-1" value="check-1" v-bind='args'>
  </cv-toggle>
  <cv-toggle v-model="arrayModelValue" name="check-2" value="check-2" v-bind='args'>
  </cv-toggle>
  <cv-toggle v-model="arrayModelValue" name="check-3" value="check-3" v-bind='args'>
  </cv-toggle>
<div style="margin-top:1rem; background-color: #888888;  padding:1rem"><div style="font-size: 150%">Sample interaction</div>
<label for="check-1">V-model: Check 1:</label>
<input id="check-1" type="checkbox" :checked="isChecked('check-1')" @change="handleModelValue"/>
<label for="check-2">V-model: Check 2:</label>
<input id="check-2" type="checkbox" :checked="isChecked('check-2')" @change="handleModelValue"/>
<label for="check-3">V-model: Check 3:</label>
<input id="check-3" type="checkbox" :checked="isChecked('check-3')" @change="handleModelValue"/>
<div>Checked: <span style="font-weight: bold;">{{arrayModelValue}}</span></div>
</div>
</div>
`;

const TemplateArrayVModel = args => {
  return {
    components: { CvToggle },
    setup: () => ({
      args,
      arrayModelValue,
      handleModelValue,
      isChecked,
    }),
    template: templateArrayVModel,
  };
};

export const arrayVModel = TemplateArrayVModel.bind({});
arrayVModel.parameters = storyParametersObject(
  arrayVModel.parameters,
  templateArrayVModel,
  arrayVModel.args
);

/* SKELETON STORY */

const templateSkeleton = `
<div>
  <cv-toggle-skeleton></cv-toggle-skeleton>
</div>
`;

const TemplateSkeleton = args => {
  return {
    components: { CvToggle, CvToggleSkeleton },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateSkeleton,
  };
};

export const Skeleton = TemplateSkeleton.bind({});
