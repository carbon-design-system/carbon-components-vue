import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvLoadingNotesMD from './cv-loading-notes.md';
import CvLoading from './cv-loading';

const stories = storiesOf('CvLoading', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  overlay: boolean('overlay', true, consts.CONFIG) ? ' overlay' : '',
  small: boolean('small', false, consts.CONFIG) ? ' small' : '',
  otherAttributes: text(' other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvLoadingNotesMD)(() => {
    const settings = knobs();

    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------
    const templateString = `
<cv-loading${settings.overlay}${settings.small}${settings.otherAttributes}
  @loading-end="actionEnd"
  ></cv-loading>
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
