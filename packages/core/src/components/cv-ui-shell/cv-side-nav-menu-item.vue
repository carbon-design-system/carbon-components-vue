<template>
  <li class="bx--side-nav__menu-item">
    <component
      :is="tagType"
      class="bx--side-nav__link"
      v-on="$listeners"
      v-bind="$attrs"
      :class="{ 'bx--side-nav__link--current': active }"
      role="menuitem"
    >
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import linkMixin from '../../mixins/link-mixin';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavMenuItem',
  inheritAttrs: false,
  mixins: [linkMixin],
  components: { CvSideNavLinkText },
  props: {
    active: Boolean,
  },
};
</script>

<style lang="scss"></style>
