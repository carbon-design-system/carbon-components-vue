<template>
  <cv-data-table skeleton :data="data" :columns="cols" v-on="$listeners" v-bind="$attrs">
    <template v-if="$slots['helper-text']" slot="helper-text">
      <slot name="helper-text" />
    </template>

    <template v-if="$slots['batch-actions']" slot="batch-actions">
      <slot name="batch-actions" />
    </template>

    <template v-if="$slots.actions" slot="actions">
      <slot name="actions" />
    </template>
  </cv-data-table>
</template>

<script>
import CvDataTable from './cv-data-table';

const DEFAULTS = {
  COLS: 5,
  ROWS: 5,
};

export default {
  name: 'CvDataTableSkeleton',
  components: {
    CvDataTable,
  },
  props: {
    columns: { type: [Array, Number], default: DEFAULTS.COLS },
    hasExpandables: Boolean,
    rows: { type: Number, default: DEFAULTS.ROWS },
  },
  computed: {
    data() {
      return [...Array(Math.max(this.rows, 1))].map(item => Array(this.cols.length).fill(''));
    },
    cols() {
      return typeof this.columns !== 'number' ? this.columns : Array(Math.max(this.columns, 1)).fill('');
    },
  },
};
</script>

<style lang="scss">
// .cv-data-table .bx--table-column-checkbox .bx--checkbox-wrapper {
//   margin: 0;
// }
</style>
