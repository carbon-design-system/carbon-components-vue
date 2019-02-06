import { storiesOf } from '@storybook/vue';
import { withKnobs, object, boolean, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDataTableNotesMD from './cv-data-table-notes.md';
import CvDataTable from './cv-data-table';

const stories = storiesOf('CvDataTable', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  rowSize: {
    group: 'attr',
    type: select,
    config: [
      'rowSize',
      {
        Compact: 'compact',
        Small: 'small',
        Default: '',
        Tall: 'tall',
      },
      'compact',
      // consts.CONFIG, // fails when used with number in storybook 4.1.4
    ],
    prop: {
      name: 'row-size',
      type: String,
    },
  },
  zebra: {
    group: 'attr',
    type: boolean,
    config: ['zebra', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'zebra',
    },
  },
  tableData: {
    group: 'attr',
    type: object,
    config: [
      'Initial cheks',
      {
        tableData: [
          ['Name', 'Protocol', '	Port', 'Rule', '	Attached Groups', 'Status'],
          [
            'Load Balancer 1',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 5',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 5',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 5',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 5',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
        ],
      },
    ],
    prop: {
      type: Array,
      name: 'tableData',
      value: val => val.tableData,
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
<cv-data-table${settings.group.attr}>
</cv-data-table>
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
        components: {
          CvDataTable,
          SvTemplateView,
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvDataTableNotesMD },
    }
  );
}
