import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvToastNotificationNotesMD from './cv-toast-notification-notes.md';
import CvToastNotification from './cv-toast-notification';

const stories = storiesOf('CvToastNotification', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  kind: selectV2(
    'kind',
    {
      Error: 'error',
      Info: 'info',
      Success: 'success',
      Warning: 'warning',
    },
    'error',
    consts.CONFIG
  ),
  title: text('title', 'notification title', consts.CONTENT),
  subtitle: text('subtitle', 'a subtitle', consts.CONTENT),
  caption: text('caption', 'Time stamp [00:00:00]', consts.CONTENT),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvToastNotificationNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-toast-notification${settings.otherAttributes}
  kind="${settings.kind}"
  title="${settings.title}"
  sub-title="${settings.subtitle}"
  caption="${settings.caption}"
  @notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"
  ></cv-toast-notification>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
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
  })
);
