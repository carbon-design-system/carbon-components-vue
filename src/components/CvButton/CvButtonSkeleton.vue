<template>
  <button disabled :class="buttonClasses" type="button"></button>
</template>

<script setup>
import {
  props as commonCvButtonProps,
  useCvButtonCommon,
} from './CvButtonCommon';

const props = defineProps({
  /**
   * Size of the button
   */
  size: commonCvButtonProps.size,
});

const { buttonClasses } = useCvButtonCommon(undefined, props.size, true);
</script>
