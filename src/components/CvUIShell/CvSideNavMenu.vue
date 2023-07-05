<template>
  <li
    :class="[
      `cv-side-nav-menu`,
      `${carbonPrefix}--side-nav__item`,
      {
        [`${carbonPrefix}--side-nav__item--active`]: active,
        [`${carbonPrefix}--side-nav__item--icon`]: hasIcon,
      },
    ]"
  >
    <button
      aria-haspopup="true"
      :aria-expanded="isExpanded ? 'true' : 'false'"
      :class="`${carbonPrefix}--side-nav__submenu`"
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
      <span :class="`${carbonPrefix}--side-nav__submenu-title`">{{
        title
      }}</span>
      <cv-side-nav-icon
        :class="`${carbonPrefix}--side-nav__submenu-chevron`"
        small
        :aria-label="isExpanded ? 'collapse nav menu' : 'expand nav menu'"
      >
        <chevron-down20 class="cv-side-nav-menu__chevron-svg" />
      </cv-side-nav-icon>
    </button>
    <ul :class="`${carbonPrefix}--side-nav__menu`">
      <slot></slot>
    </ul>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import ChevronDown20 from '@carbon/icons-vue/es/chevron--down/20';
import CvSideNavIcon from './CvSideNavIcon.vue';
import { computed, onMounted, onUpdated, reactive, useSlots, watch } from 'vue';

const props = defineProps({
  active: Boolean,
  title: { type: String, required: true },
  expanded: { type: Boolean, default: false },
});

const data = reactive({
  isExpanded: false,
  hasNavIcon: false,
});
const isExpanded = computed(() => data.isExpanded);

const slots = useSlots();
onMounted(() => {
  // NOTE: slots is not reactive so needs to be managed on updated
  data.hasNavIcon = !!slots['nav-icon'];
});
onUpdated(() => {
  data.hasNavIcon = !!slots['nav-icon'];
});

const hasIcon = computed(() => {
  return slots['nav-icon'];
});

function doToggle() {
  data.isExpanded = !data.isExpanded;
}

watch(
  () => props.expanded,
  value => {
    data.isExpanded = value;
  },
  { immediate: true }
);
</script>
