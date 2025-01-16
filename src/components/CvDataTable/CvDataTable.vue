<template>
  <div :id="uid" :style="tableStyle" class="cv-data-table">
    <div
      :class="[
        `${carbonPrefix}--data-table-container`,
        {
          [`${carbonPrefix}--data-table-container--static`]: staticWidth,
          [`${carbonPrefix}--data-table--max-width`]: !staticWidth,
        },
      ]"
    >
      <div v-if="hasTableHeader" :class="`${carbonPrefix}--data-table-header`">
        <h4 v-if="title" :class="`${carbonPrefix}--data-table-header__title`">
          {{ title }}
        </h4>
        <p
          v-if="isHelper"
          :class="`${carbonPrefix}--data-table-header__description`"
        >
          <slot name="helper-text">{{ helperText }}</slot>
        </p>
      </div>
      <section v-if="hasToolbar" :class="`${carbonPrefix}--table-toolbar`">
        <div
          v-show="hasBatchActions"
          :aria-hidden="`${!batchActive}`"
          :class="[
            `${carbonPrefix}--batch-actions`,
            { [`${carbonPrefix}--batch-actions--active`]: batchActive },
          ]"
          :aria-label="actionBarAriaLabel"
        >
          <div :class="`${carbonPrefix}--action-list`">
            <slot name="batch-actions" />
            <cv-button
              :class="`${carbonPrefix}--batch-summary__cancel`"
              size="small"
              @click="deselect"
              >{{ batchCancelLabel }}</cv-button
            >
          </div>
          <div :class="`${carbonPrefix}--batch-summary`">
            <p :class="`${carbonPrefix}--batch-summary__para`">
              <span data-items-selected>
                <slot
                  name="items-selected"
                  :scope="{ count: dataRowsSelected.length }"
                  >{{ dataRowsSelected.length }} items selected</slot
                >
              </span>
            </p>
          </div>
        </div>
        <div :class="`${carbonPrefix}--toolbar-content`">
          <div
            v-if="onSearch"
            ref="searchContainer"
            :aria-labelledby="`${uid}-search`"
            :class="[
              `${carbonPrefix}--search `,
              {
                [`${carbonPrefix}--toolbar-search-container-active`]:
                  searchActive || searchValue.length > 0,
                [`${carbonPrefix}--toolbar-search-container-persistent`]:
                  !expandingSearch,
                [`${carbonPrefix}--toolbar-search-container-expandable`]:
                  expandingSearch,
              },
            ]"
            role="search"
          >
            <div ref="magnifier" :class="`${carbonPrefix}--search-magnifier`">
              <Search16 :class="`${carbonPrefix}--search-magnifier-icon`" />
            </div>
            <label
              :id="`${uid}-search`"
              :for="`searchbox-${uid}`"
              :class="`${carbonPrefix}--label`"
              >{{ searchLabel }}</label
            >
            <input
              :id="`searchbox-${uid}`"
              ref="search"
              v-model="searchValue"
              :class="`${carbonPrefix}--search-input`"
              type="text"
              role="searchbox"
              :placeholder="searchPlaceholder"
              :aria-labelledby="`searchbox-${uid}`"
              @input="onInternalSearch"
              @click="checkSearchExpand(true)"
              @keydown.esc.prevent="checkSearchExpand(false)"
              @focus="checkSearchExpand(true)"
              @blur="checkSearchExpand(false)"
            />
            <button
              :class="[
                `${carbonPrefix}--search-close`,
                {
                  [`${carbonPrefix}--search-close--hidden`]:
                    !clearSearchVisible,
                },
              ]"
              :title="searchClearLabel"
              :aria-label="searchClearLabel"
              type="button"
              @click="onClearClick"
            >
              <Close16 />
            </button>
          </div>
          <slot name="actions" />
        </div>
      </section>

      <div :class="`${carbonPrefix}--data-table-content`">
        <component :is="stickyHeader ? 'section' : 'div'">
          <table
            :class="[
              `${carbonPrefix}--data-table`,
              `${carbonPrefix}--data-table--${rowSize || 'lg'}`,
              {
                [`${carbonPrefix}--data-table--zebra `]: zebra,
                [`${carbonPrefix}--data-table--sticky-header `]: stickyHeader,
                [`${carbonPrefix}--data-table--no-border `]: borderless,
                [`${carbonPrefix}--skeleton `]: skeleton,
                [`${carbonPrefix}--data-table--sort `]: isSortable,
                [`${carbonPrefix}--data-table--static `]: staticWidth,
              },
            ]"
          >
            <thead>
              <tr>
                <th
                  v-if="expandable"
                  :class="`${carbonPrefix}--table-expand`"
                  :data-previous-value="
                    dataExpandAll ? 'collapsed' : 'expanded'
                  "
                >
                  <button
                    v-if="hasExpandAll"
                    :class="`${carbonPrefix}--table-expand__button`"
                    type="button"
                    :aria-label="
                      dataExpandAll ? collapseAllAriaLabel : expandAllAriaLabel
                    "
                    @click="toggleExpandAll"
                  >
                    <ChevronRight16
                      :class="`${carbonPrefix}--table-expand__svg`"
                    />
                  </button>
                </th>

                <th
                  v-if="hasBatchActions"
                  :class="`${carbonPrefix}--table-column-checkbox`"
                >
                  <cv-checkbox-skeleton v-if="isSkeleton" />
                  <cv-checkbox
                    v-else
                    :id="`col-cb-${uid}`"
                    v-model="headingChecked"
                    :form-item="false"
                    value="headingCheck"
                    :label="selectAllAriaLabel"
                    hide-label
                    @change="onHeadingCheckChange"
                  />
                </th>
                <slot name="headings">
                  <cv-data-table-heading
                    v-for="(column, index) in columns"
                    :key="`${index}:${column}`"
                    :heading="columnHeading(column)"
                    :sortable="isColSortable(column)"
                    :order="column.order"
                    :heading-style="headingStyle(column)"
                    :skeleton="skeleton"
                  />
                </slot>
                <th v-if="hasOverflowMenu"></th>
              </tr>
            </thead>

            <component :is="expandable ? Empty : 'tbody'">
              <slot name="data">
                <cv-data-table-row
                  v-for="(row, rowIndex) in data"
                  :id="`${uid}-${rowIndex}`"
                  :key="`row:${rowIndex}`"
                  ref="dataRows"
                  :value="`${rowIndex}`"
                  :overflow-menu="overflowMenu"
                >
                  <cv-data-table-cell
                    v-for="(cell, colIndex) in row"
                    :key="`cell:${colIndex}:${rowIndex}`"
                    :style="dataStyle(colIndex)"
                  >
                    <component :is="skeleton ? 'span' : Empty">{{
                      cell
                    }}</component>
                  </cv-data-table-cell>
                </cv-data-table-row>
              </slot>
            </component>
          </table>
        </component>
      </div>
    </div>
    <cv-pagination
      v-if="pagination"
      v-bind="internalPagination"
      :id="`pagination-${uid}`"
      :number-of-items="internalNumberOfItems"
      @change="$emit('pagination', $event)"
    >
      <template #range-text="{ scope }">
        <slot name="range-text" :scope="scope" />
      </template>

      <template #of-n-pages="{ scope }">
        <slot name="of-n-pages" :scope="scope"></slot>
      </template>
    </cv-pagination>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import CvDataTableHeading from './CvDataTableHeading.vue';
