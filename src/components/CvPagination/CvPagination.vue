<template>
  <div :class="`cv-pagination ${carbonPrefix}--pagination`" data-pagination>
    <div :class="`${carbonPrefix}--pagination__left`">
      <cv-select
        ref="pageSizeSelect"
        :class="`${carbonPrefix}--select__item-count`"
        :label="pageSizesLabel"
        inline
        :value="`${pageSizeValue}`"
        @change="onPageSizeChange"
      >
        <cv-select-option
          v-for="(size, index) in pageSizes"
          :key="index"
          :value="`${size.value ? size.value : size}`"
          >{{
            size.label ? size.label : size.value ? size.value : size
          }}</cv-select-option
        >
      </cv-select>

      <span :class="`${carbonPrefix}--pagination__text`">
        <span data-displayed-item-range>
          <slot name="range-text" :scope="rangeProps">{{ rangeText }}</slot>
        </span>
      </span>
    </div>

    <div :class="`${carbonPrefix}--pagination__right`">
      <cv-select
        v-if="numberOfItems !== Infinity"
        ref="pageSelect"
        :class="`${carbonPrefix}--select__page-number`"
        :label="pageNumberLabel"
        inline
        hide-label
        :value="`${pageValue}`"
        @change="onPageChange"
      >
        <cv-select-option
          v-for="pageNumber in pages"
          :key="pageNumber"
          :value="`${pageNumber}`"
          :selected="pageValue === pageNumber"
          >{{ pageNumber }}</cv-select-option
        >
      </cv-select>
      <span :class="`${carbonPrefix}--pagination__text`">
        <slot name="of-n-pages" :scope="ofNPagesProps">{{ pageOfPages }}</slot>
      </span>

      <button
        type="button"
        :class="[
          `${carbonPrefix}--pagination__button ${carbonPrefix}--pagination__button--backward`,
          { [`${carbonPrefix}--pagination__button--no-index`]: noWayBack },
        ]"
        data-page-backward
        :aria-label="backwardText"
        :disabled="noWayBack"
        @click="onPrevPage"
      >
        <CaretLeft16 :class="`${carbonPrefix}--pagination__button-icon`" />
      </button>

      <button
        type="button"
        :class="[
          `${carbonPrefix}--pagination__button ${carbonPrefix}--pagination__button--forward`,
          { [`${carbonPrefix}--pagination__button--no-index`]: noWayForward },
        ]"
        data-page-forward
        :aria-label="forwardText"
        :disabled="noWayForward"
        @click="onNextPage"
      >
        <CaretRight16 :class="`${carbonPrefix}--pagination__button-icon`" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { CaretLeft16, CaretRight16 } from '@carbon/icons-vue';
import CvSelect from '../CvSelect';
import CvSelectOption from '../CvSelect/CvSelectOption.vue';

const emit = defineEmits(['change']);

const props = defineProps({
  backwardsButtonDisabled: { type: Boolean, default: false },
  forwardsButtonDisabled: { type: Boolean, default: false },
  backwardText: { type: String, default: 'Prev page' },
  forwardText: { type: String, default: 'Next page' },
  pageNumberLabel: { type: String, default: 'Page number:' },
  pageSizesLabel: { type: String, default: 'Items per page:' },
  numberOfItems: { type: Number, default: Infinity },
  actualItemsOnPage: { type: Number, default: Infinity },
  page: Number,
  pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50] },
});

const firstItem = ref(1);
const pageValue = ref(1);
const pageSizeValue = ref(10);
const pageCount = ref(1);
const pages = ref([1]);

const noWayBack = computed(() => {
  return props.backwardsButtonDisabled || pageValue.value === 1;
});
const noWayForward = computed(() => {
  return props.forwardsButtonDisabled || pageValue.value === pageCount.value;
});
const ofNPagesProps = computed(() => {
  return {
    pages: pageCount.value,
    items: props.numberOfItems,
  };
});
const pageOfPages = computed(() => {
  const { pages, items } = ofNPagesProps.value;
  if (items !== Infinity) {
    return `of ${pages} pages`;
  }
  return `Page ${pageValue.value}`;
});
const rangeProps = computed(() => {
  return {
    start: Math.min(firstItem.value, props.numberOfItems),
    end: Math.min(
      firstItem.value +
        Math.min(pageSizeValue.value, props.actualItemsOnPage) -
        1,
      props.numberOfItems
    ),
    items: props.numberOfItems,
  };
});
const rangeText = computed(() => {
  const { start, end, items } = rangeProps.value;

  if (items !== Infinity) {
    return `${start}-${end} of ${items} items`;
  } else {
    return `${start}-${end}`;
  }
});
const internalValue = computed(() => {
  return {
    start: firstItem.value,
    page: pageValue.value,
    length: pageSizeValue.value,
  };
});

onMounted(() => {
  pageSizeValue.value = newPageSizeValue(props.pageSizes);
  pageCount.value = newPageCount(props.numberOfItems, pageSizeValue.value);
  pageValue.value = newPageValue(props.page, pageCount.value);
  pages.value = newPagesArray(pageCount.value);
  firstItem.value = newFirstItem(pageValue.value, pageSizeValue.value);
  // always emit on mount
  emit('change', internalValue.value);
});

function onPageChange(newVal) {
  pageValue.value = parseInt(newVal, 10);
  firstItem.value = newFirstItem(pageValue.value, pageSizeValue.value);
  emit('change', internalValue.value);
}
watch(
  () => props.numberOfItems,
  () => onPageSizeChange(pageSizeValue.value)
);
function onPageSizeChange(newVal) {
  pageSizeValue.value = parseInt(newVal, 10);
  pageCount.value = newPageCount(props.numberOfItems, pageSizeValue.value);
  pages.value = newPagesArray(pageCount.value);
  // what page is firstItem on
  nextTick(() => {
    // setting pageValue immediately seems to cause a problem - test set pageSize to 40, page to 3, set pageSize to 10
    // this previously resulted in 1 being set on Chrome (other browsers untested)
    pageValue.value = Math.ceil(firstItem.value / pageSizeValue.value);
    firstItem.value = newFirstItem(pageValue.value, pageSizeValue.value);
    emit('change', internalValue.value);
  });
}
function onPrevPage() {
  if (pageValue.value > 1) {
    pageValue.value--;
    firstItem.value = newFirstItem(pageValue.value, pageSizeValue.value);
    emit('change', internalValue.value);
  }
}
function onNextPage() {
  if (pageValue.value < pageCount.value) {
    pageValue.value++;
    firstItem.value = newFirstItem(pageValue.value, pageSizeValue.value);
    emit('change', internalValue.value);
  }
}
function newPageValue(page, lastPage) {
  let result = 1;
  if (page && page > 0) {
    if (page <= lastPage) {
      result = page;
    } else {
      result = lastPage;
    }
  }
  return result;
}
function newPageSizeValue(pageSizes) {
  // ensure nearest value to valid page size used.
  for (let size of pageSizes) {
    if (size.selected) {
      return size.value;
    }
  }

  let firstOne = pageSizes[0];
  return firstOne.value ? firstOne.value : firstOne;
}
function newPageCount(numberOfItems, pageSizeValue) {
  if (numberOfItems === Infinity) {
    return Infinity;
  }
  return Math.max(1, Math.ceil(numberOfItems / pageSizeValue));
}
function newPagesArray(pageCount) {
  if (pageCount === Infinity) {
    return [];
  }
  return Array.from({ length: pageCount }, (val, key) => key + 1);
}
function newFirstItem(pageValue, pageSizeValue) {
  return 1 + (pageValue - 1) * pageSizeValue;
}
</script>
