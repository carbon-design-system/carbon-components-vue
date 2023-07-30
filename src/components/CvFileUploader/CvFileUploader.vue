<template>
  <cv-form-item class="cv-file-uploader">
    <p :class="`${carbonPrefix}--file--label`">{{ label }}</p>
    <p :class="`${carbonPrefix}--label-description`">{{ helperText }}</p>
  </cv-form-item>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  helperText: String,
  label: String,
});
</script>
