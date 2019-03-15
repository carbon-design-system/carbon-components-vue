import { storiesOf } from '@storybook/vue';
import { text, array, object } from '@storybook/addon-knobs/vue';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvPieChartNotesMD from './cv-pie-chart-notes.md';
import CvPieChart from './cv-pie-chart';

const stories = storiesOf('Data-Viz/CvPieChart', module);

const preKnobs = {
  dataArray: {
    group: 'attr',
    type: object,
    config: [
      'dataArray',
      [['Gryffindor', 23], ['Slytherin', 12], ['Ravenclaw', 19]],
    ],
    prop: { name: 'dataArray', type: Array },
  },
  colors: {
    group: 'attr',
    type: array,
    config: ['colors', ['#3b1a40', '#473793', '#3c6df0']],
    prop: { name: 'colors', type: Array },
  },
  header: {
    group: 'attr',
    type: text,
    config: ['header', 'Example Header'],
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
  <cv-pie-chart ${settings.group.attr}>
  </cv-pie-chart>
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
          CvPieChart,
          SvTemplateView,
        },
        props: settings.props,
        template: templateViewString,
      };
    },
    {
      notes: { markdown: CvPieChartNotesMD },
    }
  );
}
