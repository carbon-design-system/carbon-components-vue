import { storiesOf } from '@storybook/vue';
import {
  withKnobs,
  object,
  boolean,
  select,
  text,
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDataTableNotesMD from './cv-data-table-notes.md';
import CvDataTable from './cv-data-table';
import CvSearch from '../cv-search/cv-search';

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
  title: {
    group: 'attr',
    type: text,
    config: ['Title', ''],
    prop: {
      type: String,
      name: 'title',
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
  columns: {
    group: 'attr',
    type: object,
    config: [
      'columns',
      {
        columns: [
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
      name: 'columns',
      value: val => val.columns,
    },
  },
  columns2: {
    group: 'attr',
    type: object,
    config: [
      'columns',
      {
        columns: [
          { label: 'Name', headingStyle: { textTransform: 'uppercase' } },
          { label: 'Protocol', headingStyle: { textTransform: 'uppercase' } },
          {
            label: 'Port',
            headingStyle: {
              textTransform: 'uppercase',
              textAlign: 'right',
              paddingRight: '2.5rem',
            },
            dataStyle: { textAlign: 'right', paddingRight: '2.5rem' },
          },
          { label: 'Rule', headingStyle: { textTransform: 'uppercase' } },
          {
            label: 'Attached Groups',
            headingStyle: { textTransform: 'uppercase' },
          },
          { label: 'Status', headingStyle: { textTransform: 'uppercase' } },
        ],
      },
    ],
    prop: {
      type: Array,
      name: 'columns',
      value: val => val.columns,
    },
  },
  data: {
    group: '',
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
  header: {
    group: 'slots',
    slot: {
      name: 'header',
      value: `
<div class="bx--toolbar-search-container">
  <cv-search theme="light" small :form-item="false" v-model="filterValue" />
</div>`,
    },
  },
  footer: {
    group: 'slots',
    slot: {
      name: 'footer',
      value: `
<cv-pagination :number-of-items="filteredData ? filteredData.length : 0"></cv-pagination>`,
    },
  },
  sort: {
    group: 'attr',
    value: '@sort="onSort"',
  },
};

const variants = [
  { name: 'default', excludes: ['columns2'] },
  { name: 'minimal', includes: ['columns', 'data'] },
  { name: 'styled columns', includes: ['columns2', 'data'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);
for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
<cv-data-table${settings.group.attr} :data="filteredData">${
        settings.group.slots
      }</cv-data-table>
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
          CvSearch,
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            internalData: this.data,
            filterValue: '',
            sortBy: null,
          };
        },
        watch: {
          data() {
            this.internalData = this.data;
          },
        },
        computed: {
          filteredData() {
            if (this.filterValue) {
              return this.internalData.filter(item => {
                return item.join('|').indexOf(this.filterValue) >= 0;
              });
            } else {
              return this.internalData;
            }
          },
        },
        methods: {
          onSort(sortBy) {
            if (sortBy) {
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
            }
          },
        },
      };
    },
    {
      notes: { markdown: CvDataTableNotesMD },
    }
  );
}
