import { storiesOf } from '@storybook/vue';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvInlineNotificationNotesMD from './cv-inline-notification-notes.md';
import CvInlineNotification from './cv-inline-notification';

const stories = storiesOf('CvInlineNotification', module);
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
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvInlineNotificationNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-inline-notification${settings.otherAttributes}
  kind="${settings.kind}"
  title="${settings.title}"
  sub-title="${settings.subtitle}"
  @notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"
  ></cv-inline-notification>
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
      components: { CvInlineNotification, SvTemplateView },
      template: templateViewString,
      methods: {
        actionBeforeDelete: action(
          'CV InlineNotification - notification-before-delete'
        ),
        actionAfterDelete: action(
          'CV InlineNotification - notification-after-delete'
        ),
      },
    };
  })
);
