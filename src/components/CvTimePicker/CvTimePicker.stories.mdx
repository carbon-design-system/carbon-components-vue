import { Canvas, Meta, Story } from '@storybook/addon-docs';
import CvTimePicker from './CvTimePicker.vue';
import { sbCompPrefix } from '../../global/storybook-utils';
import { action } from '@storybook/addon-actions';
import {
  FIELD_MEDIUM,
  TIME_PICKER_AM,
  TIME_PICKER_HOURS,
  TIME_PICKER_SIZES,
} from './index';
import { ref } from 'vue';
const myTime = ref('10:04');
const myHour = ref('PM');
const myZone = ref('America/Los_Angeles');

<Meta title={`${sbCompPrefix}/CvTimePicker`} component={CvTimePicker} />

export const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    CvTimePicker,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      light: args.light,
      ampm: args.ampm,
      ampmSelectLabel: args.ampmSelectLabel,
      disabled: args.disabled,
      invalidMessage: args.invalidMessage,
      label: args.label,
      pattern: args.pattern,
      placeholder: args.placeholder,
      time: args.time,
      timezone: args.timezone,
      timezones: args.timezones,
      timezonesSelectLabel: args.timezonesSelectLabel,
      fieldSize: args.fieldSize,
      slotInvalidText: args.slotInvalidText,
      myTime,
      myHour,
      myZone,
      onChange: action('change'),
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});
const defaultTemplate = `
<cv-time-picker
  :light="light"
  :label="label"
  :time="time"
  :ampm="ampm"
  :pattern="pattern"
  :placeholder="placeholder"
  :ampm-select-label="ampmSelectLabel"
  :invalid-message="invalidMessage"
  :disabled="disabled"
  :fieldSize="fieldSize"
  @change="onChange">
</cv-time-picker>`;
const timezoneTemplate = `
<cv-time-picker
  :timezone="timezone"
  :timezones="timezones"
  :timezones-select-label="timezonesSelectLabel"
  :fieldSize="fieldSize"
  @change="onChange">
</cv-time-picker>`;
const slotTemplate = `
<cv-time-picker
  @change="onChange">
  <template v-if="slotInvalidText" v-slot:invalid-message>Temporal paradox</template>
</cv-time-picker>`;
const vModelTemplate = `
<div>
<cv-time-picker
  v-model:time="myTime"
  v-model:ampm="myHour"
  v-model:timezone="myZone"
  :timezones="timezones"
  @change="onChange">
</cv-time-picker>
<div style="margin-top: 1rem; background-color: rgb(136, 136, 136); padding: 1rem;">
<h2>Sample interaction</h2>
<div>
  <label>time: <input type="text" v-model="myTime"></label>
  <label>Ampm:
    <select v-model="myHour">
    <option value="AM">AM</option>
    <option value="PM">PM</option>
    </select>
  </label>
  <label>Timezone:
    <select v-model="myZone">
      <option value="America/Los_Angeles">America/Los Angeles</option>
      <option value="Moon/Tranquility_Base">Moon Standard Time</option>
    </select>
  </label>
</div>
</div>
</div>`;

# CvTimePicker

**Migration notes:**

- The `formItem` boolean property is shown in the Vue 2 storybook, but it has no effect. It is removed from this version.
- The `fieldSize` property is new.

