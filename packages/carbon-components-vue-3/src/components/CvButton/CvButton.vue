<template>
  <button :class="buttonClasses" :disabled="disabled || skeleton">
    <slot v-if="!skeleton" />

    <cv-svg v-if="icon" :svg="icon" :class="`${carbonPrefix}--btn__icon`" />
  </button>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import { props as commonCvButtonProps, useCvButtonCommon } from './CvButtonCommon';
import CvSvg from '../CvSvg/_CvSvg';

const { disabled, icon, kind, size, skeleton } = commonCvButtonProps;

export default {
  name: 'CvButton',
  components: { CvSvg },
  props: {
    disabled,
    icon,
    kind,
    size,
    skeleton,
    // alternative use of commonCvButtonProps
    // disabled: commonCvButtonProps.disabled,
    // icon: commonCvButtonProps.icon,
    // kind: commonCvButtonProps.kind,
    // size: commonCvButtonProps.size,
    // skeleton: commonCvButtonProps.skeleton
  },
  setup(props) {
    const { buttonClasses } = useCvButtonCommon(false, props.kind, props.size, props.skeleton);

    return {
      buttonClasses,
      carbonPrefix,
    };
  },
};
</script>

<style lang="scss"></style>