import CvDataTableRow from './CvDataTableRow.vue';
import CvDataTableCell from './CvDataTableCell.vue';
import CvButton from '../CvButton';
import { CvCheckbox, CvCheckboxSkeleton } from '../CvCheckbox';
import CvPagination from '../CvPagination';
import Search16 from '@carbon/icons-vue/es/search/16';
import Close16 from '@carbon/icons-vue/es/close/16';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  unref,
  useSlots,
  watch,
  provide,
} from 'vue';
import { props as propsCvId, useCvId } from '../../use/cvId';
import Empty from '../CvEmpty/_CvEmpty.vue';

const props = defineProps({
  /** Arial label for the action bar. */
  actionBarAriaLabel: { type: String, default: 'Table Action Bar' },
  /** Arial label for the "collapse all" button in tables with expandable rows". */
  collapseAllAriaLabel: { type: String, default: 'Collapse all rows' },
  /** Arial label for the "expand all" button in tables with expandable rows". */
  expandAllAriaLabel: { type: String, default: 'Expand all rows' },
  /** Arial label for the "select all" button in tables with selectable rows". */
  selectAllAriaLabel: { type: String, default: 'Select all rows' },
  /** Table will size use auto sizing */
  autoWidth: { type: Boolean, default: false },
  /** Label for the button to cancel batch actions */
  batchCancelLabel: { type: String, default: 'Cancel' },
  /** Table will have no border */
  borderless: { type: Boolean, default: false },
  /**
   * An array of overflow menu labels. On click CvDataTable will raise an 'overflow-menu-click' event passing an object containing menuIndex, menuLabel and rowValue
   * - As part of the array pass an object containing props for the overflowMenu. E.g. { label: 'Overflow menu', tipAlignment: 'end', tipPosition: 'top' },
   */
  overflowMenu: { type: [Boolean, Array], default: () => [] },
  /** can be set to true or an object containing camel case props for a CvPagination component */
  pagination: {
    type: [Boolean, Object],
    default: false,
  },
  /** 'compact', 'small', or 'tall' */
  rowSize: {
    type: String,
    default: 'lg',
    validator: val => {
      if (['compact', 'short', 'standard', 'tall', ''].includes(val))
        console.warn(
          `rowSize ${val} is deprecated. Use "xs", "sm", "md", "lg", or "lg" instead`
        );
      return [
        'compact',
        'short',
        'standard',
        'tall',
        '',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
      ].includes(val);
    },
  },
  searchLabel: { type: String, default: 'Search' },
  searchPlaceholder: { type: String, default: 'Search' },
  searchClearLabel: { type: String, default: 'Clear search' },
  /** Set text in search bar on table generation */
  initialSearchValue: { type: String, default: '' },
  /** can be sorted */
  sortable: { type: Boolean, default: false },
  /** Table will have expandable rows */
  expandable: { type: Boolean, default: false },
  title: { type: String, default: undefined },
  /**
   * An array containing a list of columns
   * - Columns can be string labels or objects
   * - If objects
   *   - MUST contain a label if headings are not slotted
   *   - Optionally a headingStyle object to be applied to the column headings if not slotted.
   *   - Optionally a dataStyle object to be applied to the data in the column.
   *   - Optionally a sortable property - if any column sets this to true then only columns with sortable set to true are sortable. NOTE: table sortable property not required.
   */
  columns: { type: Array, default: () => [] },
  /** Two-dimensional array of strings. */
  data: { type: Array, default: () => [] },
  /** `true` to use Zebra style striping. */
  zebra: { type: Boolean, default: false },
  /** Specify whether the header should be sticky. Still experimental: may not work with every combination of table props. */
  stickyHeader: { type: Boolean, default: false },
  /** An array containing the selected row values. Supports v-model via the row-select-changes event. */
  rowsSelected: { type: Array, default: () => [] },
  /** Normally batch actions are hidden if no items are selected. Set this to true to always show batch actions */
  stickyBatchActive: { type: Boolean, default: false },
  /** subtext on the table */
  helperText: { type: String, default: undefined },
  /** Animate the search bar opening */
  expandingSearch: { type: Boolean, default: true },
  /** Show table loading / skeleton state */
  skeleton: { type: Boolean, default: false },
  /** Should the expand all button be available */
  hasExpandAll: { type: Boolean, default: false },
  /** Use a width of 'auto' instead of 100% */
  staticWidth: { type: Boolean, default: false },
  /** User defined search action */
  onSearch: { type: Function, default: undefined },
  ...propsCvId,
});
const uid = useCvId(props, true);

