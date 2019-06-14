<template>
  <li class="cv-header-menu-item" :role="role">
    <cv-link-inner v-on="$listeners" v-bind="$attrs" class="bx--header__menu-item" role="menuitem">
      <span class="bx--text-truncate--end">
        <slot />
      </span>
    </cv-link-inner>
  </li>
</template>

<script>
import CvLinkInner from '../cv-link/_cv-link-inner';

export default {
  name: 'CvHeaderMenuItem',
  components: { CvLinkInner },
  inheritAttrs: false,
  props: {
    role: String,
  },
};
</script>
