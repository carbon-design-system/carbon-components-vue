<template>
  <button :class="buttonClasses" :disabled="disabled || skeleton">
    <slot v-if="!skeleton" />

    <cv-svg
      v-if="!skeleton && icon"
      :svg="icon"
      :class="`${carbonPrefix}--btn__icon`"
    />
  </button>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import {
  props as commonCvButtonProps,
  useCvButtonCommon,
} from './CvButtonCommon';
import CvSvg from '../CvSvg/_CvSvg';

const { disabled, icon, kind, size } = commonCvButtonProps;

export default {
  name: 'CvButton',
  components: { CvSvg },
  props: {
    disabled,
    icon,
    kind,
    size,
    skeleton: Boolean,
  },
  setup(props) {
    const { buttonClasses } = useCvButtonCommon(
      props.kind,
      props.size,
      props.skeleton
    );

    return {
      buttonClasses,
      carbonPrefix,
    };
  },
};
</script>

<style lang="scss"></style>
