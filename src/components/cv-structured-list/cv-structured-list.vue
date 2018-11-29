<template>
  <div class="bx--structured-list"
    :class="{
      'bx--structured-list--selection': selectable,
      'bx--structured-list--border': border,
      'bx--structured-list--condensed': condensed
      }">
    <div class="bx--structured-list-thead">
      <div class="bx--structured-list-row bx--structured-list-row--header-row">
        <div v-if="selectable" class="bx--structured-list-th"></div>
        <slot name="headings"></slot>
      </div>
    </div>
    <div class="bx--structured-list-tbody">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
import { StructuredList } from 'carbon-components';

export default {
  name: 'CvStructuredList',
  props: {
    selectable: Boolean,
    border: Boolean,
    condensed: Boolean,
  },
  data() {
    return {
      carbonComponent: null,
    };
  },
  methods: {
    updateSelectable(val) {
      if (val) {
        this.$el.setAttribute('data-structured-list', 'true');
      } else {
        this.$el.removeAttribute('data-structured-list');
      }
    },
  },
  mounted() {
    this.carbonComponent = StructuredList.create(this.$el);

    this.updateSelectable(this.selectable);

    // listen children to raise change events
    for (let child of this.$children) {
      if (child.constructor.options.name === 'CvStructuredListItemSelectable') {
        child.$on('change', ev => {
          this.$emit('change', ev.target.value);
        });
      }
    }
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
  watch: {
    selectable(val) {
      this.updateSelectable(val);
    },
  },
};
</script>

<style lang="scss">
</style>