<Canvas>
  <Story
    name="Default"
    parameters={{
      controls: {
        exclude: [
          'change',
          'template',
          'update:ampm',
          'update:time',
          'update:timezone',
          'invalid-message',
          'timezone',
          'timezones',
          'timezonesSelectLabel',
        ],
      },
      docs: { source: { code: defaultTemplate } },
    }}
    args={{
      light: false,
      template: defaultTemplate,
    }}
    argTypes={{
      light: {
        type: String,
        description: '`true` to use the light version',
        table: { category: 'props' },
      },
      fieldSize: {
        control: 'select',
        default: FIELD_MEDIUM,
        options: TIME_PICKER_SIZES,
      },
      ampm: {
        control: 'select',
        default: TIME_PICKER_AM,
        options: TIME_PICKER_HOURS,
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# With timezones

- The timezone field does not appear unless there is a value for `timezones` array
- Sample is initialized with this data

```js
{
  timezones: [
    { value: 'America/New_York', label: 'America/New York' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai' },
    { value: 'Asia/Calcutta', label: 'Indian Standard Time' },
    { value: 'Asia/Shanghai', label: 'China Standard Time' },
    { value: 'Moon/Tranquility_Base', label: 'Moon Standard Time' },
  ];
}
```

<Canvas>
  <Story
    name="Include timezone"
    parameters={{
      controls: {
        exclude: [
          'change',
          'template',
          'update:ampm',
          'update:time',
          'update:timezone',
          'invalid-message',
          'ampm',
          'ampmSelectLabel',
          'disabled',
          'invalidMessage',
          'label',
          'light',
          'pattern',
          'placeholder',
          'time',
        ],
      },
      docs: { source: { code: timezoneTemplate } },
    }}
    args={{
      light: false,
      template: timezoneTemplate,
      timezones: [
        { value: 'America/New_York', label: 'America/New York' },
        { value: 'Europe/Berlin', label: 'Europe/Berlin' },
        { value: 'Asia/Dubai', label: 'Asia/Dubai' },
        { value: 'Asia/Calcutta', label: 'Indian Standard Time' },
        { value: 'Asia/Shanghai', label: 'China Standard Time' },
        { value: 'Moon/Tranquility_Base', label: 'Moon Standard Time' },
      ],
    }}
    argTypes={{
      timezones: { control: false },
      fieldSize: {
        control: 'select',
        default: FIELD_MEDIUM,
        options: TIME_PICKER_SIZES,
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# With `invalid-message` slot

<Canvas>
  <Story
    name="Slots"
    parameters={{
      controls: {
        exclude: [
          'change',
          'template',
          'update:ampm',
          'update:time',
          'update:timezone',
          'invalid-message',
          'ampm',
          'ampmSelectLabel',
          'disabled',
          'invalidMessage',
          'label',
          'light',
          'pattern',
          'placeholder',
          'time',
          'fieldSize',
          'timezone',
          'timezones',
          'timezonesSelectLabel',
        ],
      },
      docs: { source: { code: slotTemplate } },
    }}
    args={{
      template: slotTemplate,
      slotInvalidText: false,
    }}
    argTypes={{}}
  >
    {Template.bind({})}
  </Story>
</Canvas>

# v-model

<Canvas>
  <Story
    name="v-model"
    parameters={{
      controls: {
        exclude: [
          'change',
          'template',
          'update:ampm',
          'update:time',
          'update:timezone',
          'invalid-message',
          'timezone',
          'timezones',
          'timezonesSelectLabel',
          'ampm',
          'ampmSelectLabel',
          'disabled',
          'invalidMessage',
          'fieldSize',
          'label',
          'light',
          'pattern',
          'placeholder',
          'time',
        ],
      },
      docs: { source: { code: vModelTemplate } },
    }}
    args={{
      light: false,
      template: vModelTemplate,
      timezones: [
        { value: 'America/Los_Angeles', label: 'America/Los Angeles' },
        { value: 'Moon/Tranquility_Base', label: 'Moon Standard Time' },
      ],
    }}
    argTypes={{
      light: {
        type: String,
        description: '`true` to use the light version',
        table: { category: 'props' },
      },
      fieldSize: {
        control: 'select',
        default: FIELD_MEDIUM,
        options: TIME_PICKER_SIZES,
      },
      ampm: {
        control: 'select',
        default: TIME_PICKER_AM,
        options: TIME_PICKER_HOURS,
      },
    }}
  >
    {Template.bind({})}
  </Story>
</Canvas>
