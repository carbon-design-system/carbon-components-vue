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
        Short: 'short',
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
  autoWidth: {
    group: 'attr',
    type: boolean,
    config: ['auto table width', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'auto-width',
    },
  },
  borderless: {
    group: 'attr',
    type: boolean,
    config: ['borderless', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'borderless',
    },
  },
  sortable: {
    group: 'attr',
    type: boolean,
    config: ['sortable', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: {
      type: Boolean,
      name: 'sortable',
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
  headings: {
    group: 'attr',
    type: object,
    config: [
      'headings',
      {
        headings: [
          'Name',
          'Protocol',
          'Port',
          'Rule',
          'Attached Groups',
          'Status',
        ],
      },
    ],
    prop: {
      type: Array,
      name: 'headings',
      value: val => val.headings,
    },
  },
  data: {
    group: 'attr',
    type: object,
    config: [
      'data',
      {
        data: [
          [
            'Load Balancer 11',
            'HTTP',
            '80',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 4',
            'HTTP',
            '81',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 2',
            'HTTP',
            '82',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 3',
            'HTTP',
            '8080',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
          [
            'Load Balancer 5',
            'HTTP',
            '8001',
            'Round Robin',
            'Maureen’s VM Groups',
            'Active',
          ],
        ],
      },
    ],
    prop: {
      type: Array,
      name: 'data',
      value: val => val.data,
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
<cv-data-table${settings.group.attr} :table-data="internalData" @sort="onSort">
</cv-data-table>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">
        NOTE: Sorting and filtering are the responsibility of the component user. This component raises events to facilitate this.
      </template>
    </sv-template-view>
  `;

      return {
        components: {
          CvDataTable,
          SvTemplateView,
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            internalData: this.data,
          };
        },
        watch: {
          data() {
            this.internalData = this.data;
          },
        },
        methods: {
          onSort(sortBy) {
            this.internalData.sort((a, b) => {
              const itemA = a[sortBy.index];
              const itemB = b[sortBy.index];

              if (sortBy.order === 'descending') {
                if (sortBy.index === 2) {
                  // sort as number
                  return parseFloat(itemA) - parseFloat(itemB);
                } else {
                  return itemB.localeCompare(itemA);
                }
              }
              if (sortBy.order === 'ascending') {
                if (sortBy.index === 2) {
                  // sort as number
                  return parseFloat(itemB) - parseFloat(itemA);
                } else {
                  return itemA.localeCompare(itemB);
                }
              }
              return 0;
            });
          },
        },
      };
    },
    {
      notes: { markdown: CvDataTableNotesMD },
    }
  );
}
