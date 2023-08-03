<template>
  <div class="cv-interactive-tooltip" ref="root">
    <div :id="`${cvId}-label`" :class="`${carbonPrefix}--tooltip__label`">
      <slot name="label"></slot>

      <button
        :aria-expanded="dataVisible ? 'true' : 'false'"
        :aria-labelledby="`${cvId}-label`"
        :class="`${carbonPrefix}--tooltip__trigger`"
        :aria-controls="`${cvId}`"
        aria-haspopup="true"
        ref="trigger"
        type="button"
        @click="toggle(dataVisible)"
        @keydown.tab="onTriggerTab"
        @focusout="checkFocusOut"
      >
        <slot name="trigger">
          <Information16 />
        </slot>
      </button>
    </div>

    <div
      :id="cvId"
      :aria-hidden="!dataVisible"
      :data-floating-menu-direction="direction"
      :class="[
        `${carbonPrefix}--tooltip`,
        {
          [`${carbonPrefix}--tooltip--shown`]: dataVisible,
          [`${carbonPrefix}--tooltip--${direction}`]: direction,
          [`${carbonPrefix}--tooltip--align-${alignment}`]: alignment,
        },
      ]"
      ref="popup"
      role="dialog"
      :aria-describedby="`${cvId}-body`"
      :aria-labelledby="`${cvId}-label`"
      @focusout="checkFocusOut"
      :style="{ left: left + 'px', top: top + 'px' }"
      tabindex="-1"
      @mousedown.prevent="preventFocusOut"
    >
      <div
        class="cv-interactive-tooltip__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; left: -9999px; width: 1px; height: 1px"
        @focus="focusBeforeContent"
      />
      <span :class="`${carbonPrefix}--tooltip__caret`"></span>
      <div :class="`${carbonPrefix}--tooltip__content`">
        <slot name="content"></slot>
      </div>
      <div
        class="cv-interactive-tooltip__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; left: -9999px; width: 1px; height: 1px"
        @focus="focusAfterContent"
      />
    </div>
  </div>
</template>

<script setup>
import Information16 from '@carbon/icons-vue/es/information/16';
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  toRefs,
} from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { TipAlignments, alignments, TipDirections, directions } from './consts';

const props = defineProps({
  alignment: {
    type: String,
    default: TipAlignments.center,
    validator: val => alignments.includes(val),
  },
  direction: {
    type: String,
    default: TipDirections.top,
    validator: val => directions.includes(val),
  },
  visible: {
    type: Boolean,
    default: false,
  },
  ...propsCvId,
});

const { direction, visible } = toRefs(props);
const cvId = useCvId(props);
const dataVisible = ref(false);
const left = ref(-9999); // position offscreen
const top = ref(0);
const root = ref(null);
let popupEl = ref(null);
const popup = ref(null);
const trigger = ref(null);
const beforeContent = ref(null);
const afterContent = ref(null);

const contentAfter = computed(() => {
  return [TipDirections.right, TipDirections.bottom].includes(direction.value);
});

onMounted(() => {
  // move popup out to body to ensure it appears above other elements
  popupEl = document.body.appendChild(popup.value);
  toggle(!visible.value);
});

watch(visible, newValue => {
  toggle(!newValue);
});

watch(direction, () => {
  if (!visible.value) return;
  position();
});

function positionListen(on) {
  if (on) {
    window.addEventListener('scroll', position);
    window.addEventListener('resize', position);
    return;
  }
  window.removeEventListener('scroll', position);
  window.removeEventListener('resize', position);
}

function position() {
  const menuPosition = trigger.value.getBoundingClientRect();
  const pixelsScrolledX = window.scrollX || window.pageXOffset;
  const pixelsScrolledY = window.scrollY || window.pageYOffset;
  const positioningMethod = [TipDirections.top, TipDirections.bottom].includes(
    direction.value
  )
    ? positionForTopBottomDirections
    : positionForLeftRightDirections;

  positioningMethod({
    menuPosition,
    pixelsScrolledX,
    pixelsScrolledY,
  });
}

function positionForTopBottomDirections({
  menuPosition,
  pixelsScrolledX,
  pixelsScrolledY,
}) {
  top.value =
    direction.value === TipDirections.bottom
      ? menuPosition.bottom + 10 + pixelsScrolledY
      : menuPosition.top - 15 - popup.value.offsetHeight + pixelsScrolledY;

  left.value =
    menuPosition.left +
    0.5 +
    (trigger.value.offsetWidth - popup.value.offsetWidth) / 2 +
    pixelsScrolledX;
}

function positionForLeftRightDirections({
  menuPosition,
  pixelsScrolledX,
  pixelsScrolledY,
}) {
  top.value =
    menuPosition.top +
    (trigger.value.offsetHeight - 0.5 - popup.value.offsetHeight) / 2 +
    pixelsScrolledY;

  left.value =
    direction.value === TipDirections.left
      ? menuPosition.left - 10 - popup.value.offsetWidth + pixelsScrolledX
      : menuPosition.right + 15 + pixelsScrolledX;
}

async function show() {
  dataVisible.value = true;
  positionListen(true);

  await nextTick(() => {
    position();
    trigger.value.focus();
  });
}

function hide() {
  dataVisible.value = false;
  positionListen(true);
}

function toggle(isVisible) {
  if (isVisible) {
    hide();
    return;
  }
  show();
}

function onTriggerTab(ev) {
  if (!ev.shiftKey) {
    if (contentAfter.value) {
      // move focus before content before tab press
      beforeContent.value.focus();
    }
    return;
  }

  if (contentAfter.value) return;
  // move focus after content before tab press
  afterContent.value.focus();
}

function checkFocusOut(ev) {
  dataVisible.value =
    ev.relatedTarget === trigger.value ||
    popup.value.contains(ev.relatedTarget);
}

function focusBeforeContent(ev) {
  if (contentAfter.value) {
    if (popup.value.contains(ev.relatedTarget)) {
      trigger.value.focus();
    }
    return;
  }

  trigger.value.focus();
  dataVisible.value = contentAfter.value;
}

function focusAfterContent(ev) {
  if (!contentAfter.value) {
    if (popup.value.contains(ev.relatedTarget)) {
      trigger.value.focus();
    }
  } else {
    trigger.value.focus();
    dataVisible.value = !contentAfter.value;
  }
}

function preventFocusOut() {
  // This is here to prevent focus being lost if the user clicks on the contents of the interactive tooltip
}

onBeforeUnmount(() => {
  positionListen(false);
  if (!popupEl.value) return;
  // move back to where it came from
  root.value.appendChild(popupEl.value);
});
</script>
