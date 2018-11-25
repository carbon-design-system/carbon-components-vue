import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvLoadingNotesMD from './cv-loading-notes.md';
import CvLoading from './cv-loading';

const stories = storiesOf('CvLoading', module);
stories.addDecorator(withKnobs);

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
  otherAttributes: {
    group: 'attr',
    type: text,
    config: [' other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
  withEvents: {
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
    withNotes(CvLoadingNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-loading${settings.group.attr}></cv-loading>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component" ref="component">
        ${templateString}
      </template>
      <template slot="other">
      <button @click="toggle" style="position: relative; margin-left: 500px;">Toggle</button>
        <button @click="end" style="position: relative; margin-left: 10px;">End</button>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvLoading, SvTemplateView },
        template: templateViewString,
        methods: {
          actionEnd: action('CvLoading - loading-end'),
          end() {
            this.$children[0].$children[0].end();
          },
          toggle() {
            console.log(`state: ${this.$children[0].$children[0].isActive()}`);
            this.$children[0].$children[0].toggle();
          },
        },
      };
    })
  );
}
