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

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'title',
    },
  },
  subTitle: {
    group: 'attr',
    type: text,
    config: ['subtitle', 'a subtitle'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'sub-title',
    },
  },
  caption: {
    group: 'attr',
    type: text,
    config: ['caption', 'Time stamp [00:00:00]'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: {
      type: String,
      name: 'caption',
    },
  },
  events: {
    group: 'attr',
    value: `@notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"`,
  },
};

const variants = [
  { name: 'default' },
  { name: 'error', extra: { kind: { group: 'attr', value: 'kind="error"' } } },
  { name: 'info', extra: { kind: { group: 'attr', value: 'kind="info"' } } },
  {
    name: 'success',
    extra: { kind: { group: 'attr', value: 'kind="success"' } },
  },
  {
    name: 'warning',
    extra: { kind: { group: 'attr', value: 'kind="warning"' } },
  },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-toast-notification${settings.group.attr}></cv-toast-notification>
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
        props: settings.props,
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
