<template>
  <component
    :is="formItem ? 'div' : CvEmpty"
    :class="`cv-search ${carbonPrefix}--form-item`"
  >
    <div
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
      ref="elSearch"
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
        :class="`${carbonPrefix}--search-input`"
        v-bind="$attrs"
        v-model="internalSearchText"
        @input="onInput"
        type="text"
        ref="elInput"
        :placeholder="placeholder"
        :aria-labelledby="uid"
        @blur="checkFocus"
        :disabled="disabled ? 'true' : undefined"
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
        <Close16 />
      </button>
    </div>
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';
import { useCvId, props as propsCvId } from '../../use/cvId';
import SearchIcon from '@carbon/icons-vue/es/search/16';
import Close16 from '@carbon/icons-vue/es/close/16';
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
  label: String,
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
    validator: () => {
      console.error('Error: Use size property: sm, lg or xl (default)');
      return false;
    },
  },
  /**
   * @deprecated use size
   */
  large: {
    type: Boolean,
    validator: () => {
      console.error('Error: Use size property: sm, lg or xl (default)');
      return false;
    },
  },
  /**
   * Optionally provide the default value of the `<input>`
   */
  value: String,
  /**
   * @deprecated use value
   */
  modelValue: {
    type: String,
    default: undefined,
    validator: () => {
      console.warn('Deprecated: use v-model:value instead');
      return true;
    },
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
    validator: () => {
      console.warn('Deprecated: probably you want expandable=true');
      return true;
    },
  },
  ...propsTheme,
  ...propsCvId,
});
const uid = useCvId(props, true);
const isLight = useIsLight(props);

const clearVisible = ref(props.value ? props.value.length : false);
const internalSearchText = ref(props.value || props.modelValue);
const searchActive = ref(false);
watch(
  () => props.value,
  () => {
    clearVisible.value = props.value ? props.value.length : false;
    internalSearchText.value = props.value;
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

const emit = defineEmits(['input', 'update:value', 'update:modelValue']);
watch(internalSearchText, () => {
  emit('input', internalSearchText.value);
  emit('update:value', internalSearchText.value);
  if (props.modelValue) {
    console.warn('Deprecated: use v-model:value instead');
    emit('update:modelValue', internalSearchText.value);
  }
});
function onClearClick(ev) {
  internalSearchText.value = '';
  clearVisible.value = false;
  checkFocus(ev);
}
function onInput() {
  clearVisible.value = internalSearchText.value.length > 0;
  return emit('input', internalSearchText.value);
}
const elInput = ref(null);
const isExpanded = computed(() => {
  return props.expandable && searchActive.value;
});
function toggleActive(force) {
  if (typeof force === 'boolean') searchActive.value = force;
  else if (internalSearchText.value?.length > 0) searchActive.value = true;
  else searchActive.value = !searchActive.value;

  if (searchActive.value) {
    elInput.value?.focus();
  }
}
const elSearch = ref(null);
function checkFocus(ev) {
  if (props.expandable) {
    if (!elSearch.value?.contains(ev.relatedTarget)) {
      searchActive.value = internalSearchText.value?.length > 0;
    }
  }
}
</script>
