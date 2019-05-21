<template>
  <div :style="tableStyle" class="cv-data-table">
    <div class="bx--data-table-container">
      <div class="bx--data-table-header">
        <h4 class="bx--data-table-header__title" v-if="title">{{ title }}</h4>
        <p v-if="isHelper" class="bx--data-table-header__description">
          <slot name="helper-text">{{ helperText }}</slot>
        </p>
      </div>

      <section class="bx--table-toolbar">
        <div v-if="batchActive" :style="{ minHeight: '48px', maxWidth: '0' }" />

        <div
          v-if="hasBatchActions"
          class="bx--batch-actions"
          :class="{ 'bx--batch-actions--active': batchActive }"
          aria-label="Table Action Bar"
        >
          <div class="bx--action-list">
            <slot name="batch-actions" />
            <cv-button class="bx--batch-summary__cancel" small @click="deselect">Cancel</cv-button>
          </div>
          <div class="bx--batch-summary">
            <p class="bx--batch-summary__para">
              <span data-items-selected>{{ dataRowsSelected.length }}</span>
              items selected
            </p>
          </div>
        </div>

        <div v-if="($slots.actions || $listeners.search) && !batchActive" class="bx--toolbar-content">
          <div
            v-if="$listeners.search"
            :class="{
              'bx--toolbar-search-container-active': searchActive,
              'bx--toolbar-search-container-persistent': !expandingSearch,
              'bx--toolbar-search-container-expandable': expandingSearch,
            }"
            ref="searchContainer"
          >
            <div data-search class="bx--search bx--search--sm" role="search">
              <div
                class="bx--search-magnifier"
                tabindex="0"
                @click="checkSearchExpand(true)"
                @keydown.enter.prevent="checkSearchExpand(true)"
                @keydown.space.prevent
                @keyup.space.prevent="checkSearchExpand(true)"
                @blur="checkSearchFocus"
                ref="magnifier"
              >
                <Search16 class="bx--toolbar-action__icon" />
              </div>
              <label :for="uid" class="bx--label">Search</label>
              <input
                class="bx--search-input"
                type="text"
                :id="uid"
                role="search"
                placeholder="Search"
                :aria-labelledby="uid"
                ref="search"
                v-model="searchValue"
                @input="onSearch"
                @blur="checkSearchFocus"
                @keydown.esc.prevent="checkSearchExpand(false)"
              />
              <button
                class="bx--search-close"
                :class="{ 'bx--search-close--hidden': !clearSearchVisible }"
                title="Clear search input"
                aria-label="Clear search input"
                @click="onClearClick"
              >
                <Close16 />
              </button>
            </div>
          </div>
          <slot name="actions" />
        </div>
      </section>

      <table class="bx--data-table" :class="modifierClasses">
        <thead>
          <tr>
            <th v-if="hasExpandables" class="bx--table-expand" />
            <th v-if="hasBatchActions" class="bx--table-column-checkbox">
              <cv-checkbox
                :form-item="false"
                value="headingCheck"
                v-model="headingChecked"
                @change="onHeadingCheckChange"
              />
            </th>
            <cv-data-table-heading
              v-for="(column, index) in dataColumns"
              :key="`${index}:${column}`"
              :heading="column.label ? column.label : column"
              :sortable="sortable"
              :order="column.order"
              @sort="val => onSort(index, val)"
              :style="headingStyle(index)"
            />
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
                >{{ cell }}</cv-data-table-cell
              >
            </cv-data-table-row>
          </slot>
        </cv-wrapper>
      </table>
    </div>

    <cv-pagination
      v-if="pagination"
      :backward-text="pagination.backwardText"
      :forward-text="pagination.forwardText"
      :number-of-items="internalNumberOfItems"
      :page="pagination.page"
      :page-number-label="pagination.pageNumberLabel"
      :page-sizes-label="pagination.pageSizesLabel"
      :page-sizes="pagination.pageSizes"
      @change="$emit('pagination', $event)"
    ></cv-pagination>
  </div>
</template>

<script>
import CvDataTableHeading from './_cv-data-table-heading';
import CvDataTableRow from './cv-data-table-row';
import CvDataTableCell from './cv-data-table-cell';
import CvButton from '../cv-button/cv-button';
import CvCheckbox from '../cv-checkbox/cv-checkbox';
import CvPagination from '../cv-pagination/cv-pagination';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import uidMixin from '../../mixins/uid-mixin';
import Search16 from '@carbon/icons-vue/es/search/16';
import Close16 from '@carbon/icons-vue/es/close/16';

