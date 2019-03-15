import { storiesOf } from '@storybook/vue';
import { text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDatePickerNotesMD from './cv-date-picker-notes.md';
import CvDatePicker from './cv-date-picker';

const storiesDefault = storiesOf('Default/CvDatePicker', module);
const storiesExperimental = storiesOf('Experimental/CvDatePicker', module);
import { override, reset } from '../../_internal/_feature-flags';

const preKnobs = {
  theme: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'theme',
      value: val => (val ? 'light' : ''),
    },
  },
  dateLabel: {
    group: 'attr',
    type: text,
    config: ['date-label', 'Date label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'date-label',
    },
  },
  dateEndLabel: {
    group: 'attr',
    type: text,
    config: ['date-end-label', 'Date end label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'date-end-label',
    },
  },
  pattern: {
    group: 'attr',
    type: text,
    config: ['pattern', '\\d{12}/\\d{12}/\\d{4}'], // consts.CONFIG],
    prop: { name: 'pattern', type: String },
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'mm/dd/yyyy'], // consts.CONFIG],
    prop: { name: 'placeholder', type: String },
  },
  calOptions: {
    group: 'attr',
    type: object,
    config: ['calOptions', { dateFormat: 'm/d/Y' }], // consts.CONFIG],
    prop: { name: 'cal-options', type: Object },
  },
  invalidMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-message', ''], // consts.CONTENT],
    prop: { name: 'invalid-message', type: String },
  },
  invalidMessageSlot: {
    group: 'slot',
    slot: {
      name: 'invalid-message',
      value: 'Invalid message slot overrides the invalid-message prop',
    },
  },
  eventsSimple: {
    group: 'attr',
    value: `@simpleChange="actionSimpleChange"`,
  },
  events: {
    group: 'attr',
    value: `@change="actionChange"`,
  },
};

const variants = [
  {
    name: 'default',
    excludes: ['calOptions', 'events', 'dateEndLabel', 'invalidMessageSlot'],
  },
  {
    name: 'invalid message slot',
    excludes: ['calOptions', 'events', 'dateEndLabel'],
  },
  { name: 'minimal', includes: ['eventsSimple'] },
  {
    name: 'short',
    includes: ['eventsSimple'],
    extra: {
      kind: { group: 'attr', value: 'kind="short"' },
      placeholder: { group: 'attr', value: 'placeholder="mm/yy"' },
    },
  },
  {
    name: 'simple',
    includes: ['eventsSimple'],
    extra: { kind: { group: 'attr', value: 'kind="simple"' } },
  },
  {
    name: 'single',
    includes: ['events', 'calOptions'],
    extra: { kind: { group: 'attr', value: 'kind="single"' } },
  },
  {
    name: 'range',
    includes: ['events', 'calOptions', 'dateEndLabel'],
    extra: { kind: { group: 'attr', value: 'kind="range"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        // ----------------------------------------------------------------
        // console.dir(settings);
        // console.dir(settings.calOptions);

        const templateString = `
  <cv-date-picker${settings.group.attr}>${settings.group.slot}
  </cv-date-picker>
    `;
        // console.log(templateString);

        // ----------------------------------------------------------------

        const templateViewString = `
      <sv-template-view
        :sv-experimental="experimental"
        sv-margin
        :sv-alt-back="this.$options.propsData.theme !== 'light'"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

        return {
          components: { CvDatePicker, SvTemplateView },
          data: () => ({ experimental }),
          props: settings.props,
          template: templateViewString,
          methods: {
            actionChange: action('Cv Date Picker - change'),
            actionSimpleChange: action('Cv Date Picker - simple change'),
          },
        };
      },
      {
        notes: { markdown: CvDatePickerNotesMD },
      }
    );
  }
}
