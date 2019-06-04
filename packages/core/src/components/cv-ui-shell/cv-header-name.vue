<template>
  <component :is="tagType" v-on="$listeners" class="cv-header-name bx--header__name">
    <span v-if="prefix" class="bx--header__name--prefix">{{ prefix }}</span>
    <slot />
  </component>
</template>

<script>
import linkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvHeaderName',
  mixins: [linkMixin],
  props: {
    prefix: String,
  },
};
</script>
