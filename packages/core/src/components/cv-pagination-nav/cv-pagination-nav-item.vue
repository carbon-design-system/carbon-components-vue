<template>
  <li :class="`${carbonPrefix}--pagination-nav__list-item`">
    <button
      type="button"
      :class="[
        `${carbonPrefix}--pagination-nav__page`,
        { [`${carbonPrefix}--pagination-nav__page--active`]: selected },
      ]"
      :data-page="item"
      @click="onSelect"
    >
      <span :class="`${carbonPrefix}--pagination-nav__accessibility-label`">Page</span>{{ item }}
    </button>
  </li>
</template>
<script>
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvPaginationNavOverflow',
  mixins: [carbonPrefixMixin],
  props: {
    item: Number,
    selected: Boolean,
  },
  methods: {
    onSelect() {
      this.$parent.$emit('cv:selected', this.item);
    },
  },
};
</script>
