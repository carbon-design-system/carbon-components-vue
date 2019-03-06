<template>
  <button
    class="cv-button"
    :class="[
      'bx--btn',
      'bx--btn--' + kind.toLowerCase(),
      { 'bx--btn--sm': small },
    ]"
    v-on="$listeners"
    role="button"
  >
    <slot></slot>

    <component
      v-if="icon !== undefined && typeof icon === 'object'"
      :is="icon"
      class="bx--btn__icon"
    />
    <svg v-if="icon || iconHref" class="bx--btn__icon">
      <use :href="icon || iconHref"></use>
    </svg>
  </button>
</template>

<script>
import { componentsX } from '../../_internal/_feature-flags';

export default {
  name: 'CvButton',
  props: {
    icon: componentsX
      ? {
          type: [String, Object],
          default: null,
          validator(val) {
            if (!val || typeof val === 'string') {
              return true;
            }
            return val.render !== null;
          },
        }
      : null,
    iconHref: {
      type: String,
      default: null,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (componentsX && val !== null) {
            console.warn(
              'CvButton: iconHref deprecated in favour of icon to be removed in future versions.'
            );
          }
        }
        return true;
      },
    },
    kind: {
      type: String,
      default: 'primary',
      validator: val =>
        [
          'primary',
          'secondary',
          'tertiary',
          'ghost',
          'danger',
          'danger--primary',
        ].includes(val),
    },
    small: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss"></style>
