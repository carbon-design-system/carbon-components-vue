<template>
  <button
    disabled
    class="bx--btn bx--skeleton"
    :class="{ 'bx--btn--sm': small }"
    type="button"
  ></button>
</template>

<script>
export default {
  name: 'CvButtonSkeleton',
  props: {
    small: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss"></style>
