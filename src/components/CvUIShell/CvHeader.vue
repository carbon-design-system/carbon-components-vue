<template>
  <header :class="`cv-header ${carbonPrefix}--header`" data-header :id="uid">
    <slot />
    <div v-if="hasGlobalHeader" :class="`${carbonPrefix}--header__global`">
      <slot name="header-global" />
    </div>
    <slot name="left-panels" />
    <slot name="right-panels" />
  </header>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  readonly,
  ref,
  useAttrs,
  useSlots,
} from 'vue';
import { getBus, removeBus } from '../../global/component-utils/event-bus';
import { useCvId } from '../../use/cvId';

const attrs = useAttrs();
const uid = useCvId(attrs, true);
provide('cv-header-id', readonly(uid));
let bus = undefined;
onBeforeMount(() => {
  bus = getBus(uid.value);
  bus.on('cv:panel-control-mounted', onCvPanelControlMounted);
  bus.on('cv:panel-control-beforeDestroy', onCvPanelControlBeforeDestroy);

  bus.on('cv:panel-control-toggle', onCvPanelControlToggle);
  bus.on('cv:panel-control-focusout', onCvPanelControlFocusout);
  bus.on('cv:panel-mounted', onCvPanelMounted);
  bus.on('cv:panel-beforeDestroy', onCvPanelBeforeDestroy);
  bus.on('cv:panel-focusout', onCvPanelFocusout);
});
onUnmounted(() => {
  removeBus(uid.value);
});

const hasGlobalHeader = ref(false);
const slots = useSlots();
onMounted(() => {
  // NOTE: slots is not reactive so needs to be managed on updated
  hasGlobalHeader.value = !!slots['header-global'];
});
onUpdated(() => {
  // NOTE: slots is not reactive so needs to be managed on updated
  hasGlobalHeader.value = !!slots['header-global'];
});

/**
 * Panel Data
 * @typedef {Object} CvHeaderPanel
 * @property {string} id - panel id
 * @property {boolean?} rail - is this panel a rail
 * @property {boolean?} headerEmbedded - true when the panel is added to a list
 * @property {HTMLElement} el
 * @property {WritableComputedRef<boolean>} panelExpanded
 */

/**
 * Controller Data
 * @typedef {Object} CvHeaderController
 * @property {string} id - controller id
 * @property {string} ariaControls - what is controlled
 * @property {boolean} hasRail - controls a rail?
 * @property {HTMLElement} el
 * @property {WritableComputedRef<boolean>} panelExpanded
 */

/**
 * @type {UnwrapNestedRefs<{panels: Array<CvHeaderPanel>, panelControllers:Array<CvHeaderController>}>}
 */
const data = reactive({
  panels: [],
  panelControllers: [],
});

/**
 * Associate a rail controller with a panel
 * @param {CvHeaderController} _ctrl
 * @param {CvHeaderPanel?} _panel
 */
function hasRail(_ctrl, _panel) {
  let panel = _panel;
  let ctrl = _ctrl;
  if (ctrl) {
    panel = data.panels?.find(item => item.id === ctrl.ariaControls);
  } else {
    if (panel) {
      ctrl = data.panelControllers?.find(
        item => item.ariaControls === panel.id
      );
    }
  }
  if (ctrl) {
    ctrl.hasRail = !!(panel && ctrl) && panel.rail;
  }
}

/**
 * Add controller to list
 * @param {CvHeaderController} srcComponent
 */
function onCvPanelControlMounted(srcComponent) {
  data.panelControllers.push(srcComponent);
  hasRail(srcComponent);
}
function onCvPanelControlBeforeDestroy(srcComponent) {
  const index = data.panelControllers.findIndex(
    item => item.id === srcComponent.id
  );
  if (index > -1) {
    data.panelControllers.splice(index, 1);
  }
}

/**
 * Toggle a panel
 * @param {CvHeaderController} srcComponent
 * @param force
 */
function onCvPanelControlToggle(srcComponent, force) {
  const foundIndex = data.panels.findIndex(
    item => item.id === srcComponent.ariaControls
  );
  if (foundIndex > -1) {
    const newValue = force !== undefined ? force : !srcComponent.panelExpanded;
    // close all panels
    for (let index in data.panels) {
      data.panels[index].panelExpanded = false;
    }
    for (let index in data.panelControllers) {
      data.panelControllers[index].panelExpanded = false;
    }

    // open just this one panel
    srcComponent.panelExpanded = newValue;
    data.panels[foundIndex].panelExpanded = newValue;
  }
}

function onCvPanelControlFocusout(payload) {
  const srcComponent = payload.ctrl;
  const srcEvent = payload.ev;
  /**
   * @type {CvHeaderPanel}
   */
  const found = data.panels.find(item => item.id === srcComponent.ariaControls);
  if (
    found &&
    !found.rail &&
    found.el !== srcEvent.relatedTarget &&
    !found.el.contains(srcEvent.relatedTarget)
  ) {
    // close when not a rail
    onCvPanelControlToggle(srcComponent, false);
  }
}

/**
 * Add panel to list
 * @param {CvHeaderPanel} srcComponent
 */
function onCvPanelMounted(srcComponent) {
  data.panels.push(srcComponent);
  srcComponent.headerEmbedded = true;
  hasRail(undefined, srcComponent);
}
function onCvPanelBeforeDestroy(srcComponent) {
  const index = data.panels.findIndex(item => item.id === srcComponent.id);
  if (index > -1) {
    data.panels.splice(index, 1);
  }
}

function onCvPanelFocusout(payload) {
  const srcComponent = payload.panel;
  const srcEvent = payload.ev;
  /**
   * @type {CvHeaderController}
   */
  const found = data.panelControllers.find(
    item => item.ariaControls === srcComponent.id
  );
  if (
    srcComponent.el !== srcEvent.relatedTarget &&
    !srcComponent.el.contains(srcEvent.relatedTarget) &&
    found &&
    found.el !== srcEvent.relatedTarget
  ) {
    onCvPanelControlToggle(found, false);
  }
}
</script>
