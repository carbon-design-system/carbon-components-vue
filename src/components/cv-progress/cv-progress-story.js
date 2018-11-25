import { storiesOf } from '@storybook/vue';
import { withKnobs, selectV2, array, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvProgressNotesMD from './cv-progress-notes.md';
import CvProgress from './cv-progress';

const stories = storiesOf('CvProgress', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  steps: {
    group: 'attr',
    type: array,
    config: [
      'Steps',
      ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
      ',',
      consts.CONFIG,
    ],
    value: val => '\n  :steps="steps"',
    data: (obj, key, val) => (obj[key] = val),
  },
  initialStep: {
    group: 'attr',
    type: text,
    config: ['Initial step index', '0', consts.CONFIG],
    value: val => (val.length ? `\n :initial-step="${parseInt(val, 10)}"` : ''),
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvProgressNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-progress${settings.group.attr}></cv-progress>
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
        components: { CvProgress, SvTemplateView },
        data() {
          return settings.data;
        },
        template: templateViewString,
      };
    })
  );
}
