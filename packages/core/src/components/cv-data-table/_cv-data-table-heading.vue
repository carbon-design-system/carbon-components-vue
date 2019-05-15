<template>
  <th :aria-sort="sortOrder">
    <button
      type="button"
      v-if="sortable"
      :class="[componentsX ? 'bx--table-sort' : 'bx--table-sort-v2', orderClass]"
      @click="onSortClick"
    >
      <span class="bx--table-header-label">{{ heading }}</span>
      <ArrowDown16 v-if="componentsX" class="bx--table-sort__icon" />
      <svg
        v-else
        class="bx--table-sort-v2__icon"
        width="10"
        height="5"
        viewBox="0 0 10 5"
        :aria-label="sortText"
        :alt="sortText"
      >
        <title>{{ sortText }}</title>
        <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
      </svg>
      <Arrows16 v-if="componentsX" class="bx--table-sort__icon-unsorted" />
    </button>
    <span v-else class="bx--table-header-label">{{ heading }}</span>
  </th>
</template>

<script>
import { componentsX } from '../../internal/feature-flags';
import ArrowDown16 from '@carbon/icons-vue/es/arrow--down/16';
import Arrows16 from '@carbon/icons-vue/es/arrows/16';

const nextSortOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};

export default {
  name: 'CvDataTableHeading',
  components: { ArrowDown16, Arrows16 },
  props: {
    heading: { type: String, required: true },
    sortable: Boolean,
    order: { type: String, default: 'none' },
  },
  computed: {
    sortOrder() {
      if (this.order !== 'ascending' && this.order !== 'descending') {
        return 'none';
      } else {
        return this.order;
      }
    },
    sortText() {
      return this.sortOrder !== 'descending'
        ? 'Sort rows by this header in descending order'
        : 'Sort rows by this header in ascending order';
    },
    orderClass() {
      let result = '';
      if (this.componentsX) {
        if (this.sortOrder === 'descending') {
          result = 'bx--table-sort--active';
        } else if (this.sortOrder === 'ascending') {
          result = 'bx--table-sort--active bx--table-sort--ascending';
        }
      } else {
        if (this.sortOrder === 'none') {
          result = 'bx--table-sort-v2--active';
        } else if (this.sortOrder === 'active') {
          result = 'bx--table-sort-v2--ascending';
        }
      }
      return result;
    },
  },
  data: () => ({ componentsX }),
  model: {
    event: 'sort',
    prop: 'order',
  },
  methods: {
    onSortClick() {
      this.$emit('sort', nextSortOrder[this.sortOrder]);
    },
  },
};
</script>
