<template>
  <div
    disabled
    class="bx--list-box bx--dropdown-v2 bx--skeleton"
    :class="{ 'bx--list-box--inline': inline }"
  ></div>
</template>

<script>
export default {
  name: 'CvDropdownSkeleton',
  props: {
    inline: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss"></style>
