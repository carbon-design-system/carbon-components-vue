import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDatePickerNotesMD from './cv-date-picker-notes.md';
import CvDatePicker from './cv-date-picker';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvDatePicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

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
  invalid: {
    group: 'attr',
    type: boolean,
    config: ['is invalid', false], // consts.CONFIG],
    prop: { name: 'invalid', type: Boolean },
  },
  invalidDateMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-date-message', ''], // consts.CONTENT],
    prop: { name: 'invalid-date-message', type: String },
  },
  eventsSimple: {
    group: 'attr',
    value: `@onSimpleChange="actionSimpleChange"`,
  },
  events: {
    group: 'attr',
    value: `@onChange="actionChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['calOptions', 'events', 'dateEndLabel'] },
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

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      // console.dir(settings);
      // console.dir(settings.calOptions);

      const templateString = `
  <cv-date-picker${settings.group.attr}>
  </cv-date-picker>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        :sv-alt-back="this.$options.propsData.theme !== 'light'"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvDatePicker, CvIcon, SvTemplateView },
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
