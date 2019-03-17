import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvToastNotificationNotesMD from './cv-toast-notification-notes.md';
import CvToastNotification from './cv-toast-notification';

const storiesDefault = storiesOf('Default/CvToastNotification', module);
const storiesExperimental = storiesOf(
  'Experimental/CvToastNotification',
  module
);
import { override, reset } from '../../_internal/_feature-flags';

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
    value: `@close="doClose"`,
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

for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-toast-notification v-if="visible" ${
          settings.group.attr
        }></cv-toast-notification>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
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
              experimental,
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
}
