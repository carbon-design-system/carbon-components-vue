import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvToastNotificationNotesMD from '../../packages/core/src/components/cv-toast-notification/cv-toast-notification-notes.md';
import { CvToastNotification } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvToastNotification', module);
// const storiesExperimental = storiesOf('Experimental/CvToastNotification', module);

const preKnobs = {
  title: {
    group: 'attr',
    type: text,
    config: ['title', 'notification title'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'title',
  },
  subTitle: {
    group: 'attr',
    type: text,
    config: ['subtitle', 'a subtitle'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'sub-title',
  },
  caption: {
    group: 'attr',
    type: text,
    config: ['caption', 'Time stamp [00:00:00]'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'caption',
  },
  events: {
    group: 'attr',
    value: `@close="doClose"`,
  },
  closeAriaLabel: {
    group: 'attr',
    type: text,
    config: ['close-arial-label', 'Custom close aria label'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: 'close-aria-label',
  },
  lowContrast: {
    group: 'attr',
    type: boolean,
    config: ['Low contrast', false],
    prop: 'low-contrast',
  },
};

const variants = [
  { name: 'default', excludes: ['closeAriaLabel'] },
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
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-toast-notification v-if="visible" ${settings.group.attr}></cv-toast-notification>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other"><button @click="visible = true">Show if hidden</button></template>
    </sv-template-view>
  `;

      return {
        components: { CvToastNotification, SvTemplateView },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            visible: true,
          };
        },
        methods: {
          actionClose: action('CV ToastNotification - close'),
          doClose(ev) {
            this.visible = false;
            this.actionClose(ev);
          },
        },
      };
    },
    {
      notes: { markdown: CvToastNotificationNotesMD },
    }
  );
}
