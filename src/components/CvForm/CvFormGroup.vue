<template>
  <fieldset
    :class="[
      `cv-form-group ${carbonPrefix}--fieldset`,
      { [`${carbonPrefix}--fieldset--no-margin`]: noMargin },
    ]"
    :data-invalid="invalid"
  >
    <legend :class="`${carbonPrefix}--label`">
      <slot name="label"></slot>
    </legend>
    <slot name="content"></slot>
    <div v-if="message" :class="`${carbonPrefix}--form__requirements`">
      {{ message }}
    </div>
  </fieldset>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  invalid: Boolean,
  message: String,
  noMargin: Boolean,
});
</script>
