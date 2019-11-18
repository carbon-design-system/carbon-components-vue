<template>
  <li
    class="cv-side-nav-menu bx--side-nav__item"
    :class="{ 'bx--side-nav__item--active': active, 'bx--side-nav__item--icon': hasIcon }"
  >
    <button
      aria-haspopup="true"
      :aria-expanded="expanded ? 'true' : 'false'"
      class="bx--side-nav__submenu"
      role="menuitem"
      type="button"
      @click="doToggle"
      @keydown.space.prevent
      @keyup.space.prevent="doToggle"
      @keydown.enter.prevent="doToggle"
    >
      <cv-side-nav-icon v-if="hasIcon">
        <slot name="nav-icon" />
      </cv-side-nav-icon>
      <span class="bx--side-nav__submenu-title">{{ title }}</span>
      <cv-side-nav-icon
        class="bx--side-nav__submenu-chevron"
        small
        :aria-label="expanded ? 'collapse nav menu' : 'expand nav menu'"
      >
        <ChevronDown20 class="cv-side-nav-menu__chevron-svg" />
      </cv-side-nav-icon>
    </button>
    <ul class="bx--side-nav__menu" role="menu" ref="menu">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import ChevronDown20 from '@carbon/icons-vue/es/chevron--down/20';
import CvSideNavIcon from './cv-side-nav-icon';

export default {
  name: 'CvSideNavMenu',
  components: { CvSideNavIcon, ChevronDown20 },
  props: {
    active: Boolean,
    title: { type: String, required: true },
  },
  data() {
    return {
      expanded: false,
      hasNavIcon: false,
    };
  },
  mounted() {
    // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
    this.hasNavIcon = !!this.$slots['nav-icon'];
  },
  beforeUpdate() {
    this.hasNavIcon = !!this.$slots['nav-icon'];
  },
  computed: {
    hasIcon() {
      return !!this.$slots['nav-icon'];
    },
  },
  methods: {
    doToggle() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
