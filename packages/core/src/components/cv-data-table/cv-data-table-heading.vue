<template>
  <th :aria-sort="internalOrder" :style="skeleton && headingStyle">
    <button
      type="button"
      v-if="sortable"
      :class="['bx--table-sort', orderClass]"
      @click="onSortClick"
      :style="headingStyle"
    >
      <cv-wrapper :tag-type="headingLabelTag" class="bx--table-header-label">
        <slot>{{ heading }}</slot>
      </cv-wrapper>
      <ArrowDown16 class="bx--table-sort__icon" />
      <Arrows16 class="bx--table-sort__icon-unsorted" />
    </button>
    <cv-wrapper v-else :tag-type="headingLabelTag" class="bx--table-header-label" :style="headingStyle">
      <slot>{{ heading }}</slot>
    </cv-wrapper>
  </th>
</template>

<script>
import ArrowDown16 from '@carbon/icons-vue/es/arrow--down/16';
import Arrows16 from '@carbon/icons-vue/es/arrows/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';
import uidMixin from '../../mixins/uid-mixin';

const nextOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};

export default {
  name: 'CvDataTableHeading',
  components: { ArrowDown16, Arrows16, CvWrapper },
  mixins: [uidMixin],
  props: {
    dataStyle: Object,
    heading: String,
    sortable: Boolean,
    order: { type: String, default: 'none' },
    skeleton: Boolean,
    headingStyle: Object,
  },
  data() {
    return {
      dataOrder: this.order,
    };
  },
  mounted() {
    this.$_CvDataTableHeading = true; // for use by parent with $children
    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
  watch: {
    order() {
      this.dataOrder = this.order;
    },
  },
  computed: {
    internalOrder: {
      get() {
        if (this.dataOrder !== 'ascending' && this.dataOrder !== 'descending') {
          return 'none';
        } else {
          return this.dataOrder;
        }
      },
      set(val) {
        if (['ascending', 'descending', 'none'].includes(val)) {
          this.dataOrder = val;
        }
      },
    },
    sortText() {
      return this.internalOrder !== 'descending'
        ? 'Sort rows by this header in descending order'
        : 'Sort rows by this header in ascending order';
    },
    orderClass() {
      let result = '';
      if (this.internalOrder === 'descending') {
        result = 'bx--table-sort--active';
      } else if (this.internalOrder === 'ascending') {
        result = 'bx--table-sort--active bx--table-sort--ascending';
      }
      return result;
    },
    headingLabelTag() {
      // no tag if non-blank skeleton
      return this.skeleton && this.heading && this.heading.length > 0 ? '' : 'span';
    },
  },
  model: {
    event: 'sort',
    prop: 'order',
  },
  methods: {
    onSortClick() {
      this.$parent.$emit('cv:sort', this, nextOrder[this.internalOrder]);
    },
  },
};
</script>
