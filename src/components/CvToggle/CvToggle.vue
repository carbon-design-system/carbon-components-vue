<template>
  <div :class="{ [`${carbonPrefix}--form-item`]: formItem }">
    <input
      :id="cvId"
      ref="input"
      role="toggle"
      v-bind="$attrs"
      :class="[
        `${carbonPrefix}--toggle-input`,
        {
          [`${carbonPrefix}--toggle-input--small`]: small,
        },
      ]"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="onChange"
    />
    <label
      :class="`${carbonPrefix}--toggle-input__label`"
      :for="cvId"
      :aria-label="hiddenLabel"
    >
      {{ visibleLabel }}
      <span :class="`${carbonPrefix}--toggle__switch`">
        <svg
          :class="`${carbonPrefix}--toggle__check`"
          width="6px"
          height="5px"
          viewBox="0 0 6 5"
        >
          <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
        </svg>
        <span :class="`${carbonPrefix}--toggle__text--off`" aria-hidden="true">
          <slot name="text-left">Off</slot>
        </span>
        <span :class="`${carbonPrefix}--toggle__text--on`" aria-hidden="true">
          <slot name="text-right">On</slot>
        </span>
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { useCheck, props as propsCvCheck } from '../../use/cvCheck';

const hiddenLabel = computed(() => {
  return props.hideLabel ? props.label : undefined;
});

const visibleLabel = computed(() => {
  return props.hideLabel ? undefined : props.label;
});

const props = defineProps({
  /**
   * Specify the size of the Toggle. Default is medium. Set to `true` for small.
   */
  small: Boolean,
  /**
   * Label and aria-label for the toggle
   */
  label: {
    type: String,
    default: 'Toggle element',
  },
  /**
   * Set the carbon form-item class
   */
  formItem: { type: Boolean, default: true },
  /**
   * Visibly hide the toggle label
   */
  hideLabel: Boolean,
  ...propsCvId,
  ...propsCvCheck,
});

const emit = defineEmits(['update:modelValue', 'change']);
const { onChange, isChecked } = useCheck(toRefs(props), emit);

const cvId = useCvId(props);
</script>
