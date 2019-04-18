<template>
  <div
    class="cv-structured-list bx--structured-list"
    :class="{
      'bx--structured-list--selection': selectable,
      'bx--structured-list--border': border,
      'bx--structured-list--condensed': condensed,
    }"
    :data-structured-list="selectable"
  >
    <div class="bx--structured-list-thead">
      <div class="bx--structured-list-row bx--structured-list-row--header-row">
        <div v-if="selectable && !componentsX" class="bx--structured-list-th"></div>
        <slot name="headings"></slot>
        <div v-if="selectable && componentsX" class="bx--structured-list-th"></div>
      </div>
    </div>
    <div class="bx--structured-list-tbody">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
import { componentsX } from '../../internal/feature-flags';

export default {
  name: 'CvStructuredList',
  props: {
    selectable: Boolean,
    border: Boolean,
    condensed: Boolean,
  },
  data() {
    return { componentsX };
  },
  mounted() {
    // pass on cv-structured-list-item change events
    this.$on('cv:change', val => this.$emit('change', val));
  },
};
</script>
