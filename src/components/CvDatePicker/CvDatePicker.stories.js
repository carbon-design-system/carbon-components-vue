import { storyParametersObject } from '../../global/storybook-utils';

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
  title: 'Component/CvDatePicker',
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
    kind: {
      type: String,
      options: ['short', 'simple', 'single', 'range'],
      control: { type: 'select' },
    },
    calOptions: { type: Object },
  },
};

/* DEFAULT STORY */

const template = `
<div>
  <cv-date-picker v-bind="args" :value="now" @change="onChange">
  </cv-date-picker>
</div>
`;
const Template = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      onChange: action('change'),
    }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = initArgs;
Default.parameters = {
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'modelValue',
      'dateChange',
    ],
  },
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);

/* V-MODEL STORY */

const modelValue = ref(now);
const templateVModel = `
<div>
  <cv-date-picker v-bind="args" v-model="modelValue">
  </cv-date-picker>
</div>
<div style="margin-top:2rem; background-color: #888888;  padding:1rem">
  <div style="font-size: 150%;">Sample interaction</div>
  <label for="date-model" style='margin-right: 0.5rem'>V-model:</label>
  <input id="date-model" type="text" :value="modelValue" @change="ev => { modelValue = ev.currentTarget.value }"/>
</div>
`;

const TemplateVModel = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      modelValue,
      now,
    }),
    template: templateVModel,
  };
};

export const vModel = TemplateVModel.bind({});
vModel.args = initArgs;
vModel.parameters = {
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'modelValue',
      'kind',
      'value',
      'dateChange',
    ],
  },
};
vModel.parameters = storyParametersObject(
  vModel.parameters,
  templateVModel,
  vModel.args
);

/* range v-model */
const rangeValue = ref({ startDate: now, endDate: now });
const templateRangeVModel = `
<div>
  <cv-date-picker v-bind="args" kind="range" v-model="rangeValue">
  </cv-date-picker>
</div>
<div style="margin-top:2rem; background-color: #888888;  padding:1rem">
  <div style="font-size: 150%;">Sample range interaction</div>
  <label for="date-model-1" style='margin-right: 0.5rem'>V-model:</label>
  <input id="date-model-1" type="text" :value="rangeValue.startDate" @change="ev => { rangeValue.startDate = ev.currentTarget.value }"/>
  <input id="date-model-2" type="text" :value="rangeValue.endDate" @change="ev => rangeValue.endDate = ev.currentTarget.value"/>
</div>
`;

const TemplateRangeVModel = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      rangeValue,
      now,
    }),
    template: templateRangeVModel,
  };
};

export const rangeVmodel = TemplateRangeVModel.bind({});
rangeVmodel.args = initArgs;
rangeVmodel.parameters = {
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'modelValue',
      'kind',
      'value',
      'dateChange',
    ],
  },
};
rangeVmodel.parameters = storyParametersObject(
  rangeVmodel.parameters,
  templateRangeVModel,
  rangeVmodel.args
);

/* INVALID MESSAGE STORY */

const templateInvalidMessage = `
<div>
  <cv-date-picker v-bind="args" :value="now" @change="onChange">
  </cv-date-picker>
</div>
`;

const TemplateInvalidMessage = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      onChange: action('change'),
    }),
    template: templateInvalidMessage,
  };
};

export const InvalidMessage = TemplateInvalidMessage.bind({});
InvalidMessage.args = { ...initArgs, invalidMessage: 'Invalid date' };
InvalidMessage.parameters = {
  controls: {
    include: ['invalidMessage'],
  },
};
InvalidMessage.parameters = storyParametersObject(
  InvalidMessage.parameters,
  templateInvalidMessage,
  InvalidMessage.args
);

/* INVALID MESSAGE SLOT STORY */

const templateInvalidMessageSlot = `
<div>
  <cv-date-picker v-bind="args" :value="now" @change="onChange">
    <template #invalid-message>Invalid date slot</template>
  </cv-date-picker>
</div>
`;

const TemplateInvalidMessageSlot = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      onChange: action('change'),
    }),
    template: templateInvalidMessageSlot,
  };
};

export const InvalidMessageSlot = TemplateInvalidMessageSlot.bind({});
InvalidMessageSlot.args = initArgs;
InvalidMessageSlot.parameters = {
  controls: {
    include: [],
  },
  docs: {
    description: {
      story: `Use slot to set invalid message \`<template #invalid-message>Invalid date slot</template>\``,
    },
  },
};
InvalidMessageSlot.parameters = storyParametersObject(
  InvalidMessageSlot.parameters,
  templateInvalidMessageSlot,
  InvalidMessageSlot.args
);

/* SINGLE USING DATE STORY */

