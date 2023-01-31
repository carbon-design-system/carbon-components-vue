import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import { CvTimePicker } from '../../packages/core/src/';

const invalidMessage = [undefined, 'Invalid message takes precedence over use of "invalidMessage" prop.'];

const slotsInfo = [{ slot: 'invalid-message', options: invalidMessage }];

const slotHelp = slotHelper(slotsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTimePicker',
  component: CvTimePicker,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    timezones: {
      control: { type: 'select', labels: ['undefined', 'Array of time zones'] },
      options: [
        [],
        [
          {
            label: 'Timezone-1',
            value: 'timezone1',
          },
          {
            label: 'Timezone-2',
            value: 'timezone2',
          },
        ],
      ],
    },
    ...slotHelp.argTypes,
    ...deprecatedArgTypes(CvTimePicker),
    ...removeArgTypes(['actionAmpm', 'actionTime', 'actionTimezone', 'modelEvent', 'v-model']),
  },
}; // will have dif wrapped round it in story template

const actionAmpm = action('update:ampm');
const actionTimezone = action('update:timezone');
const actionTime = action('update:time');

// these props are explicitly used by the component under test
const extractedProps = { actionAmpm: null, actionTime: null, actionTimezone: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTimePicker },
  data() {
    return { extractedProps };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-time-picker v-bind="{...$props, ...extractedProps}" ref="target">
    ${slotHelp.html}
  </cv-time-picker>
  <demo-methods :functions="[{name: 'focus', afterFunc: 'blur', info: 'Calls focus and then blur after a few seconds' }]" :targetRef="[$refs, 'target']" />
</div>`,
});

export const _CvTimePicker = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTimePicker.args = {
  actionAmpm,
  actionTime,
  actionTimezone,
  label: 'Select a time',
  placeholder: 'hh:mm',
  pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
};

_CvTimePicker.parameters = {
  docs: {
    source: betterSource(Template, _CvTimePicker),
  },
};

// these props are explicitly used by the component under test
const extractedPropsWithDotSync = {
  actionAmpm: null,
  actionTime: null,
  actionTimezone: null,
  time: null,
  timezone: null,
  ampm: null,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateWithDotSync = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTimePicker },
  data() {
    return { timeSync: '', timezoneSync: 'timezone-1', ampmSync: 'am', extractedProps: extractedPropsWithDotSync };
  },
  computed: {
    ...slotHelp.computed,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-time-picker v-bind="$props" :time.sync="timeSync" :timezone.sync="timezoneSync" :ampm.sync="ampmSync" >
    ${slotHelp.html}
  </cv-time-picker>
  <demo-container>
    <label>A standard HTML input control
      <input type="text" v-model="timeSync"></input>
      <select v-model="ampmSync">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <select v-model="timezoneSync">
        <option value="timezone1">Timezone 1</option>
        <option value="timezone2">Timezone 2</option>
      </select>
    </label>
    <br><br>
    <span>Current value: {{ time }} {{ ampm }} {{ timezone }}</span>
  </demo-container>
</div>`,
});

export const CvTimePickerWithDotSync = TemplateWithDotSync.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
CvTimePickerWithDotSync.args = {
  actionAmpm,
  actionTime,
  actionTimezone,
  label: 'Select a time',
  placeholder: 'hh:mm',
  pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
};
// CvTimePickerWithDotSync.parameters = { controls: { include: ['label'] } };
