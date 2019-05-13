<template>
  <tbody v-if="someExpandingRows" class="cv-data-table-row cv-data-table-row--expandable">
    <cv-data-table-row-inner
      ref="row"
      v-bind="$attrs"
      v-on="$listeners"
      :expanding-row="dataExpandable"
      some-expanding-rows
    >
      <slot />
    </cv-data-table-row-inner>
    <tr v-if="dataExpandable" class="bx--expandable-row bx--expandable-row--hidden" data-child-row>
      <td colspan="9999">
        <div class="bx--child-row-inner-container">
          <slot name="expandedContent" />
        </div>
      </td>
    </tr>
  </tbody>
  <cv-data-table-row-inner v-else ref="row" v-bind="$attrs" v-on="$listeners" class="cv-data-table-row">
    <slot />
  </cv-data-table-row-inner>
</template>

<script>
import CvDataTableRowInner from './_cv-data-table-row-inner';

export default {
  name: 'CvDataTableRow',
  components: { CvDataTableRowInner },
  data() {
    return {
      dataExpandable: this.$slots.expandedContent !== undefined,
      dataSomeExpandingRows: false,
    };
  },
  mounted() {
    this.$parent.$emit('cv:mounted', this);
  },
  updated() {
    this.dataExpandable = this.$slots.expandedContent !== undefined;
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
  computed: {
    expandable() {
      return this.dataExpandable;
    },
    isCvDataTableRow() {
      return true;
    },
    isChecked: {
      get() {
        return this.$refs.row.dataChecked;
      },
      set(val) {
        this.$refs.row.dataChecked = val;
      },
    },
    someExpandingRows: {
      get() {
        return this.dataSomeExpandingRows;
      },
      set(val) {
        this.dataSomeExpandingRows = val;

        if (this.$refs.row) {
          this.$refs.row.dataSomeExpandingRows = val;
        }
      },
    },
    value() {
      return this.$refs.row.value;
    },
  },
};
</script>
