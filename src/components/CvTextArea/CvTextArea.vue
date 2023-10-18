<template>
  <div :class="`cv-text-area ${carbonPrefix}--form-item`">
    <label
      :for="cvId"
      :class="[
        `${carbonPrefix}--label`,
        {
          [`${carbonPrefix}--label--disabled`]: $attrs.disabled,
          [`${carbonPrefix}--visually-hidden`]: hideLabel,
        },
      ]"
    >
      {{ label }}
    </label>
    <div
      :class="`${carbonPrefix}--text-area__wrapper`"
      :data-invalid="isInvalid || null"
    >
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-area__invalid-icon`"
      />
      <textarea
        :id="cvId"
        :aria-invalid="isInvalid || null"
        :aria-describedby="isInvalid ? errorId : undefined"
        :class="[
          `${carbonPrefix}--text-area`,
          {
            [`${carbonPrefix}--text-area--invalid`]: isInvalid,
            [`${carbonPrefix}--text-area--light`]: isLight,
          },
        ]"
        v-bind="$attrs"
        :value="modelValue"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
    <div
      v-if="isInvalid"
      :id="errorId"
      :class="`${carbonPrefix}--form-requirement`"
    >
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div
      v-if="isHelper"
      :class="[
        `${carbonPrefix}--form__helper-text`,
        { [`${carbonPrefix}--form__helper-text--disabled`]: $attrs.disabled },
      ]"
    >
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots, onBeforeMount, onBeforeUpdate } from 'vue';
import { WarningFilled16 } from '@carbon/icons-vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';

const props = defineProps({
  helperText: { type: String, default: undefined },
  hideLabel: { type: Boolean, default: false },
  invalidMessage: { type: String, default: undefined },
  label: { type: String, default: undefined },
  modelValue: { type: String, default: undefined },
  ...propsCvId,
  ...propsTheme,
});
defineEmits(['update:modelValue']);
const cvId = useCvId(props);

// DOM
const slots = useSlots();

// Data
const isHelper = ref(false);
const isInvalid = ref(false);
const isLight = useIsLight(props);

// Computed
const errorId = computed(() => `error-${cvId.value}`);

// Methods
function checkSlots() {
  // NOTE: this.$slots is not reactive so needs to be managed on updated
  isInvalid.value = !!(
    props.invalidMessage?.length || slots['invalid-message']
  );
  isHelper.value =
    !isInvalid.value && !!(props.helperText?.length || slots['helper-text']);
}

// Life Hooks
onBeforeMount(checkSlots);
onBeforeUpdate(checkSlots);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
