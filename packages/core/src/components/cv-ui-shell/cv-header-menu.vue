<template>
  <li class="cv-header-menu bx--header__submenu" @mouseenter="doHoverToggle(true)" @mouseleave="doHoverToggle(false)">
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
      {{ title }}
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
  props: {
    title: String,
    hoverToggle: { type: Boolean, default: true },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    doHoverToggle(force) {
      if (this.hoverToggle) {
        this.doToggle(force);
      }
    },
    doToggle(force) {
      if (typeof force === 'boolean') {
        this.expanded = force;
      } else {
        this.expanded = !this.expanded;
      }
    },
    onFocusout(ev) {
      if (!(this.$el.contains(ev.relatedTarget) || this.$refs.menu.contains(ev.relatedTarget))) {
        this.expanded = false;
      }
    },
  },
};
</script>
