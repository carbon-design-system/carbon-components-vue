import { storiesOf } from '@storybook/vue';
import {
  withKnobs,
  text,
  boolean,
  object,
  selectV2,
} from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvTimePickerNotesMD from './cv-time-picker-notes.md';
import CvTimePicker from './cv-time-picker';

const stories = storiesOf('CvTimePicker', module);
stories.addDecorator(withKnobs);

const kinds = null;

const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
    data: (obj, key, val) => (obj[key] = val),
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label', '', consts.CONTENT],
    value: val => (val ? `\n  label="${val}"` : ''),
  },
  time: {
    group: 'attr',
    type: text,
    config: ['time', '', consts.CONFIG],
    value: (val, dotSync) =>
      dotSync ? '\n  :time.sync="time"' : val.length ? `\n  time="${val}"` : '',
    data: (obj, key, val) => (obj[key] = val),
    canDotSync: true,
  },
  ampm: {
    group: 'attr',
    type: selectV2,
    config: [
      'ampm',
      {
        AM: 'AM',
        PM: 'PM',
      },
      'AM',
      consts.CONFIG,
    ],
    value: (val, dotSync) =>
      dotSync ? '\n  :ampm.sync="ampm"' : val.length ? `\n  ampm="${val}"` : '',
    data: (obj, key, val) => (obj[key] = val),
    canDotSync: true,
  },
  timezone: {
    group: 'attr',
    type: text,
    config: ['timezone', '', consts.CONFIG],
    value: (val, dotSync) =>
      dotSync
        ? '\n  :timezone.sync="timezone"'
        : val.length
          ? `\n  timezone="${val}"`
          : '',
    data: (obj, key, val) => (obj[key] = val),
    canDotSync: true,
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
      consts.CONFIG,
    ],
    value: val =>
      val && val.list && val.list.length ? `\n  :timezones="timezones"` : '',
    data: (obj, key, val) => (obj[key] = val.list),
  },
  pattern: {
    group: 'attr',
    type: text,
    config: ['pattern', '', consts.CONFIG],
    value: val => (val ? `\n  pattern="${val}"` : ''),
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', '', consts.CONTENT],
    value: val => (val ? `\n  placeholder="${val}"` : ''),
  },
  timezonesSelectLabel: {
    group: 'attr',
    type: text,
    config: ['timzones-select-label', '', consts.CONTENT],
    value: val => (val ? `\n  timzones-select-label="${val}"` : ''),
  },
  ampmSelectLabel: {
    group: 'attr',
    type: text,
    config: ['ampm-select-label', '', consts.CONTENT],
    value: val => (val ? `\n  ampm-select-label="${val}"` : ''),
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-message', '', consts.CONTENT],
    value: val => (val ? `\n  invalid-message="${val}"` : ''),
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false, consts.CONFIG],
    value: val => (val ? `\n  disabled` : ''),
  },
  dotSync: {
    group: '',
    type: boolean,
    config: ['.sync', false, consts.OTHER],
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @update:time="onUpdateTime"
  @update:ampm="onUpdateAmpm"
  @update:timezone="onUpdateTimezone"`
        : '',
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvTimePickerNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
  <cv-time-picker${settings.group.attr}>
  </cv-time-picker>
    `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      :sv-alt-back="!light"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        <span class="sync-example" v-if="${settings.raw.dotSync}">
          time: {{time}}, ampm: {{ampm}}, timezone: {{timezone}}
          </span>
      </template>
    </sv-template-view>
  `;

      return {
        data() {
          return settings.data;
        },
        components: { CvTimePicker, SvTemplateView },
        template: templateViewString,
        methods: {
          onUpdateTime: action('cv-time-picker - update:time event'),
          onUpdateAmpm: action('cv-time-picker - update:ampm event'),
          onUpdateTimezone: action('cv-time-picker - update:timezone event'),
        },
      };
    })
  );
}
