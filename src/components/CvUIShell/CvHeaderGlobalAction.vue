<template>
  <cv-icon-button
    :id="uid"
    :class="[
      `cv-header-global-action`,
      `${carbonPrefix}--header__action`,
      { [`${carbonPrefix}--header__action--active`]: dataActive },
    ]"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    ref="el"
    :aria-expanded="active ? 'true' : 'false'"
    :label="label"
    :tip-alignment="tipAlignment"
    :tip-position="tipPosition"
    @click="gaToggle"
    @focusout="gaFocusout"
  >
    <template #icon>
      <slot />
    </template>
  </cv-icon-button>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue';
import { getBus } from '../../global/component-utils/event-bus';
import CvIconButton from '../CvButton/CvIconButton.vue';

const props = defineProps({
  active: { type: Boolean, default: false },
  ariaControls: { type: String },
  label: { type: String, default: undefined },
  tipPosition: {
    type: String,
    default: 'bottom',
    validator: val => ['top', 'left', 'bottom', 'right'].includes(val),
  },
  tipAlignment: {
    type: String,
    default: 'center',
    validator: val => ['start', 'center', 'end'].includes(val),
  },
  ...propsCvId,
});
const uid = useCvId(props, true);
const el = ref(null);
const panelExpanded = computed({
  get() {
    return dataActive.value;
  },
  /**
   * Set expanded
   * @param {boolean} val
   */
  set(val) {
    // do not emit 'cv:panel-control-toggle'
    dataActive.value = val;
  },
});

/**
 * @type {CvHeaderController}
 */
const controlData = reactive({
  id: uid.value,
  panelExpanded,
  el: el,
  ariaControls: props.ariaControls,
  hasRail: false,
});

let bus = undefined;
const parent = inject('cv-header-id');
onMounted(() => {
  if (parent.value) bus = getBus(parent);
  else console.warn('header not found');

  bus?.emit('cv:panel-control-mounted', controlData);
});
onBeforeUnmount(() => {
  bus?.emit('cv:panel-control-beforeDestroy', controlData);
});

const dataActive = ref(props.active);

function gaToggle() {
  el.value?.$el?.focus();

  bus?.emit('cv:panel-control-toggle', controlData);
}
function gaFocusout(ev) {
  bus?.emit('cv:panel-control-focusout', { ctrl: controlData, ev });
}
</script>
