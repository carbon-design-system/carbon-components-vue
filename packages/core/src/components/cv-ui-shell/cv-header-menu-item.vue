<template>
  <li class="cv-header-menu-item" :role="role">
    <component
      :is="tagType"
      v-on="$listeners"
      v-bind="{ ...$attrs, ...linkProps }"
      :class="[`${carbonPrefix}--header__menu-item`, { [`${carbonPrefix}--header__menu-item--current`]: activePage }]"
      role="menuitem"
      :aria-current="ariaCurrent"
    >
      <span :class="`${carbonPrefix}--text-truncate--end`">
        <slot />
      </span>
    </component>
  </li>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvHeaderMenuItem',
  mixins: [LinkMixin, carbonPrefixMixin],
  inheritAttrs: false,
  props: {
    active: Boolean,
    ariaCurrent: String,
    role: String,
  },
  computed: {
    activePage() {
      return this.active && this.ariaCurrent !== 'page';
    },
  },
};
</script>
