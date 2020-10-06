<template>
  <li :class="`${carbonPrefix}--side-nav__menu-item`">
    <component
      :is="tagType"
      v-on="$listeners"
      :class="[`${carbonPrefix}--side-nav__link`, { [`${carbonPrefix}--side-nav__link--current`]: active }]"
      v-bind="{ ...$attrs, ...linkProps }"
      role="menuitem"
    >
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script>
import { linkMixin, carbonPrefixMixin } from '../../mixins';
import CvSideNavLinkText from './_cv-side-nav-link-text';

export default {
  name: 'CvSideNavMenuItem',
  inheritAttrs: false,
  mixins: [linkMixin, carbonPrefixMixin],
  components: { CvSideNavLinkText },
  props: {
    active: Boolean,
  },
};
</script>
