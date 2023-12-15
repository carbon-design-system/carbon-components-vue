<template>
  <th
    :id="cvId"
    ref="el"
    :aria-sort="internalOrder"
    :style="skeleton && headingStyle"
  >
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { getBus } from '../../global/component-utils/event-bus';
import store from './cvDataTableStore';

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
const parent = ref(null);
watch(
  () => props.order,
  () => {
    if (dataOrder.value !== props.order) {
      dataOrder.value = props.order;
      store.updateHeading(parent, {
        id: cvId.value,
        order: dataOrder.value,
      });
      onSortClick();
    }
  }
);
watch(
  () => props.sortable,
  () => {
    store.updateHeading(parent, {
      id: cvId.value,
      sortable: props.sortable,
    });
  }
);

let bus = undefined;
const el = ref(null);
onMounted(() => {
  const pe = el.value.closest('.cv-data-table');
  parent.value = pe?.getAttribute('id');
  if (parent.value) bus = getBus(parent);
  else console.warn('data table not found');

  const exists = store.findHeading(parent, cvId);
  if (exists)
    console.error(
      `CvDataTable: Duplicate ID specified for CvDataTableHeading, may cause issues. {id: ${cvId.value}, name: ${props.name}`
    );
  else
    store.updateHeading(parent, {
      id: cvId.value,
      name: props.name,
      order: dataOrder.value,
      sortable: props.sortable,
    });
});

onBeforeUnmount(() => {
  store.removeHeading(parent, cvId);
});
function onSortClick() {
  bus?.emit('cv:sort', {
    heading: { id: cvId.value, name: props.name },
    value: nextOrder[internalOrder.value],
  });
}
const internalOrder = computed(() => {
  if (!props.sortable) {
    return undefined;
  }
  const heading = store.findHeading(parent, cvId);
  if (['ascending', 'descending', 'none'].includes(heading?.order))
    return heading.order;
  else return 'none';
});

const headingLabelTag = computed(() => {
  // no tag if non-blank skeleton
  return props.skeleton && props.heading && props.heading.length > 0
    ? CvEmpty
    : 'span';
});
</script>
