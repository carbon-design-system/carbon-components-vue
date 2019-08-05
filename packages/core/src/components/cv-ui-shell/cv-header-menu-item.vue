<template>
  <li class="cv-header-menu-item" :role="role">
    <component
      :is="tagType"
      v-on="$listeners"
      v-bind="{ ...$attrs, ...linkProps }"
      class="bx--header__menu-item"
      role="menuitem"
    >
      <span class="bx--text-truncate--end">
        <slot />
      </span>
    </component>
  </li>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvHeaderMenuItem',
  mixins: [LinkMixin],
  inheritAttrs: false,
  props: {
    role: String,
  },
};
</script>
