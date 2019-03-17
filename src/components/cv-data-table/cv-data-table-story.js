import { storiesOf } from '@storybook/vue';
import { object, boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvDataTableNotesMD from './cv-data-table-notes.md';
import CvDataTable from './cv-data-table';
import CvDataTableAction from './cv-data-table-action';
import CvSearch from '../cv-search/cv-search';

const storiesDefault = storiesOf('Default/CvDataTable', module);
const storiesExperimental = storiesOf('Experimental/CvDataTable', module);
import { override, reset } from '../../_internal/_feature-flags';

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
      '',
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
  search: {
    group: 'attr',
    value: '@search="onFilter"',
  },
  pagination: {
    group: 'attr',
    value:
      ':pagination="{ numberOfItems: internalData.length }" @pagination="actionOnPagination"',
  },
  rowSelects: {
    group: 'attr',
    value: 'v-model="rowSelects" @row-select-change="actionRowSelectChange"',
  },
  actions: {
    group: 'slots',
    slot: {
      name: 'actions',
      value: `
<cv-data-table-action @click="action1">
  <svg fill-rule="evenodd" height="16" name="download" role="img" viewBox="0 0 14 16" width="14" aria-label="Download" alt="Download">
    <title>Download</title>
    <path d="M7.506 11.03l4.137-4.376.727.687-5.363 5.672-5.367-5.67.726-.687 4.14 4.374V0h1v11.03z"></path>
    <path d="M13 15v-2h1v2a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-2h1v2h12z"></path>
  </svg>
</cv-data-table-action>
<cv-data-table-action @click="action2">
  <svg fill-rule="evenodd" height="16" name="edit" role="img" viewBox="0 0 16 16" width="16" aria-label="Edit" alt="Edit">
    <title>Edit</title>
    <path d="M7.926 3.38L1.002 9.72V12h2.304l6.926-6.316L7.926 3.38zm.738-.675l2.308 2.304 1.451-1.324-2.308-2.309-1.451 1.329zM.002 9.28L9.439.639a1 1 0 0 1 1.383.03l2.309 2.309a1 1 0 0 1-.034 1.446L3.694 13H.002V9.28zM0 16.013v-1h16v1z"></path>
  </svg>
</cv-data-table-action>
<cv-data-table-action @click="action3">
  <svg fill-rule="evenodd" height="16" name="settings" role="img" viewBox="0 0 15 16" width="15" aria-label="Settings" alt="Settings">
    <title>Settings</title>
    <path d="M7.53 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"></path>
    <path d="M6.268 2.636l-.313.093c-.662.198-1.28.52-1.822.946l-.255.2-1.427-.754-1.214 1.735 1.186 1.073-.104.31a5.493 5.493 0 0 0-.198 2.759l.05.274L1 10.33l1.214 1.734 1.06-.56.262.275a5.5 5.5 0 0 0 2.42 1.491l.312.093L6.472 15H8.59l.204-1.636.313-.093a5.494 5.494 0 0 0 2.21-1.28l.26-.248 1.09.576 1.214-1.734-1.08-.977.071-.29a5.514 5.514 0 0 0-.073-2.905l-.091-.302 1.15-1.041-1.214-1.734-1.3.687-.257-.22a5.487 5.487 0 0 0-1.98-1.074l-.313-.093L8.59 1H6.472l-.204 1.636zM5.48.876A1 1 0 0 1 6.472 0H8.59a1 1 0 0 1 .992.876l.124.997a6.486 6.486 0 0 1 1.761.954l.71-.375a1 1 0 0 1 1.286.31l1.215 1.734a1 1 0 0 1-.149 1.316l-.688.622a6.514 6.514 0 0 1 .067 2.828l.644.581a1 1 0 0 1 .148 1.316l-1.214 1.734a1 1 0 0 1-1.287.31l-.464-.245c-.6.508-1.286.905-2.029 1.169l-.124.997A1 1 0 0 1 8.59 16H6.472a1 1 0 0 1-.992-.876l-.125-.997a6.499 6.499 0 0 1-2.274-1.389l-.399.211a1 1 0 0 1-1.287-.31L.181 10.904A1 1 0 0 1 .329 9.59l.764-.69a6.553 6.553 0 0 1 .18-2.662l-.707-.64a1 1 0 0 1-.148-1.315l1.214-1.734a1 1 0 0 1 1.287-.31l.86.454a6.482 6.482 0 0 1 1.576-.819L5.48.876z"></path>
  </svg>
</cv-data-table-action>
<cv-button small @click="actionNew">Add new</cv-button>
      `,
    },
  },
  batchActions: {
    group: 'slots',
    slot: {
      name: 'batch-actions',
      value: `
<cv-button small kind="ghost" @click="onBatchAction1">
  Ghost
  <svg
    class="bx--btn__icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
      fill-rule="evenodd"
    ></path>
  </svg>
</cv-button>
<cv-button small kind="ghost" @click="onBatchAction2">
  Ghost
  <svg
    class="bx--btn__icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
      fill-rule="evenodd"
    ></path>
  </svg>
</cv-button>
<cv-button small kind="ghost" @click="onBatchAction3">
  Ghost
  <svg
    class="bx--btn__icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 7H4v2h3v3h2V9h3V7H9V4H7v3zm1 9A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
      fill-rule="evenodd"
    ></path>
  </svg>
</cv-button>
`,
    },
  },
  sort: {
    group: 'attr',
    value: '@sort="onSort"',
  },
  slottedData: {
    group: 'slots',
    slot: {
      name: 'data',
      value:
        '\n    <cv-data-table-row v-for="(row, rowIndex) in internalData" :key="`${rowIndex}`" :value="`${rowIndex}`">' +
        '\n       <cv-data-table-cell v-for="(cell, cellIndex) in row" :key="`${cellIndex}`" :value="`${cellIndex}`" v-html="cell"></cv-data-table-cell>' +
        '\n    </cv-data-table-row>\n',
    },
  },
  htmlData: {
    group: 'slots',
    slot: {
      name: 'data',
      value:
        '\n    <cv-data-table-row v-for="(row, rowIndex) in [`ibm`, `beta`, `local`, `custom`, `private`]" :key="`${rowIndex}`" :value="`${rowIndex}`">' +
        '\n       <cv-data-table-cell><input type="text" :value="row" style="border: none; background: none; width: 100%;"/></cv-data-table-cell>' +
        '\n       <cv-data-table-cell><input type="number" :value="rowIndex * rowIndex" style="border: none; background: none; width: 100%;" /></cv-data-table-cell>' +
        '\n       <cv-data-table-cell><input type="password" value="ASecret" style="border: none; background: none; width: 100%;" /></cv-data-table-cell>' +
        '\n       <cv-data-table-cell><a href="https://vue.carbondesignsystem.com">Here</a></cv-data-table-cell>' +
        '\n       <cv-data-table-cell><cv-tag :kind="row" label="I am a tag" /></cv-data-table-cell>' +
        '\n       <cv-data-table-cell><cv-button type="button" v-html="`Clicky ${row}`" style="width: 100%;"></cv-button></cv-data-table-cell>' +
        '\n       <cv-data-table-cell>' +
        '\n           <cv-overflow-menu flip-menu style="margin: 0 auto;">' +
        '\n               <cv-overflow-menu-item>Edit</cv-overflow-menu-item>' +
        '\n               <cv-overflow-menu-item>Test</cv-overflow-menu-item>' +
        '\n           </cv-overflow-menu>' +
        '\n       </cv-data-table-cell>' +
        '\n    </cv-data-table-row>\n',
    },
  },
  overflowMenu: {
    group: 'attr',
    value: `:overflow-menu="sampleOverflowMenu"`,
  },
};

