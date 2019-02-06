<template>
  <table class="bx--data-table-v2" :class="modifierClasses">
    <thead>
      <tr>
        <th v-for="(heading, index) in headings" :key="`${index}:${heading}`">
          <span class="bx--table-header-label">{{ heading }}</span>
        </th>
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
</template>

<script>
export default {
  name: 'CvDataTable',
  props: {
    tableData: { type: Array, requried: true },
    rowSize: {
      type: String,
      default: 'standard',
      validator: val =>
        ['compact', 'short', 'standard', 'tall', ''].includes(val),
    },
    zebra: Boolean,
  },
  mounted() {
    console.warn('CvDataTable - Under construction, API will change.');
  },
  computed: {
    headings() {
      return this.tableData[0];
    },
    rows() {
      return this.tableData.filter((item, index) => index > 0);
    },
    modifierClasses() {
      const sizeClass =
        this.rowSize.length === 0 || this.rowSize === 'standard'
          ? ''
          : `bx--data-table-v2--${this.rowSize} `;
      const zebraClass = this.zebra ? 'bx--data-table-v2--zebra ' : '';
      return `${sizeClass}${zebraClass}`.trimRight();
    },
  },
};
</script>
