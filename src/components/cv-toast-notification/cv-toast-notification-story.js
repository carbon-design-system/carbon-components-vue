import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvToastNotificationNotesMD from './cv-toast-notification-notes.md';
import CvToastNotification from './cv-toast-notification';

const stories = storiesOf('CvToastNotification', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = {
  options: {
    Default: '',
    Error: 'error',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
  },
  default: '',
};

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title', consts.CONTENT],
    value: val => (val.length ? `\n  title="${val}"` : ''),
  },
  subtitle: {
    group: 'attr',
    type: text,
    config: ['subtitle', 'a subtitle', consts.CONTENT],
    value: val => (val.length ? `\n  subtitle="${val}"` : ''),
  },
  caption: {
    group: 'attr',
    type: text,
    config: ['caption', 'Time stamp [00:00:00]', consts.CONTENT],
    value: val => (val.length ? `\n  caption="${val}"` : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"`
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

      const templateString = `
<cv-toast-notification${settings.kind}${
        settings.group.attr
      }></cv-toast-notification>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvToastNotification, SvTemplateView },
        template: templateViewString,
        methods: {
          actionBeforeDelete: action(
            'CV ToastNotification - notification-before-delete'
          ),
          actionAfterDelete: action(
            'CV ToastNotification - notification-after-delete'
          ),
        },
      };
    },
    {
      notes: { markdown: CvToastNotificationNotesMD },
    }
  );
}
