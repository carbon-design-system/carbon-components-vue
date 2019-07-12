<template>
  <component :is="tagType" v-on="$listeners" :to="to" :href="href" class="cv-header-name bx--header__name">
    <span v-if="prefix" class="bx--header__name--prefix">{{ prefix }}&nbsp;</span>
    <slot />
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';

export default {
  name: 'CvHeaderName',
  mixins: [LinkMixin],
  props: {
    prefix: String,
  },
};
</script>
