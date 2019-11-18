<template>
  <li class="bx--side-nav__item">
    <component
      :is="tagType"
      v-on="$listeners"
      class="cv-side-nav-item-link bx--side-nav__link"
      v-bind="{ ...$attrs, ...linkProps }"
      :class="{ 'bx--side-nav__link--current': active }"
    >
      <cv-side-nav-icon v-if="$slots['nav-icon'] !== undefined" small>
        <slot name="nav-icon" />
      </cv-side-nav-icon>
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import CvSideNavIcon from './cv-side-nav-icon';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavLink',
  inheritAttrs: false,
  mixins: [LinkMixin],
  components: { CvSideNavIcon, CvSideNavLinkText },
  props: {
    active: Boolean,
    icon: Object,
  },
};
</script>
