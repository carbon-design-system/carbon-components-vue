<template>
  <li class="bx--side-nav__item">
    <cv-link-inner
      class="cv-side-nav-item-link bx--side-nav__link"
      v-on="$listeners"
      v-bind="$attrs"
      :class="{ 'bx--side-nav__link--current': active }"
    >
      <cv-side-nav-icon v-if="$slots['nav-icon'] !== undefined" small>
        <slot name="nav-icon" />
      </cv-side-nav-icon>
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </cv-link-inner>
  </li>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';
import CvSideNavIcon from './cv-side-nav-icon';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavLink',
  inheritAttrs: false,
  components: { CvLinkInner, CvSideNavIcon, CvSideNavLinkText },
  props: {
    active: Boolean,
    icon: Object,
  },
};
</script>

<style lang="scss"></style>
