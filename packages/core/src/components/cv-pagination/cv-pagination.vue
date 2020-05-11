<template>
  <div class="cv-pagination bx--pagination" data-pagination>
    <div class="bx--pagination__left">
      <cv-select
        class="bx--select__item-count"
        :label="`${pageSizesLabel}`"
        inline
        ref="pageSizeSelect"
        @change="onPageSizeChange"
        :value="`${pageSizeValue}`"
      >
        <cv-select-option
          v-for="(size, index) in pageSizes"
          :key="index"
          :value="`${size.value ? size.value : size}`"
          >{{ size.label ? size.label : size.value ? size.value : size }}</cv-select-option
        >
      </cv-select>

      <span class="bx--pagination__text">
        <span data-displayed-item-range>
          <slot name="range-text" v-bind:scope="rangeProps">{{ rangeText }}</slot>
        </span>
      </span>
    </div>

    <div class="bx--pagination__right">
      <cv-select
        class="bx--select__page-number"
        :label="`${pageNumberLabel}:`"
        inline
        hideLabel
        ref="pageSelect"
        @change="onPageChange"
        :value="`${pageValue}`"
        v-if="numberOfItems !== Infinity"
      >
        <cv-select-option
          v-for="pageNumber in pages"
          :key="pageNumber"
          :value="`${pageNumber}`"
          :selected="pageValue === pageNumber"
          >{{ pageNumber }}</cv-select-option
        >
      </cv-select>
      <span class="bx--pagination__text">
        <slot name="of-n-pages" v-bind:scope="ofNPagesProps">{{ pageOfPages }}</slot>
      </span>

      <button
        type="button"
        class="bx--pagination__button bx--pagination__button--backward"
        data-page-backward
        :aria-label="backwardText"
        @click="onPrevPage"
        :disabled="noWayBack"
        :class="{ 'bx--pagination__button--no-index': noWayBack }"
      >
        <CaretLeft16 class="bx--pagination__button-icon" />
      </button>

      <button
        type="button"
        class="bx--pagination__button bx--pagination__button--forward"
        data-page-forward
        :aria-label="forwardText"
        @click="onNextPage"
        :disabled="noWayForward"
        :class="{ 'bx--pagination__button--no-index': noWayForward }"
      >
        <CaretRight16 class="bx--pagination__button-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import CvSelect from '../cv-select/cv-select';
import CvSelectOption from '../cv-select/cv-select-option';
import CaretLeft16 from '@carbon/icons-vue/es/caret--left/16';
import CaretRight16 from '@carbon/icons-vue/es/caret--right/16';

const newPageValue = (page, lastPage) => {
  let result = 1;
  if (page && page > 0) {
    if (page <= lastPage) {
      result = page;
    } else {
      result = lastPage;
    }
  }
  return result;
};

const newPageSizeValue = pageSizes => {
  // ensure nearest value to valid page size used.
  for (let size of pageSizes) {
    if (size.selected) {
      return size.value;
    }
  }

  let firstOne = pageSizes[0];
  return firstOne.value ? firstOne.value : firstOne;
};

const newPageCount = (numberOfItems, pageSizeValue) => {
  if (numberOfItems === Infinity) {
    return Infinity;
  }
  return Math.max(1, Math.ceil(numberOfItems / pageSizeValue));
};

const newPagesArray = pageCount => {
  if (pageCount === Infinity) {
    return [];
  }
  return Array.from({ length: pageCount }, (val, key) => key + 1);
};

const newFirstItem = (pageValue, pageSizeValue) => 1 + (pageValue - 1) * pageSizeValue;

