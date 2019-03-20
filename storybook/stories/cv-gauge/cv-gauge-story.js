import { storiesOf } from '@storybook/vue';
import { text, number } from '@storybook/addon-knobs/vue';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvGaugeNotesMD from './cv-gauge-notes.md';
import CvGauge from './cv-gauge';

const stories = storiesOf('Data-Viz/CvGauge', module);

const preKnobs = {
  amount: {
    group: 'attr',
    type: number,
    config: ['amount', 56], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'amount', type: Number },
  },
  total: {
    group: 'attr',
    type: number,
    config: ['total', 100], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'total', type: Number },
  },
  suffix: {
    group: 'attr',
    type: text,
    config: ['suffix', 'GB'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'suffix', type: String },
  },
  header: {
    group: 'attr',
    type: text,
    config: ['header', 'Example Header'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'header', type: String },
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
  <cv-gauge ${settings.group.attr}>
  </cv-gauge>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
  <sv-template-view
    sv-margin
    :sv-alt-back="this.$options.propsData.theme !== 'light'"
    sv-source='${templateString.trim()}'
    under-construction>
    <template slot="component">${templateString}</template>
  </sv-template-view>
  `;

      return {
        components: {
          CvGauge,
          SvTemplateView,
        },
        props: settings.props,
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvGaugeNotesMD },
    }
  );
}
