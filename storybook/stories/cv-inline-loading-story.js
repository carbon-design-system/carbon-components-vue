import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvInlineLoadingNotesMD from '../../packages/core/src/components/cv-inline-loading/cv-inline-loading-notes.md';
import { CvInlineLoading, STATES } from '../../packages/core/src/components/cv-inline-loading';

const storiesDefault = storiesOf('Components/CvInlineLoading', module);
// const storiesExperimental = storiesOf('Experimental/CvInlineLoading', module);

const preKnobs = {
  endingText: {
    group: 'attr',
    type: text,
    config: ['ending text', 'Ending...'],
    prop: 'ending-text',
  },
  errorText: {
    group: 'attr',
    type: text,
    config: ['error text', 'Error.'],
    prop: 'error-text',
  },
  loadingText: {
    group: 'attr',
    type: text,
    config: ['loading text', 'Loading...'],
    prop: 'loading-text',
  },
  loadedText: {
    group: 'attr',
    type: text,
    config: ['loaded text', 'Complete.'],
    prop: 'loaded-text',
  },
  state: {
    group: 'attr',
    type: select,
    config: ['Loading state', STATES, STATES.LOADING],
    prop: 'state',
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['state'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-inline-loading${settings.group.attr}></cv-inline-loading>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component" ref="component">
        ${templateString}
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvInlineLoading, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvInlineLoadingNotesMD },
    }
  );
}
