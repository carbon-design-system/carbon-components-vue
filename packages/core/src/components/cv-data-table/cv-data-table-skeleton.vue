<template>
  <cv-data-table skeleton :data="data" :columns="cols" v-on="$listeners" v-bind="$attrs">
    <template v-if="hasBatchActions" slot="helper-text">
      <slot name="helper-text" />
    </template>

    <template v-if="hasBatchActions" slot="batch-actions">
      <slot name="batch-actions" />
    </template>

    <template v-if="hasActions" slot="actions">
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
  data() {
    return {
      hasActions: false,
      hasHelperText: false,
      hasBatchActions: false,
    };
  },
  mounted() {
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
  },
  computed: {
    data() {
      return [...Array(Math.max(this.rows, 1))].map(() => Array(this.cols.length).fill(''));
    },
    cols() {
      return typeof this.columns !== 'number' ? this.columns : Array(Math.max(this.columns, 1)).fill('');
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.hasBatchActions = !!this.$slots['batch-actions'];
      this.hasHelperText = !!this.$slots['helper-text'];
      this.hasActions = !!this.$slots['actions'];
    },
  },
};
</script>
