import { storiesOf } from '@storybook/vue';
import { array, number, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvProgressNotesMD from '../../packages/core/src/components/cv-progress/cv-progress-notes.md';
import { CvProgress, CvProgressStep } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvProgress', module);
// const storiesExperimental = storiesOf('Experimental/CvProgress', module);

const preKnobs = {
  initialStep: {
    group: 'attr',
    type: number,
    config: ['Initial step index', 2], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'initial-step',
  },
  steps: {
    group: 'attr',
    type: array,
    config: [
      'Steps',
      ['Step 1', 'Step 2 overflows and shows a tip', 'Step 3', 'Step 4', 'Step 5'],
      ',',
      // 'consts.CONFIG', // , - does not seem to work in storybook 4
    ],
    prop: 'steps',
  },
  vertical: {
    group: 'attr',
    type: boolean,
    config: ['vertical', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'vertical',
  },
  slotted: {
    group: 'slots',
    value: `<cv-progress-step label="Step 1" additional-info="Optional info" :complete="complete[0]"/>
  <cv-progress-step label="Step 2 is a bit longer" :complete="complete[1]"/>
  <cv-progress-step label="Step 3" :complete="complete[2]" tip-text="Step 3 has hard coded tip"/>
  <cv-progress-step label="Step 4" :complete="complete[3]" invalid />
  <cv-progress-step label="Step 4" :complete="complete[4]" disabled />
`,
  },
};

const variants = [
  { name: 'default', excludes: ['slotted'] },
  { name: 'slotted', excludes: ['steps', 'initialStep'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      let templateString = `<cv-progress${settings.group.attr}>${settings.group.slots}</cv-progress>`;
      // console.log(templateString);
      // ----------------------------------------------------------------
      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other" v-if="${story.name === 'slotted'}">
        <label v-for="(state, index) in complete">{{(index + 1) + ' complete'}}
          <input type="checkbox" v-model="complete[index]" />
          <br>
        </label>
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvProgress, CvProgressStep, SvTemplateView },
        data: () => ({ complete: [true, false, false, false, false] }),
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvProgressNotesMD },
    }
  );
}
