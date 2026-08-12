<template>
  <button disabled :class="buttonClasses" type="button"></button>
</template>

<script setup>
import { ref, toRefs } from 'vue';
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

const { size } = toRefs(props);
const { buttonClasses } = useCvButtonCommon(ref(undefined), size, ref(true));
</script>