const isSkeleton = ref(props.skeleton);
provide('is-skeleton', isSkeleton);
watch(
  () => props.skeleton,
  () => (isSkeleton.value = props.skeleton)
);

watch(() => props.rowsSelected, updateRowsSelected);

const searchContainer = ref(null);
const magnifier = ref(null);
const search = ref(null);

/** @type {Ref<Set<String>>} */
const expandingRowIds = ref(new Set());
provide('expanding-row-ids', expandingRowIds);

const tableExpandable = ref(props.expandable);
provide('table-expandable', tableExpandable);
onMounted(() => {
  if (props.expandable) expandingRowIds.value.add('table-expand-row');
});
watch(
  () => props.expandable,
  () => {
    tableExpandable.value = props.expandable;
    if (props.expandable) expandingRowIds.value.add('table-expand-row');
    else expandingRowIds.value.delete('table-expand-row');
  }
);
const clearSearchVisible = ref(false);

onMounted(() => {
  if (searchContainer.value) {
    magnifier.value?.addEventListener('blur', checkSearchFocus);
    search.value?.addEventListener('blur', checkSearchFocus);
  }
  if (props.initialSearchValue) clearSearchVisible.value = true;
  updateRowsSelected();
});

onUnmounted(() => {
  if (searchContainer.value) {
    magnifier.value?.removeEventListener('blur', checkSearchFocus);
    search.value?.removeEventListener('blur', checkSearchFocus);
  }
});
const slots = useSlots();
onMounted(checkSlots);
onUpdated(checkSlots);

