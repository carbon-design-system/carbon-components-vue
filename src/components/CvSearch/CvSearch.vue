<template>
  <component
    :is="formItem ? 'div' : CvEmpty"
    :class="[`cv-search`, `${carbonPrefix}--form-item`, $attrs.class]"
  >
    <div
      ref="elSearch"
      :aria-label="internalAriaLabel"
      :aria-labelledby="internalAriaLabelBy"
      :class="[
        `${carbonPrefix}--search`,
        `${carbonPrefix}--search--${size}`,
        {
          [`${carbonPrefix}--search--expandable`]: expandable,
          [`${carbonPrefix}--search--expanded`]: isExpanded,
          [`${carbonPrefix}--search--disabled`]: disabled,
          [`${carbonPrefix}--search--light`]: isLight,
          'cv-search': !formItem,
        },
      ]"
      role="search"
    >
      <div
        :class="`${carbonPrefix}--search-magnifier`"
        @click="toggleActive(true)"
        @blur="checkFocus"
      >
        <search-icon :class="`${carbonPrefix}--search-magnifier-icon`" />
      </div>

      <label v-show="label" :for="uid" :class="`${carbonPrefix}--label`">{{
        label
      }}</label>

      <input
        :id="uid"
        v-bind="$attrs"
        ref="elInput"
        v-model="internalSearchText"
        role="searchbox"
        :class="`${carbonPrefix}--search-input`"
        type="text"
        :placeholder="placeholder"
        :aria-labelledby="uid"
        :disabled="disabled ? 'true' : undefined"
        @input="onInput"
        @blur="checkFocus"
        @click="toggleActive"
        @keydown.esc="onClearClick"
      />

      <button
        type="button"
        :class="[
          `${carbonPrefix}--search-close`,
          { [`${carbonPrefix}--search-close--hidden`]: !clearVisible },
        ]"
        :title="clearAriaLabel"
        :aria-label="clearAriaLabel"
        @click="onClearClick"
      >
        <close-icon />
      </button>
    </div>
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';
import { useCvId, props as propsCvId } from '../../use/cvId';
import SearchIcon from '@carbon/icons-vue/es/search/16';
import CloseIcon from '@carbon/icons-vue/es/close/16';
import { computed, ref, watch } from 'vue';
import { SEARCH_SIZES } from '.';
import CvEmpty from '../CvEmpty/_CvEmpty.vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  ariaLabel: { type: String, default: 'search input' },
  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  clearAriaLabel: { type: String, default: 'Clear search input' },
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: { type: Boolean, default: false },
  /**
   * Do no show full control until it has focus. Similar to deprecated toolbar search.
   */
  expandable: { type: Boolean, default: false },
  /**
   * Wrap search in `<div>` if part of a form
   */
  formItem: { type: Boolean, default: true },
  /**
   * @deprecated use expandable
   */
  kind: {
    type: String,
    default: undefined,
    validator: () => {
      console.warn('Deprecated: probably you want expandable=true');
      return true;
    },
  },
  /**
   * Provide the label text for the Search icon
   */
  label: { type: String, default: undefined },
  /**
   * Specify the search size ('sm', 'md', 'lg', 'xl')
   */
  size: {
    type: String,
    default: 'xl',
    validator: val => SEARCH_SIZES.includes(val),
  },
  /**
   * @deprecated use size
   */
  small: {
    type: Boolean,
    default: undefined,
    validator: val => {
      if (val !== undefined) {
        console.error('Error: Use size property: sm, lg or xl (default)');
        return false;
      }
      return true;
    },
  },
  /**
   * @deprecated use size
   */
  large: {
    type: Boolean,
    default: undefined,
    validator: val => {
      if (val !== undefined) {
        console.error('Error: Use size property: sm, lg or xl (default)');
        return false;
      }
      return true;
    },
  },
  /**
   * Optionally provide the default value of the `<input>`
   */
  modelValue: {
    type: String,
    default: undefined,
  },
  /**
   * Provide an optional placeholder text for the Search. Note: if the label and placeholder differ, VoiceOver on Mac will read both
   */
  placeholder: { type: String, default: 'Search' },
  /**
   * @deprecated
   */
  toolbarAriaLabel: {
    type: String,
    validator: s => {
      if (s) console.warn('Deprecated: probably you want expandable=true');
      return true;
    },
    default: undefined,
  },
  ...propsTheme,
  ...propsCvId,
});
const uid = useCvId(props, true);
const isLight = useIsLight(props);

const clearVisible = ref(props.modelValue ? props.modelValue.length : false);
const internalSearchText = ref(props.modelValue);
const searchActive = ref(false);
watch(
  () => props.modelValue,
  () => {
    clearVisible.value = props.modelValue ? props.modelValue.length : false;
    internalSearchText.value = props.modelValue;
  }
);

const internalAriaLabel = computed(() => {
  if (!props.label) return props.ariaLabel;
  else return undefined;
});
const internalAriaLabelBy = computed(() => {
  if (props.label) return uid.value;
  else return undefined;
});

const emit = defineEmits(['input', 'update:modelValue']);
watch(internalSearchText, () => {
  emit('input', internalSearchText.value);
  emit('update:modelValue', internalSearchText.value);
});
function onClearClick() {
  internalSearchText.value = '';
  clearVisible.value = false;
  if (props.expandable) {
    elInput.value?.focus();
  }
  checkFocus();
}
function onInput() {
  clearVisible.value = internalSearchText.value.length > 0;
}
const elInput = ref(null);
const isExpanded = computed(() => {
  return props.expandable && searchActive.value;
});
function toggleActive(force) {
  if (props.disabled) return;

  if (typeof force === 'boolean') searchActive.value = force;
  else if (internalSearchText.value?.length > 0) searchActive.value = true;
  else searchActive.value = !searchActive.value;

  if (searchActive.value) {
    elInput.value?.focus();
  }
}
const elSearch = ref(null);
function checkFocus() {
  if (props.disabled) return;

  if (props.expandable) {
    if (elInput.value !== document.activeElement)
      searchActive.value = internalSearchText.value?.length > 0;
  }
}
</script>
