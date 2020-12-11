<template>
  <div :style="tableStyle" class="cv-data-table">
    <div :class="`${carbonPrefix}--data-table-container`">
      <div v-if="hasTableHeader" :class="`${carbonPrefix}--data-table-header`">
        <h4 :class="`${carbonPrefix}--data-table-header__title`" v-if="title">{{ title }}</h4>
        <p v-if="isHelper" :class="`${carbonPrefix}--data-table-header__description`">
          <slot name="helper-text">{{ helperText }}</slot>
        </p>
      </div>

      <section v-if="hasToolbar" :class="`${carbonPrefix}--table-toolbar`">
        <div
          v-show="hasBatchActions"
          :class="[`${carbonPrefix}--batch-actions`, { [`${carbonPrefix}--batch-actions--active`]: batchActive }]"
          :aria-label="actionBarAriaLabel"
        >
          <div :class="`${carbonPrefix}--action-list`">
            <slot name="batch-actions" />
            <cv-button :class="`${carbonPrefix}--batch-summary__cancel`" size="small" @click="deselect">{{
              batchCancelLabel
            }}</cv-button>
          </div>
          <div :class="`${carbonPrefix}--batch-summary`">
            <p :class="`${carbonPrefix}--batch-summary__para`">
              <span data-items-selected>
                <slot name="items-selected" v-bind:scope="{ count: dataRowsSelected.length }"
                  >{{ dataRowsSelected.length }} items selected</slot
                >
              </span>
            </p>
          </div>
        </div>

        <div :class="`${carbonPrefix}--toolbar-content`">
          <div
            v-if="$listeners.search"
            :class="{
              [`${carbonPrefix}--toolbar-search-container-active`]: searchActive || searchValue.length > 0,
              [`${carbonPrefix}--toolbar-search-container-persistent`]: !expandingSearch,
              [`${carbonPrefix}--toolbar-search-container-expandable`]: expandingSearch,
            }"
            ref="searchContainer"
          >
            <div data-search :class="`${carbonPrefix}--search ${carbonPrefix}--search--sm`" role="search">
              <div
                :class="`${carbonPrefix}--search-magnifier`"
                tabindex="0"
                @click="checkSearchExpand(true)"
                @keydown.enter.prevent="checkSearchExpand(true)"
                @keydown.space.prevent
                @keyup.space.prevent="checkSearchExpand(true)"
                ref="magnifier"
              >
                <Search16 :class="`${carbonPrefix}--toolbar-action__icon`" />
              </div>
              <label :for="uid" :class="`${carbonPrefix}--label`">{{ searchLabel }}</label>
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
                @keydown.esc.prevent="checkSearchExpand(false)"
              />
              <button
                :class="[
                  `${carbonPrefix}--search-close`,
                  { [`${carbonPrefix}--search-close--hidden`]: !clearSearchVisible },
                ]"
                :title="searchClearLabel"
                :aria-label="searchClearLabel"
                @click="onClearClick"
                type="button"
              >
                <Close16 />
              </button>
            </div>
          </div>
          <slot name="actions" />
        </div>
      </section>

      <table
        :class="[
          `${carbonPrefix}--data-table`,
          {
            [`${carbonPrefix}--data-table--${rowSize} `]: !(rowSize.length === 0 || rowSize === 'standard'),
            [`${carbonPrefix}--data-table--zebra `]: zebra,
            [`${carbonPrefix}--data-table--no-border `]: borderless,
            [`${carbonPrefix}--skeleton `]: skeleton,
            [`${carbonPrefix}--data-table--sort `]: isSortable,
          },
        ]"
      >
        <thead>
          <tr>
            <th
              v-if="hasExpandables"
              :class="`${carbonPrefix}--table-expand`"
              :data-previous-value="dataExpandAll ? 'collapsed' : 'expanded'"
            >
              <button
                v-if="hasExpandAll"
                :class="`${carbonPrefix}--table-expand__button`"
                @click="toggleExpandAll"
                type="button"
                :aria-label="dataExpandAll ? collapseAllAriaLabel : expandAllAriaLabel"
              >
                <ChevronRight16 :class="`${carbonPrefix}--table-expand__svg`" />
              </button>
            </th>
            <th v-if="hasBatchActions" :class="`${carbonPrefix}--table-column-checkbox`">
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

        <cv-wrapper :tag-type="hasExpandables ? '' : 'tbody'">
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
                <cv-wrapper :tag-type="skeleton ? 'span' : ''">{{ cell }}</cv-wrapper>
              </cv-data-table-cell>
            </cv-data-table-row>
          </slot>
        </cv-wrapper>
      </table>
    </div>
    <cv-pagination
      v-if="pagination"
      v-bind="internalPagination"
      :number-of-items="internalNumberOfItems"
      :actual-items-on-page="this.registeredRows.length"
      @change="$emit('pagination', $event)"
    >
      <template v-slot:range-text="{ scope }">
        <slot name="range-text" v-bind:scope="scope" v-if="$scopedSlots['range-text']" />
      </template>

      <template v-slot:of-n-pages="{ scope }">
        <slot name="of-n-pages" v-bind:scope="scope" v-if="$scopedSlots['of-n-pages']"></slot>
      </template>
    </cv-pagination>
  </div>
