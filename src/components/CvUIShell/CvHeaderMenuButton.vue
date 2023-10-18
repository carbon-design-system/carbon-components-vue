<template>
  <button
    :id="uid"
    ref="el"
    class="cv-header-menu-button"
    :class="[
      `${carbonPrefix}--header__action`,
      `${carbonPrefix}--header__menu-trigger`,
      `${carbonPrefix}--header__menu-toggle`,
      {
        [`${carbonPrefix}--header__action--active`]: dataActive,
        [`${carbonPrefix}--header__menu-toggle__hidden`]: !controlData.hasRail,
      },
    ]"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    :aria-expanded="active ? 'true' : 'false'"
    @click="gaToggle"
    @focusout="gaFocusout"
  >
    <close20 v-if="dataActive" />
    <menu20 v-if="!dataActive" />
  </button>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId } from '../../use/cvId';
import Close20 from '@carbon/icons-vue/es/close/20';
import Menu20 from '@carbon/icons-vue/es/menu/20';
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
  active: Boolean,
  ariaControls: { type: String, required: true },
});
const uid = useCvId(props, true);
const dataActive = ref(props.active);
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
const el = ref(null);

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

watch(
  () => props.active,
  () => {
    if (props.active !== dataActive.value) {
      gaToggle();
    }
  }
);

function gaToggle() {
  el.value?.focus();
  bus?.emit('cv:panel-control-toggle', controlData);
}
function gaFocusout(ev) {
  bus?.emit('cv:panel-control-focusout', { ctrl: controlData, ev });
}
</script>
