<template>
  <button class="bx--overflow-menu bx--toolbar-action" v-on="$listeners" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'cv-data-table-action',
  mounted() {
    // ensure SVG has
    this.$el.children[0].classList.add('bx--toolbar-action__icon');
  },
};
</script>
