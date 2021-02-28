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
      <!-- render first item if at least 5 items can be displayed or
      4 items can be displayed and the current page is either 0 or 1 -->
      <!-- <CvPaginationNavItem :item="1" :selected="currentPage === 1" /> -->
      <!-- render first overflow -->
      <!-- <CvPaginationNavOverflow v-if="frontCut" :from-index="frontCut.from" :count="frontCut.count" /> -->

      <!-- render items between overflows -->
      <CvPaginationNavItem v-for="item in totalItems" :key="item" :item="item" :selected="item == currentPage" />

      <!-- render second overflow -->
      <!-- <CvPaginationNavOverflow v-if="backCut" :from-index="backCut.from" :count="backCut.count" /> -->

      <!-- render last item unless there is only one in total -->
      <!-- <CvPaginationNavItem v-if="totalItems > 1" :item="totalItems" :selected="currentPage === totalItems" /> -->

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
import CaretLeft16 from '@carbon/icons-vue/es/caret--left/16';
import CaretRight16 from '@carbon/icons-vue/es/caret--right/16';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
// import CvPaginationNavOverflow from './cv-pagination-nav-overflow';
import CvPaginationNavItem from './cv-pagination-nav-item';

export default {
  name: 'CvPaginationNav',
  mixins: [carbonPrefixMixin],
  components: { CaretLeft16, CaretRight16, CvPaginationNavItem },
  props: {
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
  created: function() {
    this.$on('cv:selected', index => this.onSelect(index));
  },
  computed: {
    noWayBack() {
      if (this.backwardsButtonDisabled) return this.backwardsButtonDisabled;
      if (this.allowLoop) return false;
      return this.currentPage === 1;
    },
    noWayForward() {
      if (this.forwardsButtonDisabled) return this.forwardsButtonDisabled;
      if (this.allowLoop) return false;
      return this.currentPage === this.totalItems;
    },
    // frontCut() {
    //   if (this.totalItems <= this.itemsShown) return null;
    //   const split = Math.ceil(this.itemsShown / 2) - 1;
    //   let x = {
    //     from: 2,
    //     count: this.page + 1 - split,
    //   };
    //   return x;
    // },
    // backCut() {
    //   if (this.totalItems <= this.itemsShown) return null;
    //   const split = Math.ceil(this.itemsShown / 2) - 1;
    //   let count = this.totalItems - this.page - (this.totalItems - split) + 1;
    //   let x = {
    //     from: this.totalItems - count - 1,
    //     count: count,
    //   };
    //   return x;
    // },
    // middleItems() {
    //   let middleStart = this.frontCut.from + this.frontCut.count - 1 || 2;
    //   return Array.from({ length: this.totalItems }, (_, i) => i + middleStart).filter(i => i < this.backCut.from - 1);
    // },
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
