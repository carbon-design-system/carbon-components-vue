<template>
  <li
    ref="el"
    :class="`cv-header-menu ${carbonPrefix}--header__submenu`"
    @mouseenter="doHoverToggle(true)"
    @mouseleave="doHoverToggle(false)"
  >
    <a
      aria-haspopup="true"
      :aria-expanded="data.expanded ? 'true' : 'false'"
      :class="`${carbonPrefix}--header__menu-item ${carbonPrefix}--header__menu-title`"
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
      <chevron-down-glyph
        :class="`${carbonPrefix}--header__menu-arrow`"
        :aria-label="$attrs.ariaLabel"
      />
    </a>
    <ul
      ref="menu"
      :aria-label="$attrs.ariaLabel"
      :aria-labelledby="$attrs.ariaLabelledBy"
      :class="`${carbonPrefix}--header__menu`"
      role="menu"
      @focusout="onFocusout"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import ChevronDownGlyph from '@carbon/icons-vue/es/chevron--down';
import { reactive, ref } from 'vue';

const props = defineProps({
  title: { type: String, default: undefined },
  hoverToggle: { type: Boolean, default: true },
});
const data = reactive({
  expanded: false,
});

function doHoverToggle(force) {
  if (props.hoverToggle) {
    doToggle(force);
  }
}
function doToggle(force) {
  if (typeof force === 'boolean') {
    data.expanded = force;
  } else {
    data.expanded = !data.expanded;
  }
}
const el = ref(null);
const menu = ref(null);
function onFocusout(ev) {
  if (
    !(
      el.value?.contains(ev.relatedTarget) ||
      menu?.value.contains(ev.relatedTarget)
    )
  ) {
    data.expanded = false;
  }
}
</script>