export default {
  name: 'CvPagination',
  components: { CvSelect, CvSelectOption, CaretLeft16, CaretRight16 },
  props: {
    backwardsButtonDisabled: Boolean,
    forwardsButtonDisabled: Boolean,
    backwardText: { type: String, default: 'Prev page' },
    forwardText: { type: String, default: 'Next page' },
    pageNumberLabel: { type: String, default: 'Page number:' },
    pageSizesLabel: { type: String, default: 'Items per page:' },
    numberOfItems: { type: Number, default: Infinity },
    page: Number,
    pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50] },
  },
  data() {
    return {
      firstItem: 1,
      pageValue: 1,
      pageSizeValue: 10,
      pageCount: 1,
      pages: [1],
    };
  },
  mounted() {
    this.pageSizeValue = newPageSizeValue(this.pageSizes);
    this.pageCount = newPageCount(this.numberOfItems, this.pageSizeValue);
    this.pageValue = newPageValue(this.page, this.pageCount);
    this.pages = newPagesArray(this.pageCount);
    this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
    // console.log(this.pageValue);
    // always emit on mount
    this.$emit('change', this.internalValue);
  },
  watch: {
    numberOfItems() {
      this.pageCount = newPageCount(this.numberOfItems, this.pageSizeValue);
      this.pages = newPagesArray(this.pageCount);
      this.pageValue = Math.min(this.pageCount, Math.ceil(this.firstItem / this.pageSizeValue));
      this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
    },
    page() {
      this.pageValue = newPageValue(this.page, this.pageCount);
      this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
    },
    pageSizes() {
      this.pageSizeValue = newPageSizeValue(this.pageSizes);
      this.pageCount = newPageCount(this.numberOfItems, this.pageSizeValue);
      this.pages = newPagesArray(this.pageCount);
      // Do not adjust pageValue to match firstItem. Could be incorrect if
      // page was also set at the same time
      this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
    },
  },
  computed: {
    noWayBack() {
      return this.backwardsButtonDisabled || this.pageValue === 1;
    },
    noWayForward() {
      return this.forwardsButtonDisabled || this.pageValue === this.pageCount;
    },
    ofNPagesProps() {
      return {
        pages: this.pageCount,
        items: this.numberOfItems,
      };
    },
    pageOfPages() {
      const { pages, items } = this.ofNPagesProps;
      // console.log(this.pageValue, this.pageCount);
      if (items !== Infinity) {
        return `of ${pages} pages`;
      }
      return `Page ${this.pageValue}`;
    },
    rangeProps() {
      return {
        start: Math.min(this.firstItem, this.numberOfItems),
        end: Math.min(this.firstItem + parseInt(this.pageSizeValue, 10) - 1, this.numberOfItems),
        items: this.numberOfItems,
      };
    },
    rangeText() {
      const { start, end, items } = this.rangeProps;

      if (items !== Infinity) {
        return `${start}-${end} of ${items} items`;
      } else {
        return `${start}-${end}`;
      }
    },
    internalValue() {
      return {
        start: this.firstItem,
        page: this.pageValue,
        length: parseInt(this.pageSizeValue),
      };
    },
  },
  methods: {
    onPageChange(newVal) {
      this.pageValue = parseInt(newVal, 10);
      this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
      this.$emit('change', this.internalValue);
    },
    onPageSizeChange(newVal) {
      this.pageSizeValue = parseInt(newVal, 10);
      this.pageCount = newPageCount(this.numberOfItems, this.pageSizeValue);
      this.pages = newPagesArray(this.pageCount);
      // what page is firstItem on
      this.$nextTick(() => {
        // setting pageValue immediately seems to cause a problem - test set pageSize to 40, page to 3, set pageSize to 10
        // this previously resulted in 1 being set on Chrome (other browsers untested)
        this.pageValue = Math.ceil(this.firstItem / this.pageSizeValue);
        this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
        this.$emit('change', this.internalValue);
      });
    },
    onPrevPage() {
      if (this.pageValue > 1) {
        this.pageValue--;
        this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
        this.$emit('change', this.internalValue);
      }
    },
    onNextPage() {
      if (this.pageValue < this.pageCount) {
        this.pageValue++;
        this.firstItem = newFirstItem(this.pageValue, this.pageSizeValue);
        this.$emit('change', this.internalValue);
      }
    },
  },
};
</script>
