<template>
  <div :style="tableStyle">
    <div class="bx--data-table-v2-container">
      <h4 class="bx--data-table-v2-header" v-if="title">{{ title }}</h4>

      <section class="bx--table-toolbar">
        <div v-if="batchActive" style="min-height: 32px; max-width: 0;" />
        <div
          v-if="hasBatchActions"
          class="bx--batch-actions"
          :class="{ 'bx--batch-actions--active': batchActive }"
          aria-label="Table Action Bar"
        >
          <div class="bx--action-list">
            <slot name="batch-actions" />
          </div>
          <div class="bx--batch-summary">
            <p class="bx--batch-summary__para">
              <span data-items-selected>{{ dataRowsSelected.length }}</span>
              items selected
            </p>
            <button class="bx--batch-summary__cancel" @click="deselect">
              Cancel
            </button>
          </div>
        </div>

        <div v-if="$listeners.search" class="bx--toolbar-search-container">
          <cv-search
            :disabled="batchActive"
            theme="light"
            small
            :form-item="false"
            :placeholder="searchPlaceholder"
            @input="$emit('search', $event)"
          />
        </div>
        <div v-if="$slots.actions && !batchActive" class="bx--toolbar-content">
          <slot name="actions" />
        </div>
      </section>

      <table class="bx--data-table-v2" :class="modifierClasses">
        <thead>
          <tr>
            <th v-if="hasBatchActions">
              <cv-checkbox
                :form-item="false"
                value="headingCheck"
                v-model="headingChecked"
                @change="onHeadingCheckChange"
              />
            </th>
            <cv-data-table-headnig
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

        <tbody>
          <slot name="data">
            <cv-data-table-row
              v-for="(row, rowIndex) in data"
              :key="`row:${rowIndex}`"
              :value="`${rowIndex}`"
              ref="dataRowsSelected"
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
        </tbody>
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
import CvDataTableHeadnig from './_cv-data-table-heading';
import CvDataTableRow from './cv-data-table-row';
import CvDataTableCell from './cv-data-table-cell';

const rows = children => children.filter(child => child.isCvDataTableRow);

export default {
  name: 'CvDataTable',
  components: {
    CvDataTableHeadnig,
    CvDataTableRow,
    CvDataTableCell,
  },
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
      validator: val =>
        ['compact', 'short', 'standard', 'tall', ''].includes(val),
    },
    searchPlaceholder: { type: String, default: 'filter' },
    sortable: Boolean,
    title: String,
    columns: { type: Array, required: true },
    data: { type: Array, requried: true },
    zebra: Boolean,
    rowsSelected: { type: Array, default: () => [] },
  },
  model: {
    prop: 'rows-selected',
    event: 'row-select-changes',
  },
  data() {
    return {
      dataColumns: this.sortable
        ? this.columns.map(item => ({
            label: item,
            order: 'none',
          }))
        : this.columns,
      batchActive: false,
      headingChecked: false,
      dataRowsSelected: this.rowsSelected,
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
    hasOverflowMenu() {
      return (
        this.overflowMenu === true ||
        (this.overflowMenu && this.overflowMenu.length > 0)
      );
    },
    tableStyle() {
      return this.autoWidth ? { width: 'initial' } : { width: '100%' };
    },
    internalPangination() {
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
      if (
        this.internalPagination &&
        typeof this.internalPagination.numberOfItems === 'number'
      ) {
        return Math.min(
          this.internalPagination.numberOfItems,
          rows(this.$children).length
        );
      } else {
        return rows(this.$children).length;
      }
    },
    modifierClasses() {
      const prefix = 'bx--data-table-v2--';
      const sizeClass =
        this.rowSize.length === 0 || this.rowSize === 'standard'
          ? ''
          : `${prefix}${this.rowSize} `;
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
  },
  methods: {
    updateRowsSelected() {
      this.dataRowsSelected = [];
      for (const i in this.$children) {
        let child = this.$children[i];
        if (child.isCvDataTableRow) {
          child.dataChecked = this.rowsSelected.includes(child.value);

          if (child.dataChecked) {
            this.dataRowsSelected.push(child.value);
          }
        }
      }
      this.headingChecked =
        this.dataRowsSelected.length ===
        this.$children.filter(item => item.isCvDataTableRow).length;
      this.batchActive = this.dataRowsSelected.length > 0;
    },
    onHeadingCheckChange() {
      // check /uncheck all children
      this.batchActive = this.headingChecked;
      this.dataRowsSelected = [];
      for (const child of rows(this.$children)) {
        if (this.headingChecked) {
          this.dataRowsSelected.push(child.value);
        }

        if (child.dataChecked !== this.headingChecked) {
          child.dataChecked = this.headingChecked;

          this.$emit('row-select-change', {
            value: child.value,
            selected: child.dataChecked,
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
      this.headingChecked =
        this.dataRowsSelected.length === rows(this.$children).length;
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
    onSort(index, val) {
      for (let column of this.dataColumns) {
        column.order = 'none';
      }
      this.dataColumns[index].order = val;
      this.$emit('sort', { index, order: val });
    },
  },
};
</script>