const rows = children => children.filter(child => child.isCvDataTableRow);

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
  },
  mixins: [uidMixin],
  props: {
    autoWidth: Boolean,
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
    searchPlaceholder: { type: String, default: 'filter' },
    sortable: Boolean,
    title: String,
    columns: { type: Array, required: true },
    data: { type: Array, requried: true },
    zebra: Boolean,
    rowsSelected: { type: Array, default: () => [] },
    helperText: { type: String, default: null },
    expandingSearch: { type: Boolean, default: true },
  },
  model: {
    prop: 'rows-selected',
    event: 'row-select-changes',
  },
  data() {
    return {
      dataColumns: this.sortable
        ? this.columns.map(item => ({
            label: item.label ? item.label : item,
            order: 'none',
          }))
        : this.columns,
      batchActive: false,
      headingChecked: false,
      dataRowsSelected: this.rowsSelected,
      searchValue: '',
      clearSearchVisible: false,
      searchActive: false,
      registeredRows: [],
    };
  },
  watch: {
    sortable() {
      this.watchColumns();
    },
    columns() {
      this.watchColumns();
    },
    rowsSelected() {
      this.updateRowsSelected();
    },
  },
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
  },
  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );
    this.updateRowsSelected();
  },
  computed: {
    hasBatchActions() {
      return this.$slots['batch-actions'];
    },
    hasExpandables() {
      return this.registeredRows.some(item => item.expandable);
    },
    hasOverflowMenu() {
      return this.overflowMenu === true || (this.overflowMenu && this.overflowMenu.length > 0);
    },
    tableStyle() {
      return this.autoWidth ? { width: 'initial' } : { width: '100%' };
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
    modifierClasses() {
      const prefix = 'bx--data-table--';
      const sizeClass = this.rowSize.length === 0 || this.rowSize === 'standard' ? '' : `${prefix}${this.rowSize} `;
      const zebraClass = this.zebra ? `${prefix}zebra ` : '';
      const borderlessClass = this.borderless ? `${prefix}no-border ` : '';
      return `${sizeClass}${zebraClass}${borderlessClass}`.trimRight();
    },
    headingStyle() {
      return index => this.columns[index].headingStyle;
    },
    dataStyle() {
      return index => this.columns[index].dataStyle;
    },
    selectedRows() {
      return this.dataRowsSelected;
    },
    isHelper() {
      return this.$slots['helper-text'] !== undefined || (this.helperText && this.helperText.length);
    },
  },
  methods: {
    onCvMount(row) {
      this.registeredRows.push(row);
      this.updateSomeExpandingRows();
    },
    onCvBeforeDestroy(row) {
      const index = this.registeredRows.findIndex(item => row.uid === item.uid);
      this.registeredRows.slice(index, 1);
      this.updateSomeExpandingRows();
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
      for (const i in this.$children) {
        let child = this.$children[i];
        if (child.isCvDataTableRow) {
          child.isChecked = this.rowsSelected.includes(child.value);

          if (child.isChecked) {
            this.dataRowsSelected.push(child.value);
          }
        }
      }
      this.headingChecked =
        this.dataRowsSelected.length === this.$children.filter(item => item.isCvDataTableRow).length;
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
      for (const child of rows(this.$children)) {
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
      this.headingChecked = this.dataRowsSelected.length === rows(this.$children).length;
      this.batchActive = this.dataRowsSelected.length > 0;

      this.$emit('row-select-change', { value, selected: checked });
      this.$emit('row-select-changes', this.dataRowsSelected);
    },
    onMenuItemClick(val) {
      this.$emit('overflow-menu-click', val);
    },
    watchColumns() {
      this.dataColumns = this.sortable
        ? this.columns.map(item => ({
            label: item.label ? item.label : item,
            order: 'none',
          }))
        : this.columns;
    },
    onSearch() {
      this.clearSearchVisible = this.searchValue.length > 0;
      this.$emit('search', this.searchValue);
    },
    onSort(index, val) {
      for (let column of this.dataColumns) {
        column.order = 'none';
      }
      this.dataColumns[index].order = val;
      this.$emit('sort', { index, order: val });
    },
    updateSomeExpandingRows() {
      for (const child of rows(this.$children)) {
        child.someExpandingRows = this.hasExpandables;
      }
    },
  },
};
</script>

<style lang="scss">
.cv-data-table .bx--table-column-checkbox .bx--checkbox-wrapper {
  margin: 0;
}
</style>
