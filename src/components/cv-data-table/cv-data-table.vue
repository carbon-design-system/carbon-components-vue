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
              v-for="(heading, index) in dataHeadings"
              :key="`${index}:${heading}`"
              :heading="heading.label ? heading.label : heading"
              :sortable="sortable"
              :order="heading.order"
              @sort="val => onSort(index, val)"
            />
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="`row:${rowIndex}`">
            <td
              v-for="(cell, colIndex) in row"
              :key="`cell:${colIndex}:${rowIndex}`"
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
    headings: { type: Array, required: true },
    data: { type: Array, requried: true },
    zebra: Boolean,
  },
  data() {
    return {
      dataHeadings: this.sortable
        ? this.headings.map(item => ({
            label: item,
            order: 'none',
          }))
        : this.headings,
    };
  },
  watch: {
    sortable() {
      this.watchHeadings();
    },
    headings() {
      this.watchHeadings();
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
  },
  methods: {
    watchHeadings() {
      this.dataHeadings = this.sortable
        ? this.headings.map(item => ({
            label: item,
            order: 'none',
          }))
        : this.headings;
    },
    onSort(index, val) {
      for (let heading of this.dataHeadings) {
        heading.order = 'none';
      }
      this.dataHeadings[index].order = val;
      this.$emit('sort', { index, order: val });
    },
  },
};
</script>
