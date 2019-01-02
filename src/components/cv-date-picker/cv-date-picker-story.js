import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvDatePickerNotesMD from './cv-date-picker-notes.md';
import CvDatePicker from './cv-date-picker';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvDatePicker', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = {
  options: {
    Default: '',
    Short: 'short',
    Simple: 'simple',
    Single: 'single',
    Range: 'range',
  },
  default: '',
};

const preKnobs = {
  light: {
    group: 'attr',
    type: boolean,
    config: ['light-theme', false, consts.CONFIG],
    value: val => (val ? '\n  theme="light"' : ''),
  },
  dateLabel: {
    group: 'attr',
    type: text,
    config: ['date-label', '', consts.CONTENT],
    value: val => (val.length ? `\n  date-label="${val}"` : ''),
  },
  dateEndLabel: {
    group: 'attr',
    type: text,
    config: ['date-end-label', '', consts.CONTENT],
    value: val => (val.length ? `\n  date-end-label="${val}"` : ''),
  },
  pattern: {
    group: 'attr',
    type: text,
    config: ['pattern', '\\d{12}/\\d{12}/\\d{4}', consts.CONFIG],
    value: val => (val.length ? `\n  pattern="${val}"` : ''),
  },
  placeholder: {
    group: 'attr',
    type: text,
    config: ['placeholder', 'mm/dd/yyyy', consts.CONFIG],
    value: val => (val.length ? `\n  placeholder="${val}"` : ''),
  },
  calOptions: {
    group: 'attr',
    type: object,
    config: ['calOptions', { dateFormat: 'm/d/Y' }, consts.CONFIG],
    value: () => '\n  :cal-options="calOptions"',
    data: (obj, key, val) => (obj[key] = val),
  },
  invalid: {
    group: 'attr',
    type: boolean,
    config: ['is invalid', false, consts.CONFIG],
    value: val => (val ? '\n  invalid' : ''),
  },
  invalidDateMessage: {
    group: 'attr',
    type: text,
    config: ['invalid-date-message', '', consts.CONTENT],
    value: val => (val.length ? `\n  invalid-date-message="${val}"` : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @onChange="actionChange"
  @onSimpleChange="actionSimpleChange"`
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
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      // console.dir(settings);
      // console.dir(settings.calOptions);

      const templateString = `
  <cv-date-picker${settings.kind}${settings.group.attr}>
  </cv-date-picker>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        :sv-alt-back="!light"
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvDatePicker, CvIcon, SvTemplateView },
        data() {
          return {
            calOptions: settings.raw.calOptions,
            light: settings.raw.light,
          };
        },
        methods: {
          actionChange: action('Cv Date Picker - change'),
          actionSimpleChange: action('Cv Date Picker - simple change'),
        },
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvDatePickerNotesMD },
    }
  );
}
