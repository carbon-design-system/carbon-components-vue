<template>
  <tbody v-if="someExpandingRows" class="cv-data-table-row cv-data-table-row--expandable">
    <cv-data-table-row-inner
      ref="row"
      v-bind="$attrs"
      v-on="$listeners"
      :expanding-row="dataExpandable"
      some-expanding-rows
      @expanded-change="onExpandedChange"
      :expanded="dataExpanded"
    >
      <slot />
    </cv-data-table-row-inner>
    <tr v-if="dataExpandable" class="bx--expandable-row bx--expandable-row--hidden" data-child-row>
      <td colspan="999">
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
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvDataTableRow',
  mixins: [uidMixin],
  components: { CvDataTableRowInner },
  props: {
    expanded: Boolean,
  },
  data() {
    return {
      dataExpandable: false,
      dataSomeExpandingRows: false,
      dataExpanded: this.expanded,
    };
  },
  watch: {
    expanded() {
      if (this.dataExpanded !== this.expaned) {
        this.dataExpanded = this.expanded;
      }
    },
  },
  mounted() {
    // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
    this.dataExpandable = !!this.$slots.expandedContent;
    this.$parent.$emit('cv:mounted', this);
  },
  updated() {
    this.dataExpandable = !!this.$slots.expandedContent;
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
    isExpanded: {
      get() {
        return this.dataExpanded;
      },
      set(val) {
        this.dataExpanded = val;
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
  methods: {
    onExpandedChange(val) {
      this.dataExpanded = val;
      this.$emit('cv:expanded-change', this);
    },
  },
};
</script>
