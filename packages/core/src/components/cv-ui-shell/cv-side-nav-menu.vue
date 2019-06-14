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
      @focusout="onFocusout"
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
        <ChevronDown20 />
      </cv-side-nav-icon>
    </button>
    <ul class="bx--side-nav__menu" role="menu" ref="menu" @focusout="onFocusout">
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
    };
  },
  computed: {
    hasIcon() {
      return this.$slots['nav-icon'] !== undefined;
    },
  },
  methods: {
    doToggle() {
      this.expanded = !this.expanded;
    },
    onFocusout(ev) {
      if (!(this.$el.contains(ev.relatedTarget) || this.$refs.menu.contains(ev.relatedTarget))) {
        this.expanded = false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
