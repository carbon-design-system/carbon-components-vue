<template>
  <div
    class="cv-structured-list bx--structured-list"
    :class="{
      'bx--structured-list--selection': selectable,
      'bx--structured-list--condensed': condensed,
    }"
    :data-structured-list="selectable"
  >
    <div class="bx--structured-list-thead">
      <div class="bx--structured-list-row bx--structured-list-row--header-row">
        <slot name="headings"></slot>
        <div v-if="selectable" class="bx--structured-list-th"></div>
      </div>
    </div>
    <div class="bx--structured-list-tbody">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvStructuredList',
  props: {
    selectable: Boolean,
    condensed: Boolean,
  },
  mounted() {
    // pass on cv-structured-list-item change events
    this.$on('cv:change', val => this.$emit('change', val));
  },
};
</script>
