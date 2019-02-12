<template>
  <th :aria-sort="sortOrder">
    <button
      type="button"
      v-if="sortable"
      class="bx--table-sort-v2"
      :class="{
        'bx--table-sort-v2--active': sortOrder !== 'none',
        'bx--table-sort-v2--ascending': sortOrder === 'ascending',
      }"
      @click="onSortClick"
    >
      <span class="bx--table-header-label">{{ heading }}</span>
      <svg
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
    </button>
    <span v-else class="bx--table-header-label">{{ heading }}</span>
  </th>
</template>

<script>
const nextSortOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};

export default {
  name: 'CvDataTableHeading',
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
  },
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
