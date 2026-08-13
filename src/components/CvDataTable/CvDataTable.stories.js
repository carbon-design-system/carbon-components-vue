import { action } from '@storybook/addon-actions';
import { computed, ref } from 'vue';
import {
  CvDataTable,
  CvDataTableAction,
  CvDataTableCell,
  CvDataTableHeading,
  CvDataTableRow,
  CvDataTableSkeleton,
} from '.';
import CvButton from '../CvButton/CvButton.vue';
import {
  Terminal16 as CompileIcon,
  Debug16 as DebugIcon,
  Chip16 as EmbedIcon,
  TrashCan16 as TrashCanIcon,
} from '@carbon/icons-vue';

// ---------------------------------------------------------------------------
// Shared test data & helpers
// ---------------------------------------------------------------------------
const testData = ref([
  {
    index: '0',
    name: 'Java',
    year: 1995,
    oo: 'Yes',
    purpose: 'Applications',
    standard: 'Java Language Specification',
    desc: 'As of September 2022, Java 19 is the latest version, while Java 17, 11 and 8 are the current long-term support (LTS) versions.',
  },
  {
    index: '1',
    name: 'COBOL',
    year: 1959,
    oo: 'Yes',
    purpose: 'Business applications',
    standard: 'COBOL 2014',
    desc: 'COBOL statements have an English-like syntax, which was designed to be self-documenting and highly readable.',
  },
  {
    index: '2',
    name: 'Pascal',
    year: 1970,
    oo: 'No',
    purpose: 'Applications',
    standard: 'None',
    desc: 'Pascal was developed on the pattern of the ALGOL 60 language.',
  },
  {
    index: '3',
    name: 'Ada',
    year: 1980,
    oo: 'Yes',
    purpose: 'US DoD projects',
    standard: 'Ada 2012 TC1',
    desc: 'Ada was named after Ada Lovelace (1815–1852), who has been credited as the first computer programmer.',
  },
  {
    index: '4',
    name: 'BASIC',
    year: 1964,
    oo: 'No',
    purpose: 'Education',
    standard: 'ANSI',
    desc: 'BASIC declined in popularity in the 1990s',
  },
  {
    index: '5',
    name: 'C++',
    year: 1985,
    oo: 'Yes',
    purpose: 'Systems programming',
    standard: 'ISO/IEC 2017',
    desc: 'C++ is standardized by the International Organization for Standardization (ISO), with the latest standard version ratified and published by ISO in December 2020 as ISO/IEC 14882:2020 (informally known as C++20).',
  },
  {
    index: '6',
    name: 'Fortran',
    year: 1957,
    oo: 'No',
    purpose: 'Engineering applications',
    standard: 'ANSI',
    desc: 'Fortran was originally developed by IBM in the 1950s for scientific and engineering applications, and subsequently came to dominate scientific computing.',
  },
  {
    index: '7',
    name: 'Go',
    year: 2009,
    oo: 'Maybe',
    purpose: 'Networked applications',
    standard: 'Go Spec',
    desc: "Go's designers were primarily motivated by their shared dislike of C++.",
  },
]);
const originalTestData = ref(JSON.parse(JSON.stringify(testData.value)));

const sortOpts = ref({ index: '0', order: 'none', name: 'name' });
function sortTestData(opts) {
  action('sort')(opts);
  sortOpts.value = opts;
  if (opts.order === 'none')
    return testData.value.sort((a, b) =>
      a.index.localeCompare(b.index, 'en', { sensitivity: 'base' })
    );
  const direction = opts.order === 'descending' ? -1 : 1;
  if (opts.name === 'name')
    return testData.value.sort(
      (a, b) =>
        direction * a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
    );
  else if (opts.name === 'year')
    return testData.value.sort((a, b) => direction * (a.year - b.year));
}

const searchOpts = ref('');
function searchTestData(opts) {
  action('search')(opts);
  searchOpts.value = opts;
  if (!opts)
    testData.value = JSON.parse(JSON.stringify(originalTestData.value));
  else
    testData.value = originalTestData.value.filter(
      d => d.name.indexOf(opts) > -1
    );
  return sortTestData(sortOpts.value);
}

const selectedRows = ref(['COBOL']);

// ---------------------------------------------------------------------------
// Shared component set
// ---------------------------------------------------------------------------
const components = {
  CvDataTable,
  CvDataTableHeading,
  CvDataTableRow,
  CvDataTableCell,
  CvDataTableAction,
  CvDataTableSkeleton,
  CvButton,
  CompileIcon,
  DebugIcon,
  EmbedIcon,
};

