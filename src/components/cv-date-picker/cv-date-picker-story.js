import { storiesOf } from '@storybook/vue';
import {
  withKnobs,
  text,
  boolean,
  selectV2,
  object,
} from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvDatePickerNotesMD from './cv-date-picker-notes.md';
import CvDatePicker from './cv-date-picker';
import CvIcon from '../cv-icon/cv-icon';

const stories = storiesOf('CvDatePicker', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  kind: selectV2(
    'kind',
    {
      Short: 'short',
      Simple: 'simple',
      Single: 'single',
      Range: 'range',
    },
    'simple',
    consts.CONFIG
  ),
  dateLabel: text('date-label', '', consts.CONTENT),
  dateEndLabel: text('date-end-label', '', consts.CONTENT),
  pattern: text('pattern', '\\d{1,2}/\\d{1,2}/\\d{4}', consts.CONFIG),
  placeholder: text('placeholder', 'mm/dd/yyyy', consts.CONFIG),
  flatpickrOptions: object(
    'flatpickrOptions',
    { dateFormat: 'm/d/Y' },
    consts.CONFIG
  ),
  invalid: boolean('is invalid', false, consts.CONFIG) ? '\n  invalid' : '',
  invalidDateMessage: text('invalid message', '', consts.CONTENT),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvDatePickerNotesMD)(() => {
    const settings = knobs();

    settings.kind = settings.kind.length ? `\n  kind="${settings.kind}"` : '';
    settings.dateLabel = settings.dateLabel.length
      ? `\n  date-label="${settings.dateLabel}"`
      : '';
    settings.dateEndLabel = settings.dateEndLabel.length
      ? `\n  date-end-label="${settings.dateEndLabel}"`
      : '';
    settings.pattern = settings.pattern.length
      ? `\n  pattern="${settings.pattern}"`
      : '';
    settings.placeholder = settings.placeholder.length
      ? `\n  placeholder="${settings.placeholder}"`
      : '';
    // settings.flatpickrOptions = settings.flatpickrOptions.length
    //   ? `\n  :flatpickr-options="${settings.flatpickrOptions}"`
    //   : '';
    settings.invalidDateMessage = settings.invalidDateMessage.length
      ? `\n  invalid-date-message="${settings.invalidDateMessage}"`
      : '';

    settings.otherAttributes = settings.otherAttributes
      ? `${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------
    // console.dir(settings);
    // console.dir(settings.flatpickrOptions);

    const templateString = `
<cv-date-picker${settings.kind}${settings.dateLabel}${settings.dateEndLabel}${
      settings.pattern
    }${settings.placeholder}${settings.invalid}${settings.invalidDateMessage}${
      settings.otherAttributes
    } :flatpickr-options="flatpickrOptions"
  @onChange="actionChange"
  >
</cv-date-picker>
  `;
    // console.log(templateString);

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvDatePicker, CvIcon, SvTemplateView },
      data() {
        return {
          flatpickrOptions: settings.flatpickrOptions,
        };
      },
      methods: {
        actionChange: action('Cv Date Picker - change'),
      },
      template: templateViewString,
    };
  })
);
