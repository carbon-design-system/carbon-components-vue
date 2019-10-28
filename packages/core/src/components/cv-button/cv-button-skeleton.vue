<template>
  <button
    disabled
    class="bx--btn bx--skeleton"
    :class="{
      'bx--btn--sm': size === 'small' || (size === undefined && small),
      'bx--btn--field': size === 'field',
    }"
    type="button"
  ></button>
</template>

<script>
export default {
  name: 'CvButtonSkeleton',
  props: {
    small: {
      type: Boolean,
      default: false,
      validator(val) {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvButton: small deprecated in favour of size.');
        }
        return true;
      },
    },
    size: { type: String, default: undefined, validator: val => ['', 'field', 'small'].includes(val) },
  },
};
</script>
