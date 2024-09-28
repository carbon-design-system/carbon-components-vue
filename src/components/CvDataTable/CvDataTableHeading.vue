<template>
  <th :id="cvId" :aria-sort="internalOrder" :style="skeleton && headingStyle">
    <button
      v-if="sortable"
      type="button"
      :class="[
        `${carbonPrefix}--table-sort`,
        {
          [`${carbonPrefix}--table-sort--active`]:
            internalOrder === 'descending',
          [`${carbonPrefix}--table-sort--active ${carbonPrefix}--table-sort--ascending`]:
            internalOrder === 'ascending',
        },
      ]"
      :style="headingStyle"
      @click="onSortClick"
    >
      <component
        :is="headingLabelTag"
        :class="`${carbonPrefix}--table-header-label`"
      >
        <slot>{{ heading }}</slot>
      </component>
      <ArrowDown16 :class="`${carbonPrefix}--table-sort__icon`" />
      <Arrows16 :class="`${carbonPrefix}--table-sort__icon-unsorted`" />
    </button>
    <component
      :is="headingLabelTag"
      v-else
      :class="`${carbonPrefix}--table-header-label`"
      :style="headingStyle"
    >
      <slot>{{ heading }}</slot>
    </component>
  </th>
</template>

<script setup>
import ArrowDown16 from '@carbon/icons-vue/es/arrow--down/16';
import Arrows16 from '@carbon/icons-vue/es/arrows--vertical/16';
import CvEmpty from '../CvEmpty/_CvEmpty.vue';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { carbonPrefix } from '../../global/settings';
import { computed, onBeforeUnmount, onMounted, ref, watch, inject } from 'vue';

const nextOrder = {
  ascending: 'descending',
  descending: 'none',
  none: 'ascending',
};
const props = defineProps({
  dataStyle: { type: Object, default: undefined },
  heading: { type: String, default: undefined },
  name: { type: String, default: undefined },
  sortable: Boolean,
  order: { type: String, default: 'none' },
  skeleton: Boolean,
  headingStyle: { type: Object, default: undefined },
  ...propsCvId,
});
const cvId = useCvId(props, true);
const dataOrder = ref(props.order);
watch(
  () => props.order,
  () => {
    if (dataOrder.value !== props.order) {
      dataOrder.value = props.order;
      onSortClick();
    }
  }
);
const sortableHeaders = inject('sortableHeadings', ref(new Set()));
watch(
  () => props.sortable,
  () => {
    if (props.sortable) sortableHeaders.value.add(cvId.value);
    else sortableHeaders.value.delete(cvId.value);
  }
);

const headingIds = inject('heading-ids', ref(new Set()));
onMounted(() => {
  headingIds.value.add(cvId.value);
  if (props.sortable) {
    sortableHeaders.value.add(cvId.value);
    if (props.order !== 'none') onSortClick();
  }
});

onBeforeUnmount(() => {
  headingIds.value.delete(cvId.value);
  sortableHeaders.value.delete(cvId.value);
});

const notifyHeaderSort = inject('cv:sort');
function onSortClick(ev) {
  // If this is a click event, update to next sort order. Otherwise, this is
  // being called from a watcher.
  if (ev) dataOrder.value = nextOrder[dataOrder.value];
  notifyHeaderSort({
    heading: { id: cvId.value, name: props.name },
    value: dataOrder.value,
  });
}

const currentSortHeadingId = inject('current-sort-heading-id', ref(null));
const internalOrder = computed(() => {
  if (!props.sortable) {
    return undefined;
  }
  if (currentSortHeadingId.value !== cvId.value) return 'none';
  return dataOrder.value;
});

const headingLabelTag = computed(() => {
  // no tag if non-blank skeleton
  return props.skeleton && props.heading && props.heading.length > 0
    ? CvEmpty
    : 'span';
});
</script>
