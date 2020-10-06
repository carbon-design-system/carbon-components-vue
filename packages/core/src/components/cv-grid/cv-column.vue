<template>
  <div class="cv-column" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

const breakpointProp = {
  type: [Boolean, Number, Object],
  validator: value => {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return true;
    } else if (typeof value === 'object') {
      return 'span' in value && typeof value.span === 'number' && 'offset' in value && typeof value.offset === 'number';
    }

    return false;
  },
};

export default {
  name: 'CvColumn',
  mixins: [carbonPrefixMixin],
  props: {
    sm: breakpointProp,
    md: breakpointProp,
    lg: breakpointProp,
    xlg: breakpointProp,
    max: breakpointProp,
  },
  computed: {
    classes() {
      const classnames = [];

      const breakpoints = [
        { name: 'sm', value: this.sm },
        { name: 'md', value: this.md },
        { name: 'lg', value: this.lg },
        { name: 'xlg', value: this.xlg },
        { name: 'max', value: this.max },
      ].filter(breakpoint => breakpoint.value !== false);

      for (let i = 0; i < breakpoints.length; i += 1) {
        const { name, value } = breakpoints[i];

        if (typeof value === 'boolean') {
          // auto-column
          classnames.push(`${this.carbonPrefix}--col-${name}`);
        } else if (typeof value === 'number') {
          classnames.push(`${this.carbonPrefix}--col-${name}-${value}`);
        } else {
          const { span, offset } = value;

          if (typeof span === 'boolean') {
            classnames.push(`${this.carbonPrefix}--col-${name}`);
          } else if (typeof span === 'number') {
            classnames.push(`${this.carbonPrefix}--col-${name}-${span}`);
          }

          if (typeof offset === 'number') {
            classnames.push(`${this.carbonPrefix}--offset-${name}-${offset}`);
          }
        }
      }

      if (classnames.length === 0) {
        // no breakpoints were defined. use auto-column
        classnames.push(`${this.carbonPrefix}--col`);
      }

      return classnames;
    },
  },
};
</script>