const hasActions = ref(false);
const hasToolbar = ref(false);
const hasBatchActions = ref(false);
const isHelper = ref(false);

provide('has-batch-actions', hasBatchActions);

function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  hasBatchActions.value = !!slots['batch-actions'];
  hasActions.value = !!slots.actions;
  hasToolbar.value = !!(
    slots.actions ||
    props.onSearch ||
    slots['batch-actions']
  );
  isHelper.value = !!(
    slots['helper-text'] ||
    (props.helperText && props.helperText.length)
  );
}

function columnHeading(c) {
  const col = unref(c);
  if (typeof col === 'object') {
    return col.label || '';
  } else {
    return col;
  }
}

const sortableHeadings = ref(new Set());
provide('sortableHeadings', sortableHeadings);
const isSortable = computed(() => {
  // is any column sortable
  return props.sortable || sortableHeadings.value.size > 0;
});

function isColSortable(c) {
  const col = unref(c);
  // is specific column or all sortable
  return (col && col.sortable) || props.sortable;
}

const hasTableHeader = computed(() => {
  return props.title || isHelper.value;
});

const hasOverflowMenu = computed(() => {
  return (
    props.overflowMenu === true ||
    (props.overflowMenu && props.overflowMenu.length > 0)
  );
});

const tableStyle = computed(() => {
  return props.autoWidth
    ? { width: 'initial', display: 'inline-block' }
    : { width: '100%' };
});

const internalPagination = computed(() => {
  if (typeof props.pagination === 'object') {
    return props.pagination;
  } else {
    if (props.pagination === true) {
      return {};
    }
  }
  return false;
});

const rowIds = ref(new Set());
provide('row-ids', rowIds);

const internalNumberOfItems = computed(() => {
  const internal = internalPagination.value;
  if (internal.numberOfItems !== undefined) {
    return internal.numberOfItems;
  } else {
    return rowIds.value.size;
  }
});

function headingStyle(c) {
  const col = unref(c);
  return typeof col === 'object' ? col.headingStyle : {};
}

const dataStyle = computed(() => {
  return index =>
    (props.columns && props.columns[index] && props.columns[index].dataStyle) ||
    {};
});

const searchActive = ref(false);
function checkSearchFocus(ev) {
  if (!searchContainer.value.contains(ev.relatedTarget)) {
    searchActive.value = false;
  }
}
function checkSearchExpand(force) {
  if (typeof force === 'boolean') {
    searchActive.value = force;
  } else {
    searchActive.value = !searchActive.value;
  }
  if (searchActive.value) {
    nextTick(() => {
      search.value?.focus();
    });
  } else {
    nextTick(() => {
      magnifier.value?.focus();
    });
  }
}

