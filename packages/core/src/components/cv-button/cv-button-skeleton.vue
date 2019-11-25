<template>
  <button disabled :class="buttonClasses" type="button"></button>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvButtonSkeleton',
  mixins: [carbonPrefixMixin],

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
  computed: {
    buttonClasses() {
      let classes = [`${this.carbonPrefix}--btn`, `${this.carbonPrefix}--skeleton`];

      if (this.size === 'small' || (this.size === undefined && this.small)) {
        classes.push(`${this.carbonPrefix}--btn--sm`);
      }
      if (this.size === 'field') {
        classes.push(`${this.carbonPrefix}--btn--field`);
      }
      return classes;
    },
  },
};
</script>