const variants = [
  { name: 'default', excludes: ['columns2', 'slottedData', 'htmlData'] },
  { name: 'minimal', includes: ['columns', 'data'] },
  { name: 'slotted data', includes: ['columns', 'slottedData', 'data'] },
  { name: 'slotted HTML', includes: ['columns', 'htmlData'] },
  { name: 'styled columns', includes: ['columns2', 'data'] },
];

const storySet = knobsHelper.getStorySet(variants, preKnobs);
for (const experimental of [false, true]) {
  const stories = experimental ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        experimental ? override({ componentsX: true }) : reset();
        const settings = story.knobs();
        // ----------------------------------------------------------------

        const templateString = `
<cv-data-table${settings.group.attr} ${
          settings.group.slots.indexOf('slot="data"') < 0
            ? ':data="filteredData"'
            : ''
        } ${
          settings.group.attr.indexOf(':overflow-menu=') < 0
            ? ''
            : '@overflow-menu-click="onOverflowMenuClick"'
        } ${
          settings.group.slots.indexOf('cv-overflow-menu') < 0
            ? ''
            : ':overflow-menu="true"'
        } ref="table">${settings.group.slots}</cv-data-table>
  `;
        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      :sv-alt-back="false"
      sv-source='${templateString.trim()}'
      >
      <template slot="component">${templateString}</template>
      <template slot="other">
        <p>NOTE: Sorting and filtering are the responsibility of the component user. This component raises events to facilitate this.</p>
        <p>NOTE 2: Selection supports v-model via the rowSelects property and row-select-changes.</p>
      </template>
    </sv-template-view>
  `;

        return {
          components: {
            CvDataTable,
            CvDataTableAction,
            SvTemplateView,
            CvSearch,
          },
          template: templateViewString,
          props: settings.props,
          data() {
            return {
              experimental,
              internalData: this.data,
              filterValue: '',
              rowSelects: [],
              sortBy: null,
              sampleOverflowMenu: ['Start', 'Stop', 'Delete 3'],
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
            onFilter(val) {
              this.filterValue = val;
            },
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
            batchAction1: action('batch action 1'),
            onBatchAction1() {
              this.batchAction1(
                `selected items: [${this.$refs.table.selectedRows}]`
              );
              this.rowSelects = [];
            },
            batchAction2: action('batch action 2'),
            onBatchAction2() {
              this.batchAction2(
                `selected items: [${this.$refs.table.selectedRows}]`
              );
              this.rowSelects = [];
            },
            batchAction3: action('batch action 3'),
            onBatchAction3() {
              this.batchAction3(
                `selected items: [${this.$refs.table.selectedRows}]`
              );
              this.$refs.table.deselect();
            },
            action1: action('action 1'),
            action2: action('action 2'),
            action3: action('action 3'),
            actionNew: action('add new'),
            actionOnPagination: action('pagination change'),
            onOverflowMenuClick: action('overflow menu click'),
            actionRowSelectChange: action('row selected'),
          },
        };
      },
      {
        notes: { markdown: CvDataTableNotesMD },
      }
    );
  }
}
