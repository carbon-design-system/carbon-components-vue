<template>
  <li class="cv-header-menu bx--header__submenu">
    <a
      aria-haspopup="true"
      :aria-expanded="expanded ? 'true' : 'false'"
      class="bx--header__menu-item bx--header__menu-title"
      href="javascript:void(0)"
      role="menuitem"
      tabindex="0"
      :aria-label="$attrs.ariaLabel"
      @click="doToggle"
      @keydown.space.prevent
      @keyup.space.prevent="doToggle"
      @keydown.enter.prevent="doToggle"
      @focusout="onFocusout"
    >
      <chevron-down-glyph class="bx--header__menu-arrow" :aria-label="$attrs.ariaLabel" />
    </a>
    <ul
      :aria-label="$attrs.ariaLabel"
      :aria-labelledby="$attrs.ariaLabelledBy"
      class="bx--header__menu"
      role="menu"
      ref="menu"
      @focusout="onFocusout"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import ChevronDownGlyph from '@carbon/icons-vue/es/chevron--down';

export default {
  name: 'CvHeaderMenu',
  components: { ChevronDownGlyph },
  data() {
    return {
      expanded: false,
    };
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
