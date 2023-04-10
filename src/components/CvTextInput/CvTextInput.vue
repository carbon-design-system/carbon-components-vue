<template>
  <div
    :class="[
      'cv-text-input',
      `${carbonPrefix}--form-item`,
      `${carbonPrefix}--text-input-wrapper`,
    ]"
  >
    <label :for="cvId" :class="[`${carbonPrefix}--label`]">
      {{ label }}
    </label>
    <div
      :class="[
        `${carbonPrefix}--text-input__field-wrapper`,
        { [`${carbonPrefix}--text-input__field-wrapper--warning`]: isWarn },
      ]"
      :data-invalid="isInvalid"
    >
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-input__invalid-icon`"
      />
      <WarningAltFilled16
        v-if="isWarn"
        :class="`${carbonPrefix}--text-input__invalid-icon ${carbonPrefix}--text-input__invalid-icon--warning`"
      />
      <input
        :id="cvId"
        :class="[
          `${carbonPrefix}--text-input`,
          {
            [`${carbonPrefix}--text-input--invalid`]: isInvalid,
            [`${carbonPrefix}--text-input--warning`]: isWarn,
          },
        ]"
        v-bind="$attrs"
        type="text"
        :value="modelValue"
        @input="$event => $emit('update:modelValue', $event.target.value)"
      />
    </div>
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div v-if="isWarn" :class="`${carbonPrefix}--form__requirement`">
      <slot name="warn-text">{{ warnText }}</slot>
    </div>
    <div v-if="isHelper" :class="[`${carbonPrefix}--form__helper-text`]">
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, ref, useSlots } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { WarningFilled16, WarningAltFilled16 } from '@carbon/icons-vue';

const props = defineProps({
  helperText: { type: String, default: undefined },
  invalidMessage: { type: String, default: undefined },
  label: String,
  modelValue: String,
  warnText: { type: String, default: undefined },
  ...propsCvId,
});

const cvId = useCvId(props);
const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const isInvalid = ref(false);
const isWarn = ref(false);
const isHelper = ref(false);

function updateMessageFlags() {
  isInvalid.value = !!(
    props.invalidMessage?.length || slots['invalid-message']
  );
  isWarn.value =
    !isInvalid.value && !!(props.warnText?.length || slots['warn-text']);
  isHelper.value =
    !isInvalid.value &&
    !isWarn.value &&
    !!(props.helperText?.length || slots['helper-text']);
}

onBeforeMount(updateMessageFlags);
onBeforeUpdate(updateMessageFlags);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
