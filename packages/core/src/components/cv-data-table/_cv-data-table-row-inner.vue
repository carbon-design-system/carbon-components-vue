<template>
  <tr class="cv-data-table-row-inner" :class="{ 'bx--parent-row': expandingRow, 'bx--expandable-row': dataExpanded }">
    <td
      v-if="dataSomeExpandingRows"
      class="bx--table-expand"
      :data-previous-value="dataExpanded ? 'collapsed' : 'expanded'"
    >
      <button v-if="expandingRow" class="bx--table-expand__button" @click="toggleExpand">
        <ChevronRight16 class="bx--table-expand__svg" />
      </button>
    </td>
    <td v-if="hasBatchActions" class="bx--table-column-checkbox">
      <cv-checkbox :form-item="false" :value="value" v-model="dataChecked" @change="onChange" ref="rowChecked" />
    </td>
    <slot />
    <td v-if="hasOverflowMenu" class="bx--table-column-menu">
      <cv-overflow-menu flip-menu>
        <cv-overflow-menu-item
          v-for="(item, index) in overflowMenu"
          :key="`${index}`"
          @click="
            onMenuItemClick({
              rowValue: value,
              menuIndex: index,
              menuLabel: item,
            })
          "
          >{{ item }}</cv-overflow-menu-item
        >
      </cv-overflow-menu>
    </td>
  </tr>
</template>

<script>
import CvCheckbox from '../cv-checkbox/cv-checkbox';
import CvOverflowMenu from '../cv-overflow-menu/cv-overflow-menu';
import CvOverflowMenuItem from '../cv-overflow-menu/cv-overflow-menu-item';
import uidMixin from '../../mixins/uid-mixin';
import ChevronRight16 from '@rocketsoftware/icons-vue/es/chevron--right/16';

export default {
  name: 'CvDataTableRowInner',
  components: { CvCheckbox, CvOverflowMenu, CvOverflowMenuItem, ChevronRight16 },
  mixins: [uidMixin],
  props: {
    checked: Boolean,
    expanded: Boolean,
    expandingRow: Boolean,
    overflowMenu: Array,
    someExpandingRows: Boolean,
    value: { type: String, requried: true },
  },
  model: {
    event: 'change',
    prop: 'checked',
  },
  data() {
    return {
      dataChecked: this.checked,
      dataExpanded: this.expanded,
      dataSomeExpandingRows: this.someExpandingRows,
    };
  },
  watch: {
    checked() {
      this.dataChecked = this.checked;
    },
    expanded() {
      this.dataExpanded = this.expanded;
    },
    someExpandingRows() {
      this.dataSomeExpandingRows = this.someExpandingRows;
    },
  },
  mounted() {
    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
  computed: {
    isCvDataTableRow() {
      return true;
    },
    hasOverflowMenu() {
      return (this.overflowMenu && this.overflowMenu.length) || this.$slots['overflow-menu'];
    },
    hasBatchActions() {
      return this.$parent.$parent.hasBatchActions;
    },
    isChecked() {
      return this.dataChecked;
    },
  },
  methods: {
    onChange() {
      this.$parent.$parent.onRowCheckChange(this.value, this.dataChecked);
    },
    onMenuItemClick(val) {
      this.$parent.$parent.onMenuItemClick(val);
    },
    toggleExpand() {
      this.dataExpanded = !this.dataExpanded;
    },
  },
};
</script>

<style lang="scss">
.cv-data-table-row-inner .cv-checkbox.bx--checkbox-wrapper {
  margin: 0;
}
</style>
