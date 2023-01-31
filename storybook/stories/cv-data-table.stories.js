import { action } from '@storybook/addon-actions';
import { betterSource, deprecatedArgTypes, propHelper, removeArgTypes, slotHelper } from '../utils/storybook-helper';

import {
  CvButton,
  CvDataTable,
  CvDataTableRow,
  CvDataTableCell,
  CvDataTableAction,
  CvDataTableHeading,
} from '../../packages/core/src/';

import { actions, batchActions } from './cv-data-table-slots';
import storyData from './cv-data-table-data';
import { TrashCan16, Save16, Download16 } from '@carbon/icons-vue';
const slotsInfo = [
  { slot: 'actions', options: actions, containsComponent: true },
  { slot: 'batch-actions', options: batchActions, containsComponent: true },
  {
    slot: 'data',
    containsComponent: true,
    options: [
      undefined,
      {
        label: 'slotted rows and cells',
        value: `<cv-data-table-row v-for="(row, rowIndex) in filteredData" :key="\`row-\${rowIndex}\`" :value="\`row-\${rowIndex}\`">
  <cv-data-table-cell v-for="(cell, cellIndex) in row" :key="\`cell-\${rowIndex}-\${cellIndex}\`" :value="\`cell-\${rowIndex}-\${cellIndex}\`">
    {{cell}}
  </cv-data-table-cell>
</cv-data-table-row>`,
      },
    ],
    description: 'Slotted data takes precedence over the data prop.',
  },
  {
    slot: 'helper-text',
    options: [undefined, 'Some slotted helpful text'],
    description: 'Slot takes precedence over prop.',
  },
  {
    slot: 'headings',
    containsComponent: true,
    description: 'Slot takes precedence over prop.',
    options: [
      undefined,
      {
        label: 'Slotted headings',
        value: `
    <cv-data-table-heading heading="Name" sortable />
    <cv-data-table-heading>Protocol<cv-tooltip direction="bottom" tip="How comms get done" /></cv-data-table-heading>
    <cv-data-table-heading><cv-tooltip direction="bottom" tip="The port number">Port</cv-tooltip></cv-data-table-heading>
    <cv-data-table-heading heading="Rule" />
    <cv-data-table-heading heading="Attatched Groups" />
    <cv-data-table-heading heading="Status" />`,
      },
    ],
  },
  { slot: 'items-selected', scope: 'scope', options: [undefined, 'You picked {{scope.count}} rows.'] },
  {
    slot: 'range-text',
    scope: 'scope',
    options: [undefined, 'From {{scope.start}} to {{scope.end}} out of {{scope.items}}'],
  },
  {
    slot: 'of-n-pages',
    scope: 'scope',
    options: [undefined, 'out of {{scope.pages}} pages'],
  },
];

// TODO expanding data

const propsInfo = [
  { prop: 'columns', options: storyData.columns },
  {
    prop: 'data',
    options: [undefined, { label: 'Data as prop', value: storyData.data }],
    defaultIndex: 1,
  },
  { prop: 'pagination', options: storyData.pagination },
];

const slotHelp = slotHelper(slotsInfo);
const propHelp = propHelper(propsInfo);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvDataTable',
  component: CvDataTable,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    ...slotHelp.argTypes,
    ...propHelp.argTypes,
    ...deprecatedArgTypes(CvDataTable),
    ...removeArgTypes([
      'actionInSlot',
      'actionPagination',
      'actionSearch',
      'actionRowSelectChange',
      'actionRowSelectChanges',
      'actionOverflowMenuClick',
      'actionSort',
      'actionRowExpanded',
      'data',
    ]),

    // { control: { type: 'boolean' }, description: 'Listen to the pagination event' },
  },
}; // will have dif wrapped round it in story template

const actionSort = action('sort');
const actionInSlot = action('slot action');
const actionPagination = action('pagination');

// these props are explicitly used by the component under test
const extractedProps = { data: null };
import propsAsJsonMixin from '../utils/props-as-json-mixin';

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    TrashCan16,
    Save16,
    Download16,
    CvDataTable,
    CvDataTableRow,
    CvDataTableCell,
    CvDataTableAction,
    CvDataTableHeading,
    CvButton,
  },
  mixins: [propsAsJsonMixin],
  data() {
    return {
      extractedProps,
      internalData: storyData.data,
      filterValue: '',
      pageStart: 1,
      pageNumber: 1,
      pageLength: 5,
    };
  },
  created() {
    // used by
    propHelp.initMappedProps(this);
  },
  computed: {
    ...slotHelp.computed,
    ...propHelp.computed,
    filteredData() {
      let filteredData;
      if (this.filterValue) {
        const regex = new RegExp(this.filterValue, 'i');
        filteredData = this.internalData.filter(item => {
          return item.join('|').search(regex) >= 0;
        });
      } else {
        filteredData = this.internalData;
      }
      if (this.pageStart) {
        return filteredData.slice(this.pageStart, this.pageStart + this.pageLength);
      } else {
        return filteredData;
      }
    },
    dataAsProp() {
      // only used if requested by data control selection
      return this.computedData ? this.filteredData : undefined;
    },
  },
  watch: {
    data() {
      this.internalData = this.data;
    },
  },
  methods: {
    onFilter(val) {
      this.filterValue = val;
    },
    onPagination(ev) {
      this.$props.actionPagination(ev);
      this.pageStart = ev.start;
      this.pageNumber = ev.page;
      this.pageLength = ev.length;
    },
    onSort(sortBy) {
      this.$props.actionSort(sortBy);
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
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
    <cv-data-table
    v-bind="{...$props, ...extractedProps}"
    ${propHelp.attrs}
    :data="dataAsProp"
    @sort="onSort" @search="onFilter" @pagination="onPagination">
      ${slotHelp.html}
    </cv-data-table>
    <div>
      <props-revealed :json="propsJSON"/>
    </div>
  </div>`,
});

export const _CvDataTable = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvDataTable.args = {
  actionInSlot,
  actionSort,
  actionPagination,
  rowSize: '',
  autoWidth: false,
  sortable: false,
  title: 'Table title',
  actionBarAriaLabel: 'Custom action bar aria label',
  batchCancelLabel: 'Cancel',
  zebra: false,
  staticWidth: false,
  stickyHeader: false,
  helperText: 'This is some helpful text',
};
_CvDataTable.parameters = {
  controls: { exclude: ['id'] },
  docs: {
    source: betterSource(Template, _CvDataTable),
  },
};

// try using different templates instead of computed props
