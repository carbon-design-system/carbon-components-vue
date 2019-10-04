<template>
  <button
    class="cv-button"
    :class="[
      'bx--btn',
      'bx--btn--' + kind.toLowerCase(),
      {
        'bx--btn--sm': size === 'small' || (size === undefined && small),
        'bx--btn--field': size === 'field',
        'bx--btn--icon-only': iconOnly,
      },
    ]"
    v-on="$listeners"
    role="button"
    @click="$emit('click', $event)"
  >
    <slot></slot>

    <component v-if="typeof icon === 'object'" :is="icon" class="bx--btn__icon" />
    <svg v-if="typeof icon === 'string' || iconHref" class="bx--btn__icon">
      <use :href="icon || iconHref" />
    </svg>
  </button>
</template>

<script>
// class="{{@root.prefix}}--btn {{@root.prefix}}--btn--{{variant}} {{@root.prefix}}--btn--icon-only {{@root.prefix}}--btn--icon-only--bottom {{#if small}} {{@root.prefix}}--btn--sm{{/if}}{{#if field}} {{@root.prefix}}--btn--field{{/if}}"
// aria-label="Add">
export default {
  name: 'CvButton',
  props: {
    icon: {
      type: [String, Object],
      default: undefined,
      validator(val) {
        if (!val || typeof val === 'string') {
          return true;
        }
        return val.render !== null;
      },
    },
    iconHref: {
      type: String,
      default: undefined,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (val !== undefined) {
            console.warn('CvButton: iconHref deprecated in favour of icon to be removed in future versions.');
          }
        }
        return true;
      },
    },
    kind: {
      type: String,
      default: 'primary',
      validator: val => ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger--primary'].includes(val),
    },
    small: {
      type: Boolean,
      default: false,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (val !== undefined) {
            console.warn('CvButton: small deprecated in favour of size.');
          }
        }
        return true;
      },
    },
    size: { type: String, default: undefined, validator: val => ['', 'field', 'small'] },
  },
  computed: {
    iconOnly() {
      return this.$slots.default === undefined;
    },
  },
};
</script>
