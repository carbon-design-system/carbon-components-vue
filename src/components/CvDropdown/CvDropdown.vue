<!--
  Carbon Style Dropdown

  Attributes:
    placeholder: Placeholder text displayed before any  selection is made.

  Usage:
    <cv-dropdown placeholder="Choose an option">
      <cv-dropdown-item value="10">Option 1</cv-dropdown-item>
      <cv-dropdown-item value="20">Option 2</cv-dropdown-item>
      <cv-dropdown-item value="30">Option 3</cv-dropdown-item>
      <cv-dropdown-item value="40">Option 4</cv-dropdown-item>
      <cv-dropdown-item value="50">Option 5</cv-dropdown-item>
    </cv-dropdown>

-->

<template>
  <div :id="uid" ref="el" :class="{ [`${carbonPrefix}--form-item`]: formItem }">
    <div
      :class="[
        `${carbonPrefix}--dropdown__wrapper`,
        `${carbonPrefix}--list-box__wrapper`,
        {
          [`${carbonPrefix}--dropdown__wrapper--inline`]: inline,
          [`${carbonPrefix}--list-box__wrapper--inline`]: inline,
          'cv-dropdown': !formItem,
        },
      ]"
      :style="wrapperStyleOverride"
    >
      <label
        v-if="label"
        :id="`${uid}-label`"
        :class="[
          `${carbonPrefix}--label`,
          { [`${carbonPrefix}--label--disabled`]: disabled },
        ]"
        >{{ label }}</label
      >

      <div
        ref="listBox"
        :aria-label="ariaLabel"
        :class="[
          `${carbonPrefix}--dropdown`,
          `${carbonPrefix}--dropdown--${size}`,
          {
            [`${carbonPrefix}--dropdown--show-selected`]: !hideSelected,
            [`${carbonPrefix}--dropdown--warning`]: isWarning,
            [`${carbonPrefix}--list-box--warning`]: isWarning,
            [`${carbonPrefix}--dropdown--invalid`]: data.isInvalid,
            [`${carbonPrefix}--list-box`]: true,
            [`${carbonPrefix}--dropdown--light`]: isLight,
            [`${carbonPrefix}--list-box--up`]: up,
            [`${carbonPrefix}--dropdown--open`]: open,
            [`${carbonPrefix}--list-box--expanded`]: open,
            [`${carbonPrefix}--dropdown--disabled`]: disabled,
            [`${carbonPrefix}--dropdown--inline`]: inline,
          },
        ]"
        :data-invalid="data.isInvalid || null"
        :data-value="dataValue"
        data-dropdown
        v-bind="$attrs"
        @click="onClick"
        @keydown.down.prevent="onDown"
        @keydown.up.prevent="onUp"
        @keydown.enter.prevent="onClick"
        @keydown.esc.prevent="onEsc"
        @keydown.tab="onTab"
      >
        <button
          ref="button"
          :aria-controls="`${uid}-menu`"
          :aria-disabled="disabled || null"
          :aria-expanded="open ? 'true' : 'false'"
          :aria-labelledby="ariaLabeledBy"
          :class="`${carbonPrefix}--list-box__field`"
          :disabled="disabled || null"
          aria-haspopup="true"
          type="button"
        >
          <warning-alt-filled
            v-if="isWarning"
            :class="`${carbonPrefix}--list-box__invalid-icon ${carbonPrefix}--list-box__invalid-icon--warning`"
          />
          <warning-filled
            v-else-if="data.isInvalid"
            :class="`${carbonPrefix}--list-box__invalid-icon`"
          />
          <span
            :id="`${uid}-value`"
            :class="`${carbonPrefix}--list-box__label`"
            data-test="internalCaption"
          >
            <slot name="internal-caption">{{ internalCaption }}</slot>
          </span>
          <div
            :class="[
              `${carbonPrefix}--list-box__menu-icon`,
              { [`${carbonPrefix}--list-box__menu-icon--open`]: open },
            ]"
          >
            <chevron-down :aria-label="open ? 'Close menu' : 'Open menu'" />
          </div>
        </button>
        <ul
          :id="`${uid}-menu`"
          ref="dropList"
          :aria-hidden="!open ? 'true' : 'false'"
          :aria-labelledby="`${uid}-label`"
          :class="`${carbonPrefix}--list-box__menu`"
          role="menu"
          tabindex="-1"
        >
          <slot>
            <cv-dropdown-item v-for="item in items" :key="item" :value="item">{{
              item
            }}</cv-dropdown-item>
          </slot>
        </ul>
      </div>
      <div v-if="data.isInvalid" :class="`${carbonPrefix}--form-requirement`">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>
      <div v-else-if="isWarning" :class="`${carbonPrefix}--form-requirement`">
        <slot name="warning-message">{{ warningMessage }}</slot>
      </div>
      <div
        v-else-if="data.isHelper"
        :aria-disabled="disabled || null"
        :class="[
          `${carbonPrefix}--form__helper-text`,
          { [`${carbonPrefix}--form__helper-text--disabled`]: disabled },
        ]"
      >
        <slot name="helper-text">{{ helperText }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { props as propsCvTheme, useIsLight } from '../../use/cvTheme';
import CvDropdownItem from './CvDropdownItem.vue';
import ChevronDown from '@carbon/icons-vue/es/chevron--down/16';
import WarningFilled from '@carbon/icons-vue/es/warning--filled/16';
import WarningAltFilled from '@carbon/icons-vue/es/warning--alt--filled/16';
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: { type: String, default: 'Dropdown' },
  /**
   * Disable the control
   */
  disabled: { type: Boolean, default: false },
  /**
   * Add carbon form classes to the dropdown list
   */
  formItem: { type: Boolean, default: true },
  /**
   * Provide helper text that is used alongside the control label for additional help
   */
  helperText: { type: String, default: undefined },
  /**
   * Not documented in react. Removes `dropdown--show-selected` class from component.
   */
  hideSelected: { type: Boolean, default: false },
  /**
   * Specify whether you want the inline version of this control
   */
  inline: { type: Boolean, default: false },
  /**
   * Message which is displayed if the value is invalid.
   */
  invalidMessage: { type: String, default: undefined },
  /**
   * an array of strings to display as choices.
   */
  items: {
    type: Array,
    validator(arr) {
      if (!Array.isArray(arr)) {
        console.warn('CvDropdown - items must be in array');
      }
      return arr;
    },
    default: () => [],
  },
  /**
   * Generic label that will be used as the textual representation of what this field is for
   */
  label: { type: String, default: undefined },
  /**
   * Value shown when nothing has been selected
   */
  placeholder: {
    type: String,
    default: 'Choose an option',
  },
  /**
   * Specify the size of the ListBox. Currently, supports either `sm`, `md` or `lg` as an option.
   * @values sm,md,lg
   */
  size: {
    type: String,
    default: 'md',
    validator: val => ['sm', 'md', 'lg'].includes(val),
  },
  /**
   * Specify the direction of the dropdown. Can be either true (top) or (false) bottom.
   */
  up: { type: Boolean, default: false },
  /**
   * Provide the text that is displayed and put the control in warning state
   */
  warningMessage: { type: String, default: undefined },
  /**
   * Render with a value already selected. Available as `v-model`.
   */
  modelValue: {
    type: String,
    default: undefined,
  },

  ...propsCvId,
  ...propsCvTheme,
});
const uid = useCvId(props, true);
const isLight = useIsLight(props);
const dataValue = ref(props.modelValue);
provide('dropdown-selected', dataValue);
const focusItem = ref(undefined);
provide('dropdown-focus', focusItem);
const dataCaption = ref(undefined);
provide('dropdown-caption', dataCaption);
/**
 * List of children values
 * @type {Ref<UnwrapRef<[{value:string}]>>}
 */
