<template>
  <cv-link-inner
    v-on="$listeners"
    class="cv-switcher-item-link bx--switcher__item-link"
    :class="{ 'bx--switcher__item-link--selected': selected }"
  >
    <slot />
  </cv-link-inner>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';

export default {
  name: 'CvSwitcherItemLink',
  components: { CvLinkInner },
  props: {
    selected: Boolean,
  },
};
</script>

<style lang="scss"></style>
