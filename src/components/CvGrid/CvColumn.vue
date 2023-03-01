<template>
  <div class="cv-column" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { computed } from 'vue';
import { columnValidator } from './_cvColumnValidation';

const props = defineProps({
  sm: {
    type: [Boolean, Number, Object],
    validator: value => columnValidator('sm', value),
  },
  md: {
    type: [Boolean, Number, Object],
    validator: value => columnValidator('md', value),
  },
  lg: {
    type: [Boolean, Number, Object],
    validator: value => columnValidator('lg', value),
  },
  xlg: {
    type: [Boolean, Number, Object],
    validator: value => columnValidator('xlg', value),
  },
  max: {
    type: [Boolean, Number, Object],
    validator: value => columnValidator('max', value),
  },
});
const classes = computed(() => {
  const classnames = [];

  const breakpoints = [
    { name: 'sm', value: props.sm },
    { name: 'md', value: props.md },
    { name: 'lg', value: props.lg },
    { name: 'xlg', value: props.xlg },
    { name: 'max', value: props.max },
  ].filter(breakpoint => breakpoint.value !== false);

  for (let i = 0; i < breakpoints.length; i += 1) {
    const { name, value } = breakpoints[i];

    if (typeof value === 'boolean') {
      // auto-column
      classnames.push(`${carbonPrefix}--col-${name}`);
    } else if (typeof value === 'number') {
      classnames.push(`${carbonPrefix}--col-${name}-${value}`);
    } else {
      const { span, offset, start, end } = value;

      if (typeof span === 'boolean') {
        classnames.push(`${carbonPrefix}--col-${name}`);
      } else if (typeof span === 'number') {
        classnames.push(`${carbonPrefix}--col-${name}-${span}`);
      }

      if (typeof offset === 'number') {
        classnames.push(`${carbonPrefix}--offset-${name}-${offset}`);
      }

      // Carbon 11
      if (typeof start === 'number') {
        classnames.push(`${carbonPrefix}--${name}:col-start-${start}`);
      }

      // Carbon 11
      if (typeof end === 'number') {
        classnames.push(`${carbonPrefix}--${name}:col-end-${end}`);
      }
    }
  }

  if (classnames.length === 0) {
    // no breakpoints were defined. use auto-column
    classnames.push(`${carbonPrefix}--col`);
  }

  return classnames;
});
</script>
