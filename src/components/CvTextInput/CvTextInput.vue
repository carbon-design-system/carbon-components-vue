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
      :class="[`${carbonPrefix}--text-input__field-wrapper`]"
      :data-invalid="isInvalid"
    >
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--text-input__invalid-icon`"
      />
      <input
        :id="cvId"
        :class="[
          `${carbonPrefix}--text-input`,
          {
            [`${carbonPrefix}--text-input--invalid`]: isInvalid,
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
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, ref, useSlots } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { WarningFilled16 } from '@carbon/icons-vue';

const props = defineProps({
  invalidMessage: { type: String, default: undefined },
  label: String,
  modelValue: String,
  ...propsCvId,
});

const cvId = useCvId(props);
const emit = defineEmits(['update:modelValue']);
const slots = useSlots();
const isInvalid = ref(false);

function updateMessageFlags() {
  isInvalid.value = !!(
    props.invalidMessage?.length || slots['invalid-message']
  );
}

onBeforeMount(updateMessageFlags);
onBeforeUpdate(updateMessageFlags);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
