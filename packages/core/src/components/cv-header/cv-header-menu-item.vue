<template>
  <li class="cv-header-menu-item" :role="role">
    <component :is="tagType" class="bx--header__menu-item" role="menuitem" v-bind="$attrs">
      <span class="bx--text-truncate--end">
        <slot />
      </span>
    </component>
  </li>
</template>

<script>
import linkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvHeaderMenuItem',
  mixins: [linkMixin],
  inheritAttrs: false,
  props: {
    role: String,
  },
};
</script>