// ---------------------------------------------------------------------------
// Story meta
// ---------------------------------------------------------------------------
export default {
  title: 'Component/CvDataTable',
  component: CvDataTable,
  argTypes: {
    rowSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    rowsSelected: {
      control: 'multi-select',
      options: ['Java', 'COBOL', 'C++'],
    },
    useBatchActions: {
      description:
        'To use batch actions you should assign a usable `id` to each row. i.e. `<cv-data-table-row :id="item.id" ...` This `id` value is passed to the row selection events.',
    },
  },
  parameters: {
    controls: {
      exclude: [
        'default',
        'overflow-menu-click',
        'pagination',
        'row-expanded',
        'row-select-change',
        'row-select-changes',
        'search',
        'sort',
        'actions',
        'batch-actions',
        'data',
        'headings',
        'helper-text',
        'items-selected',
        'of-n-pages',
        'range-text',
        'skeleton',
        'update:rowsSelected',
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------
const defaultTemplate = `
<cv-data-table v-bind="args"
  @search="onSearch"
  @sort="onSort"
  @row-select-change="onRowSelectChange"
  @row-select-changes="onRowSelectChanges"
  @overflow-menu-click="onOverflowMenuClick"
  @row-expanded="onRowExpanded"
  @pagination="onPagination"
  :pagination="usePagination"
  :initialSearchValue="searchOpts"
>
  <template v-if="useBatchActions" #batch-actions>
    <cv-button :icon="trashIcon" @click="onDelete">Delete</cv-button>
  </template>
  <template v-if="useActions" #actions>
    <cv-data-table-action @click="onAction1" aria-label="compile" alt="compile">
      <compile-icon><title>Compile</title></compile-icon>
    </cv-data-table-action>
    <cv-data-table-action @click="onAction2" aria-label="debug" alt="debug">
      <debug-icon><title>Debug</title></debug-icon>
    </cv-data-table-action>
    <cv-data-table-action @click="onAction3" aria-label="firmware" alt="firmware">
      <embed-icon><title>Install Firmware</title></embed-icon>
    </cv-data-table-action>
  </template>
  <template #headings>
    <cv-data-table-heading id="sb-name" heading="Name" name="name" sortable order="ascending" />
    <cv-data-table-heading id="sb-year" heading="Year" name="year" sortable />
    <cv-data-table-heading id="sb-oo" heading="Object Oriented" />
    <cv-data-table-heading id="sb-purpose" heading="Purpose" />
    <cv-data-table-heading id="sb-standard" heading="Standard" />
  </template>
  <template #data>
    <cv-data-table-row v-for="row in testData" :id="row.name" :key="row.name" :value="row.name">
      <cv-data-table-cell>{{row.name}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.year}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.oo}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.purpose}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.standard}}</cv-data-table-cell>
    </cv-data-table-row>
  </template>
</cv-data-table>`;

const expandingRowsTemplate = `
<cv-data-table v-bind="args"
  :expandable="true"
  @sort="onSort"
  @row-select-change="onRowSelectChange"
  @row-select-changes="onRowSelectChanges"
  @overflow-menu-click="onOverflowMenuClick"
  @row-expanded="onRowExpanded"
  @pagination="onPagination"
  :pagination="usePagination"
>
  <template v-if="useBatchActions" #batch-actions>
    <cv-button :icon="trashIcon" @click="onDelete">Delete</cv-button>
  </template>
  <template v-if="useActions" #actions>
    <cv-data-table-action @click="onAction1" aria-label="compile" alt="compile">
      <compile-icon><title>Compile</title></compile-icon>
    </cv-data-table-action>
  </template>
  <template #headings>
    <cv-data-table-heading id="sb-name" heading="Name" name="name" sortable order="ascending" />
    <cv-data-table-heading id="sb-year" heading="Year" name="year" sortable />
    <cv-data-table-heading id="sb-oo" heading="Object Oriented" />
    <cv-data-table-heading id="sb-purpose" heading="Purpose" />
    <cv-data-table-heading id="sb-standard" heading="Standard" />
  </template>
  <template #data>
    <cv-data-table-row v-for="row in originalTestData" :id="row.name" :key="row.name" :value="row.name">
      <cv-data-table-cell>{{row.name}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.year}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.oo}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.purpose}}</cv-data-table-cell>
      <cv-data-table-cell>{{row.standard}}</cv-data-table-cell>
      <template #expandedContent>{{row.desc}}</template>
    </cv-data-table-row>
  </template>
</cv-data-table>`;

const skeletonTemplate = `
<cv-data-table-skeleton
  :columns="skeletonCols"
  :rows="skeletonRows"
  :title="skeletonTitle"
  :helperText="skeletonHelper"
>
  <template v-if="useBatchActions" #batch-actions>
    <cv-button :icon="trashIcon" @click="onDelete">Delete</cv-button>
  </template>
  <template v-if="useActions" #actions>
    <cv-data-table-action @click="onAction1" aria-label="compile" alt="compile">
      <compile-icon><title>Compile</title></compile-icon>
    </cv-data-table-action>
  </template>
</cv-data-table-skeleton>`;

const vModelTemplate = `
<div>
  <cv-data-table v-bind="args"
    v-model:rows-selected="selectedRows"
    @update:rows-selected="onVmodel"
    @sort="onSort"
    @overflow-menu-click="onOverflowMenuClick"
    @row-expanded="onRowExpanded"
    @pagination="onPagination"
    :pagination="usePagination"
  >
    <template v-if="useBatchActions" #batch-actions>
      <cv-button :icon="trashIcon" @click="onDelete">Delete</cv-button>
    </template>
    <template v-if="useActions" #actions>
      <cv-data-table-action @click="onAction1" aria-label="compile" alt="compile">
        <compile-icon><title>Compile</title></compile-icon>
      </cv-data-table-action>
    </template>
    <template #headings>
      <cv-data-table-heading id="sb-name" heading="Name" name="name" sortable order="ascending" />
      <cv-data-table-heading id="sb-year" heading="Year" name="year" sortable />
      <cv-data-table-heading id="sb-oo" heading="Object Oriented" />
      <cv-data-table-heading id="sb-purpose" heading="Purpose" />
      <cv-data-table-heading id="sb-standard" heading="Standard" />
    </template>
    <template #data>
      <cv-data-table-row v-for="row in originalTestData" :id="row.name" :key="row.name" :value="row.name">
        <cv-data-table-cell>{{row.name}}</cv-data-table-cell>
        <cv-data-table-cell>{{row.year}}</cv-data-table-cell>
        <cv-data-table-cell>{{row.oo}}</cv-data-table-cell>
        <cv-data-table-cell>{{row.purpose}}</cv-data-table-cell>
        <cv-data-table-cell>{{row.standard}}</cv-data-table-cell>
      </cv-data-table-row>
    </template>
  </cv-data-table>
  <div style="margin-top:1rem; background-color: #888888; padding:1rem">
    <div style="font-size: 150%">Sample interaction</div>
    <select name="programming-languages" id="programming-languages" v-model="selectedRows" multiple>
      <option v-for="l in originalTestData" :id="l.name" :key="l.name" :value="l.name">{{l.name}}</option>
    </select>
    <div>selections: {{ selectedRows }}</div>
  </div>
</div>`;

// ---------------------------------------------------------------------------
// Shared setup factory
// ---------------------------------------------------------------------------
function makeSetup(args, extra = {}) {
  return {
    args: computed(() => args),
    trashIcon: TrashCanIcon,
    onSort: sortTestData,
    onSearch: searchTestData,
    onRowSelectChange: action('row-select-change'),
    onRowSelectChanges: action('row-select-changes'),
    onOverflowMenuClick: action('overflow-menu-click'),
    onVmodel: action('v-model'),
    onRowExpanded: action('row-expanded'),
    onPagination: action('pagination'),
    onAction1: action('compile'),
    onAction2: action('debug'),
    onAction3: action('firmware'),
    onDelete: action('delete'),
    useActions: args.useActions,
    useBatchActions: args.useBatchActions,
    usePagination: args.usePagination,
    skeletonRows: args.skeletonRows,
    skeletonCols: args.skeletonCols,
    skeletonTitle: args.title,
    skeletonHelper: args.helperText,
    testData,
    originalTestData,
    searchOpts,
    selectedRows,
    ...extra,
  };
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------
const Template = (argsIn, template) => ({
  args: argsIn,
  render: args => ({
    components,
    setup: () => makeSetup(args),
    template,
  }),
});

export const Default = Template(
  {
    title: 'Table title: Programming Languages',
    helperText: 'Table helper text',
    useActions: false,
    useBatchActions: false,
    usePagination: true,
  },
  defaultTemplate
);

export const ExpandingRows = Template(
  {
    title: 'Table with expanding rows',
    helperText: 'Click row to expand',
    useActions: false,
    useBatchActions: false,
    usePagination: true,
    expandable: true,
  },
  expandingRowsTemplate
);

export const Skeleton = Template(
  {
    title: 'Table title',
    helperText: 'Data has been requested...',
    skeletonRows: 5,
    skeletonCols: 5,
    useBatchActions: false,
    useActions: false,
    usePagination: true,
  },
  skeletonTemplate
);

export const VModelSelectedRows = Template(
  {
    title: 'v-model example',
    helperText: 'select rows to see updates',
    useBatchActions: true,
    useActions: false,
    usePagination: false,
  },
  vModelTemplate
);
