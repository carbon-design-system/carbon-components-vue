import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvInlineLoadingNotesMD from '@carbon/vue/src/components/cv-inline-loading/cv-inline-loading-notes.md';
import { CvInlineLoading } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvInlineLoading', module);
const storiesExperimental = storiesOf('Experimental/CvInlineLoading', module);

const preKnobs = {
  active: {
    group: 'attr',
    type: boolean,
    config: ['active', true], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'active' },
  },
  loadingText: {
    group: 'attr',
    type: text,
    config: ['loading text', 'Loading data...'],
    prop: { name: 'loading-text', type: String },
  },
  loadedText: {
    group: 'attr',
    type: text,
    config: ['loaded text', 'Data loaded.'],
    prop: { name: 'loaded-text', type: String },
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', includes: ['active'] }];

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
