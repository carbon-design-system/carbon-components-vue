<template>
  <div :style="tableStyle">
    <div class="bx--data-table-v2-container">
      <h4 class="bx--data-table-v2-header" v-if="title">{{ title }}</h4>

      <section class="bx--table-toolbar">
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
              <span data-items-selected>{{ rowChecks.length }}</span> items
              selected
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
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="`row:${rowIndex}`">
            <td v-if="hasBatchActions">
              <cv-checkbox
                :form-item="false"
                :value="`${rowIndex}`"
                v-model="rowChecks"
                @change="onRowCheckChange"
                ref="rowChecks"
              />
            </td>
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
    searchPlaceholder: { type: String, default: 'filter' },
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
      batchActive: false,
      headingChecked: false,
      rowChecks: [],
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
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );
  },
  computed: {
    hasBatchActions() {
      return this.$slots['batch-actions'];
    },
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
    selectedRows() {
      return this.rowChecks.map(val => parseInt(val));
    },
  },
  methods: {
    onHeadingCheckChange() {
      // check /uncheck all children
      this.batchActive = this.headingChecked;
      this.rowChecks = [];
      if (this.headingChecked) {
        for (const i in this.$refs.rowChecks) {
          this.rowChecks.push(this.$refs.rowChecks[i].value);
        }
      }
    },
    deselect() {
      this.headingChecked = false;
      this.onHeadingCheckChange();
    },
    onRowCheckChange() {
      this.headingChecked = this.rowChecks.length === this.data.length;
      this.batchActive = this.rowChecks.length > 0;
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
