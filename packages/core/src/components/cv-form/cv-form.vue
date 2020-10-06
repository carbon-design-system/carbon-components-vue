<template>
  <form :class="`cv-form ${carbonPrefix}--form`" v-on="$listeners">
    <slot></slot>
  </form>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvForm',
  mixins: [carbonPrefixMixin],
};
</script>
