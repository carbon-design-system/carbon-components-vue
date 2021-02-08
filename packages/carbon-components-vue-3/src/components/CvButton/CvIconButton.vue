<template>
  <button :class="buttonClasses" :disabled="disabled || skeleton">
    <component :is="icon" />
  </button>
</template>

<script>
import {
  props as commonCvButtonProps,
  useCvButtonCommon
} from "./CvButtonCommon";

const { disabled, icon, kind, size, skeleton } = commonCvButtonProps;

export default {
  name: "CvIconButton",
  props: {
    disabled,
    icon,
    kind,
    size,
    skeleton
    // alternative use of commonCvButtonProps
    // disabled: commonCvButtonProps.disabled,
    // icon: commonCvButtonProps.icon,
    // kind: commonCvButtonProps.kind,
    // size: commonCvButtonProps.size,
    // skeleton: commonCvButtonProps.skeleton
  },
  setup(props) {
    const { buttonClasses } = useCvButtonCommon(
      true,
      props.kind,
      props.size,
      props.skeleton
    );

    return {
      buttonClasses
    };
  }
};
</script>

<style lang="scss"></style>
