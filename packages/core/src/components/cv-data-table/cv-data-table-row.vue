<template>
  <tr class="cv-data-table-row">
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

export default {
  name: 'CvDataTableRow',
  components: { CvCheckbox, CvOverflowMenu, CvOverflowMenuItem },
  mixins: [uidMixin],
  props: {
    checked: Boolean,
    overflowMenu: Array,
    value: { type: String, requried: true },
  },
  watch: {
    checked() {
      this.dataChecked = this.checked;
    },
  },
  model: {
    event: 'change',
    prop: 'checked',
  },
  data() {
    return {
      dataChecked: this.checked,
    };
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
      return this.$parent.hasBatchActions;
    },
    isChecked() {
      return this.dataChecked;
    },
  },
  methods: {
    onChange() {
      this.$parent.onRowCheckChange(this.value, this.dataChecked);
    },
    onMenuItemClick(val) {
      this.$parent.onMenuItemClick(val);
    },
  },
};
</script>

<style lang="scss">
.cv-data-table-row .cv-checkbox.bx--checkbox-wrapper {
  margin: 0;
}
</style>
