<template>
  <button class="bx--toolbar-action" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'cv-data-table-action',
  mounted() {
    // ensure SVG has
    this.$el.children[0].classList.add('class="bx--toolbar-action__icon');
  },
};
</script>
