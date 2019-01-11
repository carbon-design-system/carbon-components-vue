import { storiesOf } from '@storybook/vue';
import { withKnobs, array, number } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvProgressNotesMD from './cv-progress-notes.md';
import CvProgress from './cv-progress';

const stories = storiesOf('CvProgress', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  initialStep: {
    group: 'attr',
    type: number,
    config: ['Initial step index', 2], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      name: 'initial-step',
      type: Number,
    },
  },
  steps: {
    group: 'attr',
    type: array,
    config: [
      'Steps',
      ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
      ',',
      // 'consts.CONFIG', // , - does not seem to work in storybook 4
    ],
    prop: {
      name: 'steps',
      type: Array,
    },
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-progress${settings.group.attr}></cv-progress>
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
        components: { CvProgress, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvProgressNotesMD },
    }
  );
}
