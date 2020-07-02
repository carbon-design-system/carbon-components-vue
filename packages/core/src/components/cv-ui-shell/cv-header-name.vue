<template>
  <component :is="tagType" v-on="$listeners" v-bind="linkProps" :class="`cv-header-name ${carbonPrefix}--header__name`">
    <span v-if="prefix" :class="`${carbonPrefix}--header__name--prefix`">{{ prefix }}&nbsp;</span>
    <slot />
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvHeaderName',
  mixins: [LinkMixin, carbonPrefixMixin],
  props: {
    prefix: String,
  },
};
</script>
