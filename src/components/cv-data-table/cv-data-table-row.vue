<template>
  <tr>
    <td v-if="hasBatchActions">
      <cv-checkbox
        :form-item="false"
        :value="value"
        v-model="dataChecked"
        @change="onChange"
        ref="rowChecked"
      />
    </td>
    <slot />
    <td v-if="hasOverflowMenu">
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
export default {
  name: 'CvDataTableRow',
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
  computed: {
    isCvDataTableRow() {
      return true;
    },
    hasOverflowMenu() {
      return (
        (this.overflowMenu && this.overflowMenu.length) ||
        this.$slots['overflow-menu']
      );
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
