<template>
  <nav :class="`cv-pagination-nav ${carbonPrefix}--pagination-nav`" data-pagination-nav>
    <ul :class="`${carbonPrefix}--pagination-nav__list`">
      <li :class="`${carbonPrefix}--pagination-nav__list-item`">
        <button
          type="button"
          :class="`${carbonPrefix}--btn ${carbonPrefix}--btn--ghost`"
          @click="jumpToPrevious"
          :disabled="noWayBack"
        >
          <CaretLeft16 :class="`${carbonPrefix}--pagination__button-icon`" />
        </button>
      </li>

      <li :class="`${carbonPrefix}--pagination-nav__list-item`" v-for="item in totalItems" :key="item">
        <button
          type="button"
          :class="[
            `${carbonPrefix}--pagination-nav__page`,
            { [`${carbonPrefix}--pagination-nav__page--active`]: item == currentPage },
          ]"
          :data-page="item"
          @click="onSelect(item)"
        >
          <span :class="`${carbonPrefix}--pagination-nav__accessibility-label`">Page</span>{{ item }}
        </button>
      </li>

      <li :class="`${carbonPrefix}--pagination-nav__list-item`">
        <button
          type="button"
          :class="`${carbonPrefix}--btn ${carbonPrefix}--btn--ghost`"
          @click="jumpToNext"
          :disabled="noWayForward"
        >
          <CaretRight16 :class="`${carbonPrefix}--pagination__button-icon`" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
// import CvSelect from '../cv-select/cv-select';
// import CvSelectOption from '../cv-select/cv-select-option';
import CaretLeft16 from '@carbon/icons-vue/es/caret--left/16';
import CaretRight16 from '@carbon/icons-vue/es/caret--right/16';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';

export default {
  name: 'CvPaginationNav',
  mixins: [carbonPrefixMixin],
  components: { CaretLeft16, CaretRight16 },
  props: {
    backwardsButtonDisabled: Boolean,
    forwardsButtonDisabled: Boolean,
    allowLoop: { type: Boolean, default: false },
    page: { type: Number, default: 1 },
    totalItems: { type: Number, default: 10 },
    itemsShown: { type: Number, default: Infinity },
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
  mounted() {},
  watch: {},
  computed: {
    noWayBack() {
      if (this.backwardsButtonDisabled) return this.backwardsButtonDisabled;
      if (this.allowLoop) return !this.allowLoop;
      return this.currentPage === 1;
    },
    noWayForward() {
      if (this.forwardsButtonDisabled) return this.forwardsButtonDisabled;
      if (this.allowLoop) return !this.allowLoop;
      return this.currentPage === this.totalItems;
    },
  },
  methods: {
    onSelect(index) {
      this.currentPage = index;
    },
    jumpToNext() {
      const nextIndex = this.currentPage + 1;
      if (nextIndex >= this.totalItems + 1) {
        if (this.allowLoop) {
          this.currentPage = 1;
        }
      } else {
        this.currentPage = nextIndex;
      }
    },
    jumpToPrevious() {
      const previousIndex = this.currentPage - 1;
      if (previousIndex < 0) {
        if (this.allowLoop) {
          this.currentPage = this.totalItems - 1;
        }
      } else if (previousIndex == 0) {
        this.currentPage = this.totalItems;
      } else {
        this.currentPage = previousIndex;
      }
    },
  },
};
</script>
