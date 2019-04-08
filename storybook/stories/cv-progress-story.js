import { storiesOf } from '@storybook/vue';
import { array, number } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvProgressNotesMD from '@carbon/vue/src/components/cv-progress/cv-progress-notes.md';
import CvProgress from '@carbon/vue/src/components/cv-progress/cv-progress';
import CvProgressStep from '@carbon/vue/src/components/cv-progress/cv-progress-step';

const storiesDefault = storiesOf('Current/CvProgress', module);
const storiesExperimental = storiesOf('Experimental/CvProgress', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

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
  slotted: {
    group: 'slots',
    slot: {
      name: '',
      value: `
        <cv-progress-step label="Step 1" complete additional-info="Optional info" />
        <cv-progress-step label="Step 2 is a bit longer" complete />
        <cv-progress-step label="Step 3" />
        <cv-progress-step label="Step 4" invalid />
        <cv-progress-step label="Step 4" disabled />
      `,
    },
  },
};

const variants = [
  { name: 'default', excludes: ['slotted'] },
  { name: 'slotted', excludes: ['steps', 'initialStep'], skip: { default: true } },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(false)) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    if (
      story.skip &&
      ((story.skip.default && !version.experimental) || (story.skip.experimental && version.experimental))
    ) {
      continue;
    }
    stories.add(
      story.name,
      () => {
        setVersion(version);
        const settings = story.knobs();

        // ----------------------------------------------------------------

        const templateString = `
<cv-progress${settings.group.attr}>${settings.group.slots}</cv-progress>
  `;

        // ----------------------------------------------------------------
        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvProgress, CvProgressStep, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvProgressNotesMD },
      }
    );
  }
}