const itemsList = ref([]);
provide('dropdown-items', itemsList);
const open = ref(false);
const data = reactive({
  isHelper: false,
  isInvalid: undefined,
  isWarning: false,
});
const slots = useSlots();
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  data.isInvalid =
    !!(slots['invalid-message'] || props.invalidMessage?.length) || undefined;
  data.isWarning = !!(slots['warning-message'] || props.warningMessage?.length);
  data.isHelper = !!(slots['helper-text'] || props.helperText?.length);
}
const isWarning = computed(() => {
  if (data.isInvalid) return false;
  else return !!data.isWarning;
});
onMounted(checkSlots);
onUpdated(checkSlots);
const emit = defineEmits(['update:modelValue', 'change']);
watch(
  () => props.modelValue,
  () => {
    dataValue.value = props.modelValue;
    dataCaption.value = undefined;
  }
);
watch(dataValue, () => {
  emit('change', dataValue.value);
  emit('update:modelValue', dataValue.value);
});
watch(open, () => {
  focusItem.value = '';
});
const ariaLabeledBy = computed(() => {
  if (props.label) {
    return `${uid.value}-label ${uid.value}-value`;
  } else {
    return `${uid.value}-value`;
  }
});
const internalCaption = computed(() => {
  if (dataCaption.value) {
    return dataCaption.value;
  } else {
    return props.placeholder;
  }
});