const singleValue = ref(now);
const templateSingleUsingDate = `
<div>
  <cv-date-picker v-bind="args" kind="single" v-model="singleValue" @dateChange="onDateChange">
  </cv-date-picker>
</div>`;
const templateSingleUsingDateVModel = `
<div style="margin-top:2rem; background-color: #888888;  padding:1rem">
  <div style="font-size: 150%;">Sample interaction</div>
  <label for="date-model" style='margin-right: 0.5rem'>V-model:</label>
  <input id="date-model" type="text" :value="singleValue" @change="ev => { singleValue = ev.currentTarget.value }"/>
</div>
`;

const TemplateSingleUsingDate = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      singleValue,
      onDateChange: action('dateChange'),
    }),
    template: templateSingleUsingDate + templateSingleUsingDateVModel,
  };
};

export const SingleUsingDate = TemplateSingleUsingDate.bind({});
SingleUsingDate.args = initArgs;
SingleUsingDate.parameters = {
  controls: {
    include: ['dateLabel', 'disabled', 'invalidMessage', 'placeholder'],
  },
  docs: {
    description: {
      story: `Example of single date input with v-model`,
    },
  },
};
SingleUsingDate.parameters = storyParametersObject(
  SingleUsingDate.parameters,
  templateSingleUsingDate,
  SingleUsingDate.args
);

/* SINGLE USING MIN MAX PARAMS STORY */
const DATE_SHORT = 'm/d/Y';
const DATE_MED = 'M j, Y';
const calOptions = ref({
  minDate: now,
  maxDate: nextWeek,
  dateFormat: DATE_SHORT,
});
function toggleDateFormat() {
  calOptions.value.dateFormat =
    calOptions.value.dateFormat === DATE_SHORT ? DATE_MED : DATE_SHORT;
}
function buttonLabel() {
  return calOptions.value.dateFormat === DATE_SHORT ? DATE_MED : DATE_SHORT;
}
function changeMaxDate(inc) {
  calOptions.value.maxDate = new Date(
    nextWeek.setDate(nextWeek.getDate() + inc)
  );
}
const templateSingleUsingMinMax = `
<div>
  <cv-date-picker v-bind='args' kind="single" :value="now" :cal-options="calOptions" @dateChange="onDateChange">
  </cv-date-picker>
  <div style="margin-top:2rem; background-color: #888888;  padding:1rem; width:fit-content">
  <div>Reactive updates</div>
  <button @click='toggleDateFormat'>change date format &quot;{{buttonLabel()}}&quot;</button><br/>
  <button @click='changeMaxDate(1)'>+1 day to max date</button>
  <button @click='changeMaxDate(-1)'>-1 day from max date</button>
  <div>Max date: {{calOptions.maxDate}}</div>
  </div>
</div>
`;

const TemplateSingleUsingMinMax = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      calOptions,
      toggleDateFormat,
      buttonLabel,
      changeMaxDate,
      onDateChange: action('dateChange'),
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
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'modelValue',
      'kind',
      'dateChange',
      'value',
    ],
  },
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
  <cv-date-picker v-bind="args"
      kind="range"
      :value="{startDate: now.toLocaleDateString(), endDate: tomorrow.toLocaleDateString()}"
      @dateChange="onDateChange">
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
      onDateChange: action('dateChange'),
    }),
    template: templateRangeUsingDate,
  };
};

export const RangeUsingDate = TemplateRangeUsingDate.bind({});
RangeUsingDate.args = initArgs;
RangeUsingDate.parameters = {
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'kind',
      'modelValue',
      'dateChange',
      'value',
    ],
  },
};
RangeUsingDate.parameters = storyParametersObject(
  RangeUsingDate.parameters,
  templateRangeUsingDate,
  RangeUsingDate.args
);

/* MINIMAL STORY */

const templateMinimal = `
<div>
  <cv-date-picker v-bind="args" :value="now" @change="onChange"/>
</div>
`;

const TemplateMinimal = args => {
  return {
    components: { CvDatePicker },
    setup: () => ({
      args,
      now,
      onChange: action('change'),
    }),
    template: templateMinimal,
  };
};

export const Minimal = TemplateMinimal.bind({});
Minimal.parameters = {
  controls: {
    exclude: [
      'update:modelValue',
      'invalid-message',
      'modelValue',
      'dateChange',
      'value',
    ],
  },
};
Minimal.parameters = storyParametersObject(
  Minimal.parameters,
  templateMinimal,
  Minimal.args
);

/* SKELETON STORY */

const templateSkeleton = `
<div>
  <cv-date-picker-skeleton v-bind="args"></cv-date-picker-skeleton>
</div>
`;

const TemplateSkeleton = args => {
  return {
    components: { CvDatePicker, CvDatePickerSkeleton },
    setup: () => ({
      args,
    }),
    template: templateSkeleton,
  };
};

export const Skeleton = TemplateSkeleton.bind({});
Skeleton.args = initArgs;
Skeleton.args = initArgs;
Skeleton.parameters = {
  controls: {
    include: [],
  },
};
Skeleton.parameters = storyParametersObject(
  Skeleton.parameters,
  templateSkeleton,
  Skeleton.args
);
