import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';

import { CvDatePicker } from '.';
import { CvDatePickerSkeleton } from '.';
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

const initArgs = {
  dateLabel: 'Date label',
  invalidMessage: '',
};

const now = new Date();
const tomorrow = new Date();
const nextWeek = new Date();
tomorrow.setDate(now.getDate() + 1);
nextWeek.setDate(now.getDate() + 7);

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
    dateLabel: { type: String },
    dateEndLabel: { type: String },
    invalidMessage: { type: String },
    kind: {
      type: String,
      options: ['short', 'simple', 'single', 'range'],
      control: { type: 'select' },
    },
    disabled: { type: Boolean },
    placeholder: { type: String },
    pattern: { type: String },
    calOptions: { type: Object },
  },
};

/* DEFAULT STORY */

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

/* V-MODEL STORY */

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
    <template #invalid-message>Invalid date slot</template>
  </cv-date-picker>
</div>
`;

const TemplateInvalidMessageSlot = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateInvalidMessageSlot,
  };
};

export const InvalidMessageSlot = TemplateInvalidMessageSlot.bind({});
InvalidMessageSlot.args = initArgs;

/* SINGLE USING DATE STORY */

const templateSingleUsingDate = `
<div>
  <cv-date-picker v-bind='args' @change='onChange' kind="single" :value="now">
  </cv-date-picker>
</div>
`;

const TemplateSingleUsingDate = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      onChange: action('change'),
    }),
    template: templateSingleUsingDate,
  };
};

export const SingleUsingDate = TemplateSingleUsingDate.bind({});
SingleUsingDate.args = initArgs;

/* SINGLE USING MIN MAX PARAMS STORY */

const templateSingleUsingMinMax = `
<div>
  <cv-date-picker v-bind='args' @change='onChange' kind="single" :value="now" :cal-options="calOptions">
  </cv-date-picker>
</div>
`;

const TemplateSingleUsingMinMax = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      calOptions: {
        minDate: now,
        maxDate: nextWeek,
        dateFormat: 'm/d/Y',
      },
      onChange: action('change'),
    }),
    template: templateSingleUsingMinMax,
  };
};

const codeMinMax = `
const now = new Date();
const nextWeek = new Date();
nextWeek.setDate(now.getDate() + 7);
const calOptions = ref({
        minDate: now,
        maxDate: nextWeek,
        dateFormat: 'm/d/Y'
      })
${templateSingleUsingMinMax}
`;
const docMinMax = `Example showing how "calOptions" prop can be used to control the min/max date.`;
export const SingleUsingMinMax = TemplateSingleUsingMinMax.bind({});
SingleUsingMinMax.args = initArgs;

SingleUsingMinMax.parameters = {
  docs: {
    source: { code: codeMinMax },
    description: {
      story: docMinMax,
    },
  },
};

/* RANGE USING DATE STORY */

const templateRangeUsingDate = `
<div>
  <cv-date-picker v-bind='args' @change='onChange' kind="range" :value="{startDate: now.toLocaleDateString(), endDate: tomorrow.toLocaleDateString()}">
  </cv-date-picker>
</div>
`;

const TemplateRangeUsingDate = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      tomorrow,
      onChange: action('change'),
    }),
    template: templateRangeUsingDate,
  };
};

export const RangeUsingDate = TemplateRangeUsingDate.bind({});
RangeUsingDate.args = initArgs;

/* MINIMAL STORY */

const templateMinimal = `
<div>
  <cv-date-picker v-bind='args' @change='onChange'>
  </cv-date-picker>
</div>
`;

const TemplateMinimal = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateMinimal,
  };
};

export const Minimal = TemplateMinimal.bind({});

/* SKELETON STORY */

const templateSkeleton = `
<div>
  <cv-date-picker-skeleton v-bind='args'></cv-date-picker-skeleton>
</div>
`;

const TemplateSkeleton = args => {
  return {
    components: { CvDatePicker, CvDatePickerSkeleton },
    setup: () => ({
      args,
      onChange: action('change'),
    }),
    template: templateSkeleton,
  };
};

export const Skeleton = TemplateSkeleton.bind({});
