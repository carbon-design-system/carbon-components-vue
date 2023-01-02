<template>
  <div :style="tableStyle" class="cv-data-table" :id="uid">
    <div :class="`${carbonPrefix}--data-table-container`">
      <div v-if="hasTableHeader" :class="`${carbonPrefix}--data-table-header`">
        <h4 :class="`${carbonPrefix}--data-table-header__title`" v-if="title">
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
          :aria-hidden="!batchActive"
          v-show="hasBatchActions"
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
                  v-bind:scope="{ count: dataRowsSelected.length }"
                  >{{ dataRowsSelected.length }} items selected</slot
                >
              </span>
            </p>
          </div>
        </div>
        <div :class="`${carbonPrefix}--toolbar-content`">
          <div
            v-if="$attrs.onSearch"
            :aria-labelledby="`${uid}-search`"
            :class="[
              `${carbonPrefix}--search ${carbonPrefix}--search--xl`,
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
            ref="searchContainer"
          >
            <div :class="`${carbonPrefix}--search-magnifier`" ref="magnifier">
              <Search16 :class="`${carbonPrefix}--search-magnifier-icon`" />
            </div>
            <label
              :id="`${uid}-search`"
              :for="uid"
              :class="`${carbonPrefix}--label`"
              >{{ searchLabel }}</label
            >
            <input
              :class="`${carbonPrefix}--search-input`"
              type="text"
              :id="uid"
              role="search"
              :placeholder="searchPlaceholder"
              :aria-labelledby="uid"
              ref="search"
              v-model="searchValue"
              @input="onSearch"
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
              @click="onClearClick"
              type="button"
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
              {
                [`${carbonPrefix}--data-table--${rowSize} `]: !(
                  rowSize.length === 0 || rowSize === 'standard'
                ),
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
                  v-if="hasExpandables"
                  :class="`${carbonPrefix}--table-expand`"
                  :data-previous-value="
                    dataExpandAll ? 'collapsed' : 'expanded'
                  "
                >
                  <button
                    v-if="hasExpandAll"
                    :class="`${carbonPrefix}--table-expand__button`"
                    @click="toggleExpandAll"
                    type="button"
                    :aria-label="
                      dataExpandAll ? collapseAllAriaLabel : expandAllAriaLabel
                    "
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
                  <cv-checkbox
                    :form-item="false"
                    value="headingCheck"
                    v-model="headingChecked"
                    @change="onHeadingCheckChange"
                    :label="selectAllAriaLabel"
                    hideLabel
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

            <component :is="hasExpandables ? 'div' : 'tbody'">
              <slot name="data">
                <cv-data-table-row
                  v-for="(row, rowIndex) in data"
                  :key="`row:${rowIndex}`"
                  :value="`${rowIndex}`"
                  ref="dataRows"
                  :overflow-menu="overflowMenu"
                >
                  <cv-data-table-cell
                    v-for="(cell, colIndex) in row"
                    :key="`cell:${colIndex}:${rowIndex}`"
                    :style="dataStyle(colIndex)"
                  >
                    <cv-wrapper :tag-type="skeleton ? 'span' : ''">{{
                      cell
                    }}</cv-wrapper>
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
      :number-of-items="internalNumberOfItems"
      :actual-items-on-page="registeredRows.length"
      @change="$emit('pagination', $event)"
    >
      <template v-slot:range-text="{ scope }">
        <slot name="range-text" v-bind:scope="scope" />
      </template>

      <template v-slot:of-n-pages="{ scope }">
        <slot name="of-n-pages" v-bind:scope="scope"></slot>
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
import CvCheckbox from '../CvCheckbox';
import CvPagination from '../CvPagination';
import CvWrapper from '../CvWrapper/CvWrapper';
import Search16 from '@carbon/icons-vue/es/search/16';
import Close16 from '@carbon/icons-vue/es/close/16';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import { getBus, removeBus } from '../../global/component-utils/event-bus';
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import { props as propsCvId, useCvId } from '../../use/cvId';
import store from './cvDataTableStore';

const props = defineProps({
  actionBarAriaLabel: { type: String, default: 'Table Action Bar' },
  collapseAllAriaLabel: { type: String, default: 'Collapse all rows' },
  expandAllAriaLabel: { type: String, default: 'Expand all rows' },
  selectAllAriaLabel: { type: String, default: 'Select all rows' },
  /**
   * Table will size use auto sizing
   */
  autoWidth: { type: Boolean, default: false },
  /**
   * Label for the button to cancel batch actions
   */
  batchCancelLabel: { type: String, default: 'Cancel' },
  /**
   * Table will have no border
   */
  borderless: { type: Boolean, default: false },
  /**
   * An array of overflow menu labels. On click CvDataTable will raise an 'overflow-menu-click' event passing an object containing menuIndex, menuLabel and rowValue
   * - As part of the array pass an object containing props for the overflowMenu. E.g. { label: 'Overflow menu', tipAlignment: 'end', tipPosition: 'top' },
   */
  overflowMenu: { type: [Boolean, Array], default: () => [] },
  /**
   * can be set to true or an object containing camel case props for a CvPagination component
   */
  pagination: {
    type: [Boolean, Object],
    default: false,
  },
  /**
   * 'compact', 'small', or 'tall'
   */
  rowSize: {
    type: String,
    default: 'standard',
    validator: val =>
      ['compact', 'short', 'standard', 'tall', ''].includes(val),
  },
  searchLabel: { type: String, default: 'Search' },
  searchPlaceholder: { type: String, default: 'Search' },
  searchClearLabel: { type: String, default: 'Clear search' },
  /**
   * Set text in search bar on table generation
   */
  initialSearchValue: { type: String, default: '' },
  /**
   * can be sorted
   */
  sortable: { type: Boolean, default: false },
  title: String,
  /**
   * An array containing a list of columns
   * - Columns can be string labels or objects
   * - If objects
   *   - MUST contain a label if headings are not slotted
   *   - Optionally a headingStyle object to be applied to the column headings if not slotted.
   *   - Optionally a dataStyle object to be applied to the data in the column.
   *   - Optionally a sortable property - if any column sets this to true then only columns with sortable set to true are sortable. NOTE: table sortable property not required.
   */
  columns: Array,
  /**
   * Two-dimensional array of strings.
   */
  data: Array,
  /**
   * the table striped
   */
  zebra: { type: Boolean, default: false },
  stickyHeader: { type: Boolean, default: false },
  /**
   * An array containing the selected row values. Supports v-model via the row-select-changes event.
   */
  rowsSelected: { type: Array, default: () => [] },
  helperText: { type: String, default: undefined },
  expandingSearch: { type: Boolean, default: true },
  skeleton: { type: Boolean, default: false },
  hasExpandAll: { type: Boolean, default: false },
  /**
   * Use a width of 'auto' instead of 100%
   */
  staticWidth: { type: Boolean, default: false },
  ...propsCvId,
});
const uid = useCvId(props, true);

let bus = undefined;
onBeforeMount(() => {
  bus = getBus(uid.value);
  bus.on('cv:check-change', onRowCheckChange);
  bus.on('cv:click', onMenuItemClick);
  bus.on('cv:sort', onSort);
  bus.on('cv:expanded-change', onCvExpandedChange);
  store.addParent(uid.value);
});
onUnmounted(() => {
  removeBus(uid.value);
  store.removeParent(uid.value);
});

watch(() => props.rowsSelected, updateRowsSelected);

const searchContainer = ref(null);
const magnifier = ref(null);
const search = ref(null);
onMounted(() => {
  if (searchContainer.value) {
    magnifier.value?.addEventListener('blur', checkSearchFocus);
    search.value?.addEventListener('blur', checkSearchFocus);
  }
  updateRowsSelected();
  checkSlots();
});

onUnmounted(() => {
  if (searchContainer.value) {
    magnifier.value?.removeEventListener('blur', checkSearchFocus);
    search.value?.removeEventListener('blur', checkSearchFocus);
  }
});
const slots = useSlots();
onUpdated(checkSlots);

const attrs = useAttrs();
const hasActions = ref(false);
const hasToolbar = ref(false);
const hasBatchActions = computed(() => {
  return store.hasBatchActions(uid);
});
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  store.setBatchActions(uid, !!slots['batch-actions']);
  hasActions.value = !!slots.actions;
  hasToolbar.value = !!(
    slots.actions ||
    attrs.onSearch ||
    slots['batch-actions']
  );
  isHelper.value = !!(
    slots['helper-text'] ||
    (props.helperText && props.helperText.length)
  );
}

