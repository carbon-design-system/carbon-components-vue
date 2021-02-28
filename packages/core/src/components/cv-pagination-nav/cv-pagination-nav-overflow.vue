<template>
  <li :class="`${carbonPrefix}--pagination-nav__list-item`">
    <div :class="`${carbonPrefix}--pagination-nav__select`">
      <select
        :class="`${carbonPrefix}--pagination-nav__page ${carbonPrefix}--pagination-nav__page--select`"
        v-model="selected"
        @change="onSelect"
      >
        <option value="" hidden />
        <option v-for="item in count" :key="item + fromIndex - 1" :value="item + fromIndex - 1">
          {{ item + fromIndex - 1 }}
        </option>
      </select>
      <div :class="`${carbonPrefix}--pagination-nav__select-icon-wrapper`">
        <OverflowMenuHorizontal16 :class="`${carbonPrefix}--pagination-nav__select-icon`" />
      </div>
    </div>
  </li>
</template>
<script>
import OverflowMenuHorizontal16 from '@carbon/icons-vue/es/overflow-menu--horizontal/16';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
export default {
  name: 'CvPaginationNavOverflow',
  mixins: [carbonPrefixMixin],
  components: { OverflowMenuHorizontal16 },
  props: {
    fromIndex: Number, //From which index on this overflow should start displaying pages.
    count: Number, //How many items to display in this overflow.
  },
  data() {
    return {
      selected: '',
    };
  },
  methods: {
    /**
     * The callback function called when the user selects a page from the overflow.
     */
    onSelect() {
      this.$parent.$emit('cv:selected', this.selected);
    },
  },
};
</script>
