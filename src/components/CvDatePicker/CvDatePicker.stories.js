import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvDatePicker } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  dateLabel: 'Date label',
  invalidMessage: '',
};

export default {
  title: `${sbCompPrefix}/CvDatePicker`,
  component: CvDatePicker,
  parameters: {
    a11y: {
      config: {
        rules: [],
      },
      manual: true,
    },
  },
  argTypes: {
    dateLabel: { type: String, description: 'Date picker label' },
    invalidMessage: {
      type: String,
      description: 'Date picker text on invalid value',
    },
  },
};

const template = `
<div>
  <cv-date-picker v-bind='args' @change='onChange'>
  </cv-date-picker>
</div>
`;
const Template = args => {
  return {
    components: { CvDatePicker },
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

const now = new Date();
const modelValue = ref('');
const templateVModel = `
<div>
  <cv-date-picker v-bind='args' @change='onChange' v-model="modelValue">
  </cv-date-picker>
</div>
<div style="margin: 32px 0;">
  <div style="font-size: 150%;">Sample interaction</div>
  <label for="date-model" style='margin-right: 0.5rem'>V-model:</label>
  <input id="date-model" type="text" :value="modelValue.startDate || modelValue" @change="ev => { if (args.kind === 'range') { modelValue.startDate = ev.currentTarget.value } else { modelValue = ev.currentTarget.value } }"/>
  <input v-if="args.kind === 'range'" id="date-model" type="text" :value="modelValue.endDate" @change="ev => modelValue.endDate = ev.currentTarget.value"/>
</div>
`;

const TemplateVModel = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      modelValue,
      now,
      onChange: action('change'),
      onFilter: action('filter'),
    }),
    template: templateVModel,
  };
};

export const vModel = TemplateVModel.bind({});
vModel.args = initArgs;
vModel.parameters = storyParametersObject(
  vModel.parameters,
  templateVModel,
  vModel.args
);

/* INVALID MESSAGE STORY */

const templateInvalidMessage = `
<div>
  <cv-date-picker v-bind='args' @change='onChange'>
  </cv-date-picker>
</div>
`;

const TemplateInvalidMessage = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
      onFilter: action('filter'),
    }),
    template: templateInvalidMessage,
  };
};

export const InvalidMessage = TemplateInvalidMessage.bind({});
InvalidMessage.args = { ...initArgs, invalidMessage: 'Invalid date' };

/* INVALID MESSAGE SLOT STORY */

const templateInvalidMessageSlot = `
<div>
  <cv-date-picker v-bind='args' @change='onChange'>
    <template v-slot:invalid-message>Invalid date</template>
  </cv-date-picker>
</div>
`;

const TemplateInvalidMessageSlot = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
      onFilter: action('filter'),
    }),
    template: templateInvalidMessageSlot,
  };
};

export const InvalidMessageSlot = TemplateInvalidMessageSlot.bind({});
// InvalidMessageSlot.args = { ...initArgs, invalidMessage: 'Invalid date' };
