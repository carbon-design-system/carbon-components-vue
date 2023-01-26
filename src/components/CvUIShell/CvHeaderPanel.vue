<template>
  <div
    :class="[
      `cv-header-panel`,
      `${carbonPrefix}--header-panel`,
      { [`${carbonPrefix}--header-panel--expanded`]: panelExpanded },
    ]"
    :aria-hidden="!panelExpanded ? 'true' : 'false'"
    :id="id"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
    ref="el"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
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
  id: { type: String, required: true },
});
const data = reactive({
  dataExpanded: props.expanded,
});
const el = ref(null);
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
watch(panelExpanded, val => {
  emit('panel-resize', { id: props.id, expanded: val });
});

/**
 * @type {CvHeaderPanel}
 */
const panelData = {
  id: props.id,
  rail: false,
  headerEmbedded: undefined,
  panelExpanded,
  el,
};

const parent = inject('cv-header-id');
let bus = undefined;
onMounted(() => {
  if (parent.value) bus = getBus(parent);
  else console.warn('header not found');

  bus?.emit('cv:panel-mounted', panelData);
});
onBeforeUnmount(() => {
  bus?.emit('cv:panel-beforeDestroy', panelData);
});

function onFocusout(ev) {
  bus?.emit('cv:panel-focusout', { panel: panelData, ev });
}
function onMouseDown(ev) {
  if (el.value === ev.target || el.value.contains(ev.target)) {
    // ignore mousedown on panel can cause focus event
    ev.preventDefault();
  }
}
watch(
  () => props.expanded,
  () => {
    panelExpanded.value = props.expanded;
  }
);

const emit = defineEmits(['update:expanded', 'panel-resize']);
watch(panelExpanded, current => {
  emit('update:expanded', current);
  emit('panel-resize', { id: props.id, expanded: current });
});
</script>
