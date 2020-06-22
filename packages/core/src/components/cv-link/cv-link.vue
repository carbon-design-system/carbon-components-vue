<template>
  <component :is="tagType" v-on="$listeners" v-bind="linkProps" class="cv-link" :class="linkClasses">
    <slot></slot>
  </component>
</template>

<script>
import LinkMixin from '../../mixins/link-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvLink',
  mixins: [LinkMixin, carbonPrefixMixin],
  props: {
    inline: Boolean,
  },
  computed: {
    linkClasses() {
      const classes = [`${this.carbonPrefix}--link`];
      if (this.inline) {
        classes.push(`${this.carbonPrefix}--link--inline`);
      }
      return classes;
    },
  },
};
</script>
