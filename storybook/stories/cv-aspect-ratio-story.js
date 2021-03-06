import { storiesOf } from '@storybook/vue';
import { select } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvAspectRatioNotesMD from '../../packages/core/src/components/cv-aspect-ratio/cv-aspect-ratio-notes.md';
import { CvAspectRatio } from '../../packages/core/src/index';

const storiesDefault = storiesOf('Components/CvAspectRatio', module);
// const storiesExperimental = storiesOf('Experimental/CvAspectRatio', module);

const preKnobs = {
  ratio: {
    group: 'attr',
    type: select,
    config: [
      'ratio',
      {
        '16x9': '16x9',
        '9x16': '9x16',
        '2x1': '2x1',
        '1x2': '1x2',
        '4x3': '4x3',
        '3x4': '3x4',
        '1x1': '1x1',
      },
      '1x1',
    ],
    prop: 'ratio',
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-aspect-ratio${settings.group.attr} style="background: #f7f1ff; padding: 1rem;">
  <div>
      Content ({{ratio}})
      <br/>
      Width based only
  </div>
</cv-aspect-ratio>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">
        ${templateString}
      </template>
    </sv-template-view>
  `;

      return {
        components: { CvAspectRatio, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvAspectRatioNotesMD },
    }
  );
}
