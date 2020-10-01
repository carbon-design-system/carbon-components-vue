import { storiesOf } from '@storybook/vue';
import { text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';
import TimerButton from '../_storybook/components/timer-button';

import CvTimePickerNotesMD from '../../packages/core/src/components/cv-time-picker/cv-time-picker-notes.md';
import { CvTimePicker } from '../../packages/core/src/';
const storiesDefault = storiesOf('Components/CvTimePicker', module);
// const storiesExperimental = storiesOf('Experimental/CvTimePicker', module);

const ampmConfig = [
  'ampm',
  {
    AM: 'AM',
    PM: 'PM',
    TwentyFourHour: '24',
  },
  'AM',
  // consts.CONFIG,// fails when used with number in storybook 4.1.4
];
const timezoneConfig = ['timezone', 'timezone1']; // consts.CONFIG],
const timeConfig = ['time', ''];

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'theme',
    value: val => (val ? 'light' : ''),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', 'Select time'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'label',
  },
  time: {
    group: 'attr',
    type: text,
    config: timeConfig,
    prop: 'time',
  },
  ampm: {
    group: 'attr',
    type: select,
    config: ampmConfig,
    prop: 'ampm',
  },
  timezone: {
    group: 'attr',
    type: text,
    config: timezoneConfig,
    prop: 'timezone',
  },
  timeSync: {
    group: 'attr',
    type: text,
    config: timeConfig,
    sync: 'time',
  },
  ampmSync: {
    group: 'attr',
    type: select,
    config: ampmConfig,
    sync: 'ampm',
  },
  timezoneSync: {
    group: 'attr',
    type: text,
    config: timezoneConfig,
    sync: 'timezone',
  },
  timezones: {
    group: 'attr',
    type: object,
    config: [
      'timezones',
      {
        list: [
          { label: 'Timezone-1', value: 'timezone1' },
          { label: 'Timezone-2', value: 'timezone2' },
        ],
      },
      // consts.CONFIG,
    ],
    prop: 'timezones',
    value: val => val.list,
  },
  pattern: {
    group: 'attr',
    type: text,
    config: ['pattern', '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)'], // consts.CONFIG],
    prop: 'pattern',
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'hh:mm'], // consts.CONTENT],
    prop: 'placeholder',
  },
  timezonesSelectLabel: {
    group: 'attr',
    type: text,
    config: ['timzones-select-label', 'Timezone label'], // consts.CONTENT],
    prop: 'timzones-select-label',
  },
  ampmSelectLabel: {
    group: 'attr',
    type: text,
    config: ['ampm-select-label', 'AM/PM'], // consts.CONTENT],
    prop: 'ampm-select-label',
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-message', ''], // consts.CONTENT],
    prop: 'invalid-message',
    value: val => (val.length ? val : undefined),
  },
  invalidMessageSlot: {
    group: 'slot',
    slot: 'invalid-message',
    value: 'Invalid time.',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@update:time="onUpdateTime"
  @update:ampm="onUpdateAmpm"
  @update:timezone="onUpdateTimezone"`,
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['vModel', 'events', 'timeSync', 'ampmSync', 'timezoneSync', 'invalidMessageSlot'],
  },
  {
    name: 'invalid slot',
    excludes: ['vModel', 'events', 'timeSync', 'ampmSync', 'timezoneSync'],
  },
  { name: 'minimal', includes: [] },
  { name: 'events', includes: ['events'] },
  {
    name: 'dotsync',
    includes: ['timeSync', 'ampmSync', 'timezoneSync', 'timezones'],
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
  <cv-time-picker${settings.group.attr} :form-item="true">${settings.group.slot}
  </cv-time-picker>
    `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      ref="templateView"
      sv-margin
      :sv-alt-back="this.$options.propsData.theme !== 'light'"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <TimerButton @timer-start="doStart" @timer-end="doEnd" label="Call focus() method" active-label-prefix="Call blur() method in" />
        <div v-if="${templateString.indexOf('.sync') > 0}">
          <label>time:
            <input type="text" v-model="timeSync" />
          </label>
          <label>Ampm:
            <select v-model="ampmSync">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </label>
          <label>Timezone:
            <select v-model="timezoneSync">
              <option value="timezone1">Timezone 1</option>
              <option value="timezone2">Timezone 2</option>
            </select>
          </label>
        </div>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvTimePicker, SvTemplateView, TimerButton },
        template: templateViewString,
        props: settings.props,
        data() {
          return { ...settings.data };
        },
        methods: {
          onUpdateTime: action('cv-time-picker - update:time event'),
          onUpdateAmpm: action('cv-time-picker - update:ampm event'),
          onUpdateTimezone: action('cv-time-picker - update:timezone event'),
          doStart() {
            this.$nextTick(() => {
              this.$refs.templateView.$slots.component[0].componentInstance.focus();
            });
          },
          doEnd() {
            this.$refs.templateView.$slots.component[0].componentInstance.blur();
          },
        },
        mounted() {
          // console.dir(this);
        },
      };
    },
    {
      notes: { markdown: CvTimePickerNotesMD },
    }
  );
}
