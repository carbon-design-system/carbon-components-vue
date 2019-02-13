<template>
  <div :style="tableStyle">
    <div class="bx--data-table-v2-container">
      <h4 class="bx--data-table-v2-header" v-if="title">{{ title }}</h4>

      <section class="bx--table-toolbar">
        <slot name="header" />
      </section>

      <table class="bx--data-table-v2" :class="modifierClasses">
        <thead>
          <tr>
            <cv-data-table-headnig
              v-for="(column, index) in dataColumns"
              :key="`${index}:${column}`"
              :heading="column.label ? column.label : column"
              :sortable="sortable"
              :order="column.order"
              @sort="val => onSort(index, val)"
              :style="headingStyle(index)"
            />
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="`row:${rowIndex}`">
            <td
              v-for="(cell, colIndex) in row"
              :key="`cell:${colIndex}:${rowIndex}`"
              :style="dataStyle(colIndex)"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <slot name="footer" />
  </div>
</template>

<script>
import CvDataTableHeadnig from './_cv-data-table-heading';

export default {
  name: 'CvDataTable',
  components: {
    CvDataTableHeadnig,
  },
  props: {
    autoWidth: Boolean,
    borderless: Boolean,
    rowSize: {
      type: String,
      default: 'standard',
      validator: val =>
        ['compact', 'short', 'standard', 'tall', ''].includes(val),
    },
    sortable: Boolean,
    title: String,
    columns: { type: Array, required: true },
    data: { type: Array, requried: true },
    zebra: Boolean,
  },
  data() {
    return {
      dataColumns: this.sortable
        ? this.columns.map(item => ({
            label: item,
            order: 'none',
          }))
        : this.columns,
    };
  },
  watch: {
    sortable() {
      this.watchColumns();
    },
    columns() {
      this.watchColumns();
    },
  },
  mounted() {
    console.warn('CvDataTable - Under construction, API will change.');
  },
  computed: {
    rows() {
      return this.data;
    },
    tableStyle() {
      return this.autoWidth ? { width: 'initial' } : { width: '100%' };
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
  },
  methods: {
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
