<template>
  <div
    :class="[
      { [`${carbonPrefix}--form-item`]: formItem },
      `${carbonPrefix}--checkbox-wrapper`,
    ]"
  >
    <input
      ref="input"
      v-bind="$attrs"
      type="checkbox"
      :class="`${carbonPrefix}--checkbox`"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      :value="value"
      :id="cvId"
      data-testid="checkbox"
    /><label
      :for="cvId"
      :class="[
        `${carbonPrefix}--checkbox-label`,
        {
          [`${carbonPrefix}--label--disabled`]:
            $attrs.disabled !== undefined && this.$attrs.disabled,
          [`${carbonPrefix}--checkbox-label__focus`]: hasFocus,
        },
      ]"
      ><span
        :class="[
          `${carbonPrefix}--checkbox-label-text`,
          { [`${carbonPrefix}--visually-hidden`]: hideLabel },
        ]"
        dir="auto"
        >{{ label }}</span
      ></label
    >
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import { carbonPrefix } from '@/global/settings';
import { useCheck, props as propsCvCheck } from '../../use/cvCheck';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  hideLabel: { type: Boolean, default: null },
  label: { type: String, default: null },
  formItem: { type: Boolean, default: true },
  ...propsCvCheck,
  ...propsCvId,
});

// Track focus
let hasFocus = ref(false);
function onFocus() {
  hasFocus = true;
}
function onBlur() {
  hasFocus = false;
}

const cvId = useCvId(props);

const emit = defineEmits(['modelEvent', 'change']);
const { onChange, isChecked } = useCheck(toRefs(props), emit);
</script>

<style scoped></style>
