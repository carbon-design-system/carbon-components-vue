<template>
  <button
    v-on="$listeners"
    class="cv-header-global-action bx--header__action"
    :class="active ? 'bx--header__action--active' : ''"
    type="button"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CvHeaderGlobalAction',
  props: {
    active: Boolean,
  },
};
</script>
