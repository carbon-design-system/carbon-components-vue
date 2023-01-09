<template>
  <div
    data-overflow-menu
    :class="`cv-overflow-menu ${carbonPrefix}--overflow-menu`"
    :id="uid"
    ref="el"
  >
    <button
      :class="[
        `${carbonPrefix}--overflow-menu__trigger ${carbonPrefix}--tooltip__trigger`,
        `${carbonPrefix}--tooltip--a11y`,
        {
          [`${carbonPrefix}--tooltip--${tipPosition}`]: label,
          [`${carbonPrefix}--tooltip--align-${tipAlignment}`]: label,
          [`${carbonPrefix}--overflow-menu--open`]: open,
        },
      ]"
      aria-haspopup="true"
      type="button"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="`${uid}-menu`"
      :aria-labelledby="`${uid}`"
      :id="`${uid}-trigger`"
      ref="trigger"
      @click="doToggle"
      @keydown.space.prevent
      @keyup.space.prevent="doToggle"
      @keydown.enter.prevent="doToggle"
      @keydown.tab="onOverflowMenuTab"
    >
      <span :class="`${carbonPrefix}--assistive-text`" v-if="label">{{
        label
      }}</span>

      <slot name="trigger">
        <OverflowMenuVertical16
          :class="`${carbonPrefix}--overflow-menu__icon`"
        />
      </slot>
    </button>
    <div
      :class="[
        `${carbonPrefix}--overflow-menu-options`,
        {
          [`${carbonPrefix}--overflow-menu--flip`]: flipMenu,
          [`${carbonPrefix}--overflow-menu-options--open`]: open,
        },
      ]"
      tabindex="-1"
      ref="popup"
      :aria-labelledby="`${uid}-trigger`"
      :id="`${uid}-menu`"
      :style="{ left: left + 'px', top: top + 'px' }"
      @focusout="checkFocusOut"
      @mousedown.prevent="preventFocusOut"
    >
      <div
        class="cv-overflow-menu__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px"
        @focus="focusBeforeContent"
      />
      <ul :class="`${carbonPrefix}--overflow-menu-options__content`">
        <slot></slot>
      </ul>
      <div
        class="cv-overflow-menu__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px"
        @focus="focusAfterContent"
      />
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import OverflowMenuVertical16 from '@carbon/icons-vue/es/overflow-menu--vertical/16';
import { computed, nextTick, onBeforeMount, onUnmounted, ref } from 'vue';
import { getBus, removeBus } from '../../global/component-utils/event-bus';
const props = defineProps({
  /**
   * assistive text shown as a tooltip
   */
  label: String,
  /**
   * moves caret from right to left of popup menu
   */
  flipMenu: { type: Boolean, default: false },
  /**
   * The menu will open upwards instead of the default
   */
  up: { type: Boolean, default: false },
  /**
   * optional offset setting for left and top position.
   * e.g. { left: 0, top: 200 }
   */
  offset: {
    type: Object,
    validator(value) {
      return value && value.left !== undefined && value.top !== undefined;
      // value.hasOwnProperty('left') && value.hasOwnProperty('top');
    },
  },
  /**
   * top, left, right(default) or bottom
   */
  tipPosition: {
    type: String,
    default: 'right',
    validator: val => ['top', 'left', 'bottom', 'right'].includes(val),
  },
  /**
   * start, center(default) or end
   */
  tipAlignment: {
    type: String,
    default: 'center',
    validator: val => ['start', 'center', 'end'].includes(val),
  },
  ...propsCvId,
});
const uid = useCvId(props, true);
const open = ref(false);
const left = ref(-9999); // offscreen,
const top = ref(0);

const offsetLeft = computed(() => {
  return props.offset ? props.offset.left : 0;
});
const offsetTop = computed(() => {
  return props.offset ? props.offset.top : 0;
});

let bus = undefined;
onBeforeMount(() => {
  bus = getBus(uid.value);
  bus.on('cv:close', doClose);
  bus.on('cv:click', menuItemClick);
});
onUnmounted(() => {
  removeBus(uid.value);
});

const trigger = ref(null);
const popup = ref(null);
function checkFocusOut(ev) {
  if (open.value) {
    if (
      ev.relatedTarget === null ||
      !(
        trigger.value === ev.relatedTarget ||
        popup.value.contains(ev.relatedTarget)
      )
    ) {
      open.value = false;
      positionListen(false);

      // DO NOT FOCUS if relatedTarget is not null, as focus is going somewhere
      if (!ev.relatedTarget) {
        nextTick(() => {
          doFocus();
        });
      }
    }
  }
}

const emit = defineEmits(['change']);
function menuItemClick(value) {
  emit('change', `${value}`);
  open.value = false;
  positionListen(false);
  nextTick(() => {
    doFocus();
  });
}
function doClose() {
  open.value = false;
  positionListen(false);
}
function positionListen(on) {
  if (on) {
    window.addEventListener('scroll', positionMenu);
    window.addEventListener('resize', positionMenu);
  } else {
    window.removeEventListener('scroll', positionMenu);
    window.removeEventListener('resize', positionMenu);
  }
}

const el = ref(null);
async function positionMenu() {
  if (open.value) {
    const menuPosition = el.value.getBoundingClientRect();
    return nextTick(() => {
      const pixelsScrolledX = window.scrollX || window.pageXOffset;
      const pixelsScrolledY = window.scrollY || window.pageYOffset;
      if (props.flipMenu) {
        left.value =
          menuPosition.left +
          offsetLeft.value -
          popup.value.offsetWidth +
          el.value.offsetWidth +
          pixelsScrolledX;
      } else {
        left.value = menuPosition.left + offsetLeft.value + pixelsScrolledX;
      }
      if (props.up) {
        top.value =
          menuPosition.top +
          offsetTop.value -
          popup.value.offsetHeight +
          pixelsScrolledY;
      } else {
        top.value = menuPosition.left + offsetLeft.value + pixelsScrolledX;
      }
    });
  }
}
function doFocus() {
  let focusOn;
  if (open.value) {
    // set focus somewhere sensible, first focusable item or leave on overflow
    let focusOnList = popup.value.querySelectorAll(
      `.${carbonPrefix}--overflow-menu-options__btn, button, link, input, textarea, [contentEditable="true"], [tabindex]`
    );
    for (let tryOn of focusOnList) {
      if (
        // don't focus on before after or something that can't be tabbed to
        !(
          tryOn.classList.contains('cv-overflow-menu__before-content') ||
          tryOn.classList.contains('cv-overflow-menu__after-content') ||
          tryOn.tabindex < 0
        )
      ) {
        focusOn = tryOn;
        break;
      }
    }
    if (!focusOn) {
      focusOn = el.value;
    }
  } else {
    focusOn = el.value;
  }
  focusOn.focus();
}
async function doToggle() {
  open.value = !open.value;

  // await positionMenu otherwise it can race doFocus.
  // On initial open the menu is positioned 0,0 causing a jump
  await positionMenu();
  positionListen(open.value);
  await nextTick(() => {
    doFocus();
  });
}
const beforeContent = ref(null);
function onOverflowMenuTab(ev) {
  if (!ev.shiftKey) {
    // move focus before content tab press
    beforeContent.value.focus();
  }
}
function focusBeforeContent(ev) {
  if (popup.value.contains(ev.relatedTarget)) {
    trigger.value.focus();
    open.value = false;
  }
}
function focusAfterContent() {
  trigger.value.focus();
  open.value = false;
}
function preventFocusOut() {
  // This is here to prevent focus being lost if the user clicks on the contents of the interactive tool tip
}
</script>