</template>

<script>
import CvDataTableHeading from './cv-data-table-heading';
import CvDataTableRow from './cv-data-table-row';
import CvDataTableCell from './cv-data-table-cell';
import CvButton from '../cv-button/cv-button';
import CvCheckbox from '../cv-checkbox/cv-checkbox';
import CvPagination from '../cv-pagination/cv-pagination';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import { uidMixin, carbonPrefixMixin } from '../../mixins';
import Search16 from '@carbon/icons-vue/es/search/16';
import Close16 from '@carbon/icons-vue/es/close/16';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
export default {
  name: 'CvDataTable',
  components: {
    CvButton,
    CvDataTableHeading,
    CvDataTableRow,
    CvDataTableCell,
    CvCheckbox,
    CvPagination,
    CvWrapper,
    Search16,
    Close16,
    ChevronRight16,
  },
  mixins: [uidMixin, carbonPrefixMixin],
  props: {
    actionBarAriaLabel: { type: String, default: 'Table Action Bar' },
    collapseAllAriaLabel: { type: String, default: 'Collapse all rows' },
    expandAllAriaLabel: { type: String, default: 'Expand all rows' },
    selectAllAriaLabel: { type: String, default: 'Select all rows' },
    autoWidth: Boolean,
    batchCancelLabel: { type: String, default: 'cancel' },
    borderless: Boolean,
    overflowMenu: { type: [Boolean, Array], default: () => [] },
    pagination: {
      type: [Boolean, Object],
      default: false,
    },
    rowSize: {
      type: String,
      default: 'standard',
      validator: val => ['compact', 'short', 'standard', 'tall', ''].includes(val),
    },
    searchLabel: { type: String, default: 'Search' },
    searchPlaceholder: { type: String, default: 'Search' },
    searchClearLabel: { type: String, default: 'Clear search' },
    sortable: Boolean,
    title: String,
    columns: Array,
    data: Array,
    zebra: Boolean,
    rowsSelected: { type: Array, default: () => [] },
    helperText: { type: String, default: undefined },
    expandingSearch: { type: Boolean, default: true },
    skeleton: Boolean,
    hasExpandAll: Boolean,
  },
  model: {
    prop: 'rows-selected',
    event: 'row-select-changes',
  },
  data() {
    return {
      hasBatchActions: false,
      hasActions: false,
      hasToolbar: false,
      isHelper: false,
      batchActive: false,
      headingChecked: false,
      dataRowsSelected: this.rowsSelected,
      searchValue: '',
      clearSearchVisible: false,
      searchActive: false,
      registeredRows: [],
      registeredHeadings: [],
      dataExpandAll: false,
    };
  },
  watch: {
    rowsSelected() {
      this.updateRowsSelected();
    },
  },
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
    this.$on('cv:sort', (srcComponent, value) => this.onSort(srcComponent, value));
  },
  mounted() {
    if (this.$refs.searchContainer) {
      this.$refs.magnifier.addEventListener('blur', this.checkSearchFocus);
      this.$refs.search.addEventListener('blur', this.checkSearchFocus);
    }
    this.updateRowsSelected();
    this.checkSlots();
  },
  beforeDestroy() {
    if (this.$refs.searchContainer) {
      this.$refs.magnifier.removeEventListener('blur', this.checkSearchFocus);
      this.$refs.search.removeEventListener('blur', this.checkSearchFocus);
    }
  },
  updated() {
    this.checkSlots();
  },
  computed: {
    columnHeading() {
      return col => {
        if (typeof col === 'object') {
          return col.label || '';
        } else {
          return col;
        }
      };
    },
    isSortable() {
      // is any column sortable
      return this.sortable || this.registeredHeadings.some(column => column.sortable);
    },
    isColSortable() {
      return col => {
        // is specific column or all sortable
        return (col && col.sortable) || this.sortable;
      };
    },
    hasTableHeader() {
      return this.title || this.isHelper;
    },

    hasExpandables() {
      return this.registeredRows.some(item => item.expandable);
    },
    hasOverflowMenu() {
      return this.overflowMenu === true || (this.overflowMenu && this.overflowMenu.length > 0);
    },
    tableStyle() {
      return this.autoWidth ? { width: 'initial', display: 'inline-block' } : { width: '100%' };
    },
    internalPagination() {
      if (typeof this.pagination === 'object') {
        return this.pagination;
      } else {
        if (this.pagination === true) {
          return {};
        }
      }
      return false;
    },
    internalNumberOfItems() {
      if (this.internalPagination.numberOfItems !== undefined) {
        return this.internalPagination.numberOfItems;
      } else {
        return this.registeredRows.length;
      }
    },
    headingStyle() {
      return col => (typeof col === 'object' ? col.headingStyle : {});
    },
    dataStyle() {
      return index => (this.columns && this.columns[index] && this.columns[index].dataStyle) || {};
    },
    selectedRows() {
      return this.dataRowsSelected;
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.hasBatchActions = !!this.$slots['batch-actions'];
      this.hasActions = !!this.$slots.actions;
      this.hasToolbar = !!(this.$slots.actions || this.$listeners.search || this.$slots['batch-actions']);
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    onCvMount(thing) {
      if (thing.$_CvDataTableHeading) {
        this.registeredHeadings = this.$children.filter(item => item.$_CvDataTableHeading);
        const heading = thing;
        if (this.registeredHeadings.filter(item => item.uid === heading.uid).length > 1) {
          console.error(
            `CvDataTable: Duplicate ID specified for CvDataTableHeading, this may cause issues. {id: ${heading.id}}`
          );
        }
      } else {
        const row = thing;
        this.registeredRows.push(row);
        if (this.registeredRows.filter(item => item.uid === row.uid).length > 1) {
          console.error(
            `CvDataTable: Duplicate ID specified for CvDataTableRow, this may cause issues. {id: ${row.id}, value: ${row.value}}`
          );
        }
        row.$on('cv:expanded-change', this.onCvExpandedChange);
        this.updateSomeExpandingRows();
      }
    },
    onCvBeforeDestroy(thing) {
      if (thing.$_CvDataTableHeading) {
        this.registeredHeadings = this.$children.filter(item => item.$_CvDataTableHeading);
      } else {
        const row = thing;
        const index = this.registeredRows.findIndex(item => row.uid === item.uid);
        this.registeredRows.splice(index, 1);
        this.updateSomeExpandingRows();
      }
    },
    checkSearchFocus(ev) {
      if (!this.$refs.searchContainer.contains(ev.relatedTarget)) {
        this.searchActive = false;
      }
    },
    checkSearchExpand(force) {
      if (typeof force === 'boolean') {
        this.searchActive = force;
      } else {
        this.searchActive = !this.searchActive;
      }
      if (this.searchActive) {
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      } else {
        this.$nextTick(() => {
          this.$refs.magnifier.focus();
        });
      }
    },
    updateRowsSelected() {
      this.dataRowsSelected = [];
      for (const i in this.registeredRows) {
        let child = this.registeredRows[i];
        if (child.isCvDataTableRow) {
          child.isChecked = this.rowsSelected.includes(child.value);

          if (child.isChecked) {
            this.dataRowsSelected.push(child.value);
          }
        }
      }
      this.headingChecked =
        this.dataRowsSelected.length === this.registeredRows.filter(item => item.isCvDataTableRow).length;
      this.batchActive = this.dataRowsSelected.length > 0;
    },
    onClearClick() {
      this.searchValue = '';
      this.clearSearchVisible = false;
      this.$emit('search', this.searchValue);
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    onHeadingCheckChange() {
      // check /uncheck all children
      this.batchActive = this.headingChecked;
      this.dataRowsSelected = [];
      for (const child of this.registeredRows) {
        if (this.headingChecked) {
          this.dataRowsSelected.push(child.value);
        }

        if (child.isChecked !== this.headingChecked) {
          child.isChecked = this.headingChecked;

          this.$emit('row-select-change', {
            value: child.value,
            selected: child.isChecked,
          });
        }
      }
      this.$emit('row-select-changes', this.dataRowsSelected);
    },
    deselect() {
      this.headingChecked = false;
      this.onHeadingCheckChange();
    },
    onRowCheckChange(value, checked) {
      let modelSet = new Set(this.dataRowsSelected);

      if (!checked) {
        modelSet.delete(value);
      } else {
        modelSet.add(value);
      }
      this.dataRowsSelected = Array.from(modelSet);
      this.headingChecked = this.dataRowsSelected.length === this.registeredRows.length;
      this.batchActive = this.dataRowsSelected.length > 0;

      this.$emit('row-select-change', { value, selected: checked });
      this.$emit('row-select-changes', this.dataRowsSelected);
    },
    onMenuItemClick(val) {
      this.$emit('overflow-menu-click', val);
    },
    onSearch() {
      this.clearSearchVisible = this.searchValue.length > 0;
      this.$emit('search', this.searchValue);
    },
    onSort(srcComponent, val) {
      let index;
      for (let colIndex in this.registeredHeadings) {
        const column = this.registeredHeadings[colIndex];
        if (column.uid === srcComponent.uid) {
          column.internalOrder = val;
          index = colIndex;
        } else {
          column.internalOrder = 'none';
        }
      }
      this.$emit('sort', { index, order: val });
    },
    updateSomeExpandingRows() {
      for (const child of this.registeredRows) {
        child.someExpandingRows = this.hasExpandables;
      }
    },
    toggleExpandAll() {
      this.dataExpandAll = !this.dataExpandAll;
      for (const row of this.registeredRows) {
        row.isExpanded = this.dataExpandAll;
      }
    },
    onCvExpandedChange(row) {
      if (row.isExpanded) {
        // are all rows expanded
        this.dataExpandAll = this.registeredRows.every(item => item.isExpanded);
      } else {
        this.dataExpandAll = false;
      }
    },
  },
};
</script>
