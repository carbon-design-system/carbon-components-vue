<template>
  <component
    :is="tagType"
    class="cv-switcher-item-link bx--switcher__item-link"
    v-on="$listeners"
    v-bind="$attrs"
    :class="{ 'bx--switcher__item-link--selected': selected }"
  >
    <slot />
  </component>
</template>

<script>
import linkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvSwitcherItemLink',
  inheritAttrs: false,
  mixins: [linkMixin],
  props: {
    selected: Boolean,
  },
};
</script>

<style lang="scss"></style>
