<template>
  <li class="bx--side-nav__menu-item">
    <cv-link-inner
      class="bx--side-nav__link"
      v-on="$listeners"
      v-bind="$attrs"
      :class="{ 'bx--side-nav__link--current': active }"
      role="menuitem"
    >
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </cv-link-inner>
  </li>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavMenuItem',
  inheritAttrs: false,
  components: { CvLinkInner, CvSideNavLinkText },
  props: {
    active: Boolean,
  },
};
</script>

<style lang="scss"></style>