const dataRowsSelected = ref(props.rowsSelected);
provide('rows-selected', dataRowsSelected);

const headingChecked = ref(false);
watch(
  () => dataRowsSelected,
  () => {
    headingChecked.value =
      rowIds.value.size > 0 &&
      dataRowsSelected.value.length === rowIds.value.size;
  },
  { deep: true }
);

const batchActive = computed(() => {
  return (
    props.stickyBatchActive ||
    dataRowsSelected.value.length > 0 ||
    headingChecked.value
  );
});

function updateRowsSelected() {
  dataRowsSelected.value = [...props.rowsSelected];
}

const emit = defineEmits([
  // 'search', // Do not define the search emit here. We need to know if it is specified on the component but if we include it here it is not available in attrs.
  'row-select-change',
  'row-select-changes',
  'update:rowsSelected',
  'overflow-menu-click',
  'sort',
  'row-expanded',
  'pagination',
]);
const searchValue = ref(props.initialSearchValue);
function onClearClick() {
  searchValue.value = '';
  clearSearchVisible.value = false;
  // eslint-disable-next-line vue/require-explicit-emits
  emit('search', searchValue.value); // see comment above in defineEmits
  nextTick(() => {
    search.value?.focus();
  });
}
function onHeadingCheckChange() {
  // check /uncheck all children
  if (headingChecked.value) dataRowsSelected.value = [...rowIds.value];
  else dataRowsSelected.value = [];
}
function deselect() {
  headingChecked.value = false;
  onHeadingCheckChange();
}

const previousEmit = ref([...props.rowsSelected]);
watch(
  dataRowsSelected,
  () => {
    // was tempted to use Set.symmetricDifference but support for that was only
    // add in Feb/June 2024
    const diff = dataRowsSelected.value
      .filter(x => !previousEmit.value.includes(x))
      .concat(
        previousEmit.value.filter(x => !dataRowsSelected.value.includes(x))
      );
    if (diff.length > 0) {
      emit('row-select-changes', dataRowsSelected.value);
      emit('update:rowsSelected', dataRowsSelected.value);
      previousEmit.value = [...dataRowsSelected.value];
    }
  },
  { deep: true }
);
function onRowCheckChange(value, checked) {
  emit('row-select-change', { value, selected: checked });
}
provide('cv:check-change', onRowCheckChange);

function onMenuItemClick(val) {
  emit('overflow-menu-click', val);
}
provide('cv:click', onMenuItemClick);

function onInternalSearch() {
  clearSearchVisible.value = searchValue.value.length > 0;
  // eslint-disable-next-line vue/require-explicit-emits
  emit('search', searchValue.value);
}

const headingIds = ref(new Set());
provide('heading-ids', headingIds);
const currentSortHeadingId = ref(null);
provide('current-sort-heading-id', currentSortHeadingId);
function onSort(payload) {
  const { heading, value } = payload;
  const headings = Array.from(headingIds.value);
  currentSortHeadingId.value = heading.id;
  const index = headings.indexOf(heading.id);
  emit('sort', { index, order: value, name: heading.name });
}
provide('cv:sort', onSort);

// are all rows expanded
/** @type {Ref<Set<String>>} */
const expandedRowIds = ref(new Set());
provide('expanded-row-ids', expandedRowIds);

const dataExpandAll = computed(
  () => expandedRowIds.value.size === rowIds.value.size
);
function toggleExpandAll() {
  const toggle = !dataExpandAll.value;
  if (toggle) {
    rowIds.value.forEach(rowId => expandedRowIds.value.add(rowId));
  } else expandedRowIds.value.clear();
}

/**
 * A child row is changed
 * @param {{id:string, value:string, expandable:string, isExpanded:boolean, isChecked:boolean}} row
 */
function onCvExpandedChange(row) {
  emit('row-expanded', row);
}
provide('cv:expanded-change', onCvExpandedChange);
</script>