const columnHeading = computed(col => {
  if (typeof col === 'object') {
    return col.label || '';
  } else {
    return col;
  }
});

const isSortable = computed(() => {
  // is any column sortable
  return props.sortable || store.someSortableHeadings(uid.value);
});
const isColSortable = computed(col => {
  // is specific column or all sortable
  return (col && col.sortable) || props.sortable;
});

const isHelper = ref(false);
const hasTableHeader = computed(() => {
  return props.title || isHelper.value;
});

const hasExpandables = computed(() => {
  return store.someExpandingRows(uid);
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

const registeredRows = ref([]);
const internalNumberOfItems = computed(() => {
  const internal = internalPagination.value;
  if (internal.numberOfItems !== undefined) {
    return internal.numberOfItems;
  } else {
    return registeredRows.value.length;
  }
});

const headingStyle = computed(col => {
  return typeof col === 'object' ? col.headingStyle : {};
});

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
const batchActive = ref(false);
const headingChecked = ref(false);
function updateRowsSelected() {
  dataRowsSelected.value = [];
  const rows = store.rows(uid);
  for (const i in rows) {
    let child = rows[i];
    const checked = props.rowsSelected.includes(child.value);
    store.updateRow(uid, { id: child.id, isChecked: checked });

    if (checked) {
      dataRowsSelected.value.push(child.value);
    }
  }
  headingChecked.value = dataRowsSelected.value.length === rows.length;
  batchActive.value = dataRowsSelected.value.length > 0;
}

const emit = defineEmits([
  // 'search', // Do not define the search emit here. We need to know if it is specified on the component but if we include it here it is not available in attrs.
  'row-select-change',
  'row-select-changes',
  'overflow-menu-click',
  'sort',
  'row-expanded',
  'pagination',
]);
const searchValue = ref(props.initialSearchValue);
const clearSearchVisible = ref(false);
function onClearClick() {
  searchValue.value = '';
  clearSearchVisible.value = false;
  emit('search', searchValue.value);
  nextTick(() => {
    search.value?.focus();
  });
}
function onHeadingCheckChange() {
  // check /uncheck all children
  batchActive.value = headingChecked.value;
  dataRowsSelected.value = [];
  const rows = store.rows(uid);
  for (const child of rows) {
    if (headingChecked.value) {
      dataRowsSelected.value.push(child.value);
    }

    if (child.isChecked !== headingChecked.value) {
      store.updateRow(uid, { ...child, isChecked: headingChecked.value });

      emit('row-select-change', {
        value: child.value,
        selected: headingChecked.value,
      });
    }
  }
  emit('row-select-changes', dataRowsSelected.value);
}
function deselect() {
  headingChecked.value = false;
  onHeadingCheckChange();
}
function onRowCheckChange(value, checked) {
  let modelSet = new Set(dataRowsSelected.value);

  if (!checked) {
    modelSet.delete(value);
  } else {
    modelSet.add(value);
  }
  dataRowsSelected.value = Array.from(modelSet);
  const rows = store.rows(uid);
  headingChecked.value = dataRowsSelected.value.length === rows.length;
  batchActive.value = dataRowsSelected.value.length > 0;

  emit('row-select-change', { value, selected: checked });
  emit('row-select-changes', dataRowsSelected.value);
}
function onMenuItemClick(val) {
  emit('overflow-menu-click', val);
}
function onSearch() {
  clearSearchVisible.value = searchValue.value.length > 0;
  emit('search', searchValue.value);
}
function onSort(heading, val) {
  const headings = store.headings(uid);
  let index;
  for (let colIndex in headings) {
    const column = headings[colIndex];
    if (column.id === heading.id) {
      store.updateHeading(uid, { ...column, order: val });
      index = colIndex;
    } else {
      store.updateHeading(uid, { ...column, order: 'none' });
    }
  }
  emit('sort', { index, order: val, name: heading.name });
}

// are all rows expanded
const dataExpandAll = computed(() => {
  return store.allExpandedRows(uid);
});
function toggleExpandAll() {
  const toggle = !dataExpandAll.value;
  const rows = store.rows(uid);
  for (const row of rows) {
    store.updateRow(uid, { ...row, isExpanded: toggle });
  }
}

/**
 * A child row is changed
 * @param {{kind:string, uid:string, value:string, isExpanded:boolean}} row
 */
function onCvExpandedChange(row) {
  emit('row-expanded', row);
}
</script>
