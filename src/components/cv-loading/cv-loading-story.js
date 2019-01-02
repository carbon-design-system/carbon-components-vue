import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvLoadingNotesMD from './cv-loading-notes.md';
import CvLoading from './cv-loading';

const stories = storiesOf('CvLoading', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const kinds = null;
const preKnobs = {
  overlay: {
    group: 'attr',
    type: boolean,
    config: ['overlay', true, consts.CONFIG],
    value: val => (val ? ' overlay' : ''),
  },
  small: {
    group: 'attr',
    type: boolean,
    config: ['small', false, consts.CONFIG],
    value: val => (val ? ' small' : ''),
  },
  events: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @loading-end="actionEnd"`
        : '',
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
<cv-loading${settings.group.attr} :active="active"></cv-loading>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component" ref="component">
        ${templateString}
      </template>
      <template slot="other">
      <button @click="toggle" style="position: relative; margin-left: 500px;">Toggle</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvLoading, SvTemplateView },
        template: templateViewString,
        data() {
          return {
            active: true,
          };
        },
        methods: {
          actionEnd: action('CvLoading - loading-end'),
          toggle() {
            this.active = !this.active;
          },
        },
      };
    },
    {
      notes: { markdown: CvLoadingNotesMD },
    }
  );
}
