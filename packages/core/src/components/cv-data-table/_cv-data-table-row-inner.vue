<template>
  <tr class="cv-data-table-row-inner" :class="{ 'bx--parent-row': expandingRow, 'bx--expandable-row': dataExpanded }">
    <td
      v-if="dataSomeExpandingRows"
      class="bx--table-expand"
      :data-previous-value="dataExpanded ? 'collapsed' : 'expanded'"
    >
      <button v-if="expandingRow" class="bx--table-expand__button" @click="toggleExpand" type="button">
        <ChevronRight16 class="bx--table-expand__svg" />
      </button>
    </td>
    <td v-if="hasBatchActions" class="bx--table-column-checkbox">
      <cv-checkbox
        :form-item="false"
        :value="value"
        v-model="dataChecked"
        @change="onChange"
        ref="rowChecked"
        :aria-label="ariaLabelForBatchCheckbox || `Select row ${value} for batch action`"
      />
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
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';

export default {
  name: 'CvDataTableRowInner',
  components: { CvCheckbox, CvOverflowMenu, CvOverflowMenuItem, ChevronRight16 },
  props: {
    ariaLabelForBatchCheckbox: String,
    checked: Boolean,
    expanded: Boolean,
    expandingRow: Boolean,
    overflowMenu: Array,
    someExpandingRows: Boolean,
    value: String,
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
      hasOverflowMenu: false,
    };
  },
  mounted: function() {
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
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
  computed: {
    isCvDataTableRow() {
      return true;
    },
    hasBatchActions() {
      return this.$parent.$parent.hasBatchActions;
    },
    isChecked() {
      return this.dataChecked;
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.hasOverflowMenu = !!((this.overflowMenu && this.overflowMenu.length) || this.$slots['overflow-menu']);
    },
    onChange() {
      this.$parent.$parent.onRowCheckChange(this.value, this.dataChecked);
    },
    onMenuItemClick(val) {
      this.$parent.$parent.onMenuItemClick(val);
    },
    toggleExpand() {
      this.dataExpanded = !this.dataExpanded;
      this.$emit('expanded-change', this.dataExpanded);
    },
  },
};
</script>
