import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
// import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvInlineNotificationNotesMD from './cv-inline-notification-notes.md';
import CvInlineNotification from './cv-inline-notification';

const stories = storiesOf('CvInlineNotification', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'title', type: String },
  },
  subtitle: {
    group: 'attr',
    type: text,
    config: ['subtitle', 'a subtitle'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'sub-title', type: String },
  },
  events: {
    group: 'attr',
    value: `@notification-before-delete="actionBeforeDelete"
  @notification-after-delete="actionAfterDelete"`,
  },
};

const variants = [
  { name: 'default' },
  { name: 'error', extra: { kind: { group: 'attr', value: 'error' } } },
  { name: 'info', extra: { kind: { group: 'attr', value: 'info' } } },
  {
    name: 'success',
    extra: { kind: { group: 'attr', value: 'success' } },
  },
  {
    name: 'warning',
    extra: { kind: { group: 'attr', value: 'warning' } },
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
<cv-inline-notification${settings.group.attr}>
</cv-inline-notification>
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
        components: { CvInlineNotification, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        methods: {
          actionBeforeDelete: action(
            'CV InlineNotification - notification-before-delete'
          ),
          actionAfterDelete: action(
            'CV InlineNotification - notification-after-delete'
          ),
        },
      };
    },
    {
      notes: { markdown: CvInlineNotificationNotesMD },
    }
  );
}
