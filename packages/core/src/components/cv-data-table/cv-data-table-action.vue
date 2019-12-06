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
    if (this.$el.children[0].classList) {
      this.$el.children[0].classList.add('bx--toolbar-action__icon');
    } else if (this.$el.children[0].className) {
      // IE 11 and Edge pre-crhomium
      this.$el.children[0].className += ' bx--toolbar-action__icon';
    }
  },
};
</script>
