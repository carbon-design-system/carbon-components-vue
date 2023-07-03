<template>
  <div :class="{ [`${carbonPrefix}--form-item`]: formItem }">
    <input
      v-bind="$attrs"
      :class="[
        `${carbonPrefix}--toggle-input`,
        { 'bx--toggle-input--small': small },
      ]"
      type="checkbox"
      :id="cvId"
      :checked="isChecked"
      @change="onChange"
      :value="value"
      ref="input"
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
  small: Boolean,
  label: String,
  formItem: { type: Boolean, default: true },
  hideLabel: Boolean,
  ...propsCvId,
  ...propsCvCheck,
});

const emit = defineEmits(['update:modelValue', 'change']);
const { onChange, isChecked } = useCheck(toRefs(props), emit);

const cvId = useCvId(props);
</script>
