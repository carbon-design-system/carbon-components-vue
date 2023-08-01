<template>
  <nav
    :class="[
      `cv-side-nav`,
      `${carbonPrefix}--side-nav`,
      `${carbonPrefix}--side-nav__navigation`,
      {
        [`${carbonPrefix}--side-nav--expanded`]: panelExpanded,
        [`${carbonPrefix}--side-nav--rail`]: rail,
        [`${carbonPrefix}--side-nav--collapsed`]: !panelExpanded && fixed,
        [`${carbonPrefix}--side-nav--ux`]: isChildOfHeader,
      },
    ]"
    :aria-hidden="!panelExpanded && !fixed ? 'true' : 'false'"
    :id="id"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
    @mouseenter="onHoverToggle(true)"
    @mouseleave="onHoverToggle(false)"
    ref="el"
  >
    <slot></slot>
    <cv-side-nav-footer
      v-if="!fixed && !rail && !panelData.headerEmbedded"
      :expanded="panelExpanded"
      :assistiveText="assistiveToggleText"
      @toggle-expand="toggleExpand"
    />
  </nav>
</template>

<script setup>
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  unref,
  watch,
} from 'vue';
import CvSideNavFooter from './_CvSideNavFooter.vue';
import { carbonPrefix } from '../../global/settings';
import { getBus } from '../../global/component-utils/event-bus';

const props = defineProps({
  modelValue: {
    validator(value) {
      if (value !== undefined) {
        console.error(
          'v-model has changed in Vue3 please specify v-model:expanded'
        );
        return false;
      }
      return true;
    },
  },
  expanded: Boolean,
  fixed: Boolean,
  id: { type: String, required: true },
  assistiveToggleText: String,
  rail: Boolean,
});

const el = ref(null);
const expandedViaHoverState = ref(false);
const panelExpanded = computed({
  get() {
    return data.dataExpanded;
  },
  /**
   * @param {boolean} val
   */
  set(val) {
    data.dataExpanded = val;
  },
});
/**
 * @type {CvHeaderPanel}
 */
const panelData = {
  id: props.id,
  rail: props.rail,
  headerEmbedded: undefined,
  panelExpanded,
  el,
};

const parent = inject('cv-header-id', '');
const bus = ref(undefined);
onMounted(() => {
  if (unref(parent)) bus.value = getBus(parent);
  // side nav may be fixed and not part of the header

  bus.value?.emit('cv:panel-mounted', panelData);
});
onBeforeUnmount(() => {
  bus.value?.emit('cv:panel-beforeDestroy', panelData);
});

const data = reactive({
  dataExpanded: props.expanded,
});

watch(
  () => props.expanded,
  () => {
    panelExpanded.value = props.expanded;
  }
);
const emit = defineEmits(['update:expanded', 'panel-resize']);
const isPanelExpanded = computed(
  () => panelExpanded.value || expandedViaHoverState.value
);
watch(isPanelExpanded, current => {
  emit('update:expanded', current);
  emit('panel-resize', { id: props.id, expanded: current });
});

const isChildOfHeader = computed(() => {
  return !!bus.value;
});

function onFocusout(ev) {
  bus.value?.emit('cv:panel-focusout', { panel: panelData, ev });
}
function onMouseDown(ev) {
  if (el.value === ev.target || el.value?.contains(ev.target)) {
    // ignore mousedown on panel can cause focus event
    ev.preventDefault();
  }
}
function onHoverToggle(value) {
  if (props.rail) expandedViaHoverState.value = value;
}
function toggleExpand() {
  panelExpanded.value = data.dataExpanded;
}
</script>