const wrapperStyleOverride = computed(() => {
  // ensures correct width when used inside tabs component
  return { width: '100%' };
});
const el = ref(null);
function onClickOut() {
  open.value = false;
}
onClickOutside(el, onClickOut);

/**
 * Set the focus on one of the items in the dropdown list
 * @param {boolean} up - Direction to move focus
 */
function doMove(up) {
  // re-query could have changed
  const currentFocusEl = el.value?.querySelector('.cv-dropdown-item :focus');
  const numChildren = itemsList.value.length || 0;

  const currentFocusValue =
    currentFocusEl?.parentNode?.getAttribute('data-value');

  const currentFocusIndex = itemsList.value?.findIndex(
    child => child.value === currentFocusValue
  );

  const direction = up ? -1 : 1;
  let nextFocusIndex = currentFocusIndex + direction;
  if (nextFocusIndex >= numChildren) nextFocusIndex = 0;
  else if (nextFocusIndex < 0) nextFocusIndex = numChildren - 1;
  focusItem.value = itemsList.value[nextFocusIndex]?.value;
}
const dropList = ref(null);
function doFocus() {
  nextTick(() => {
    if (open.value) {
      dropList.value?.focus();
    } else {
      focus();
    }
  });
}
function onDown() {
  if (!open.value) {
    open.value = true;
  } else {
    doMove(false);
  }
}
function onUp() {
  if (open.value) {
    doMove(true);
  }
}
function onEsc() {
  open.value = false;
  doFocus();
}
const button = ref(null);
const listBox = ref(null);
function onTab(ev) {
  if (open.value) {
    if (button.value === ev.target) {
      // button has focus ensure we are closed
      open.value = false;
    } else if (ev.target === null || listBox.value?.contains(ev.target)) {
      // list has focus, close and return focus to dropdown
      open.value = false;
      doFocus();
      ev.preventDefault();
    }
  }
}
function onClick(ev) {
  if (props.disabled) {
    ev.preventDefault();
  } else {
    open.value = !open.value;
    doFocus(); // open or close (Some browsers do not focus on button when clicked)

    let target = ev.target;
    while (
      !target.classList.contains(`${carbonPrefix}--dropdown-link`) &&
      dropList.value?.contains(target)
    ) {
      target = target.parentNode; // try next one up
    }

    if (target.classList.contains(`${carbonPrefix}--dropdown-link`)) {
      const targetItemEl = target.parentNode;
      dataValue.value = targetItemEl.getAttribute('data-value');
    }
  }
}
</script>
