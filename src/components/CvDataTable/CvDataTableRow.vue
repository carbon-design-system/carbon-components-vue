<template>
  <tbody
    v-if="dataSomeExpandingRows"
    class="cv-data-table-row cv-data-table-row--expandable"
    :id="cvId"
  >
    <cv-data-table-row-inner
      ref="row"
      :rowId="cvId"
      v-bind="$attrs"
      :expanding-row="dataExpandable"
      some-expanding-rows
      @expanded-change="onExpandedChange"
      @checked-change="onCheckedChange"
      :expanded="dataExpanded"
    >
      <slot />
    </cv-data-table-row-inner>
    <tr
      v-if="dataExpandable"
      :class="`${carbonPrefix}--expandable-row ${carbonPrefix}--expandable-row--hidden`"
      data-child-row
    >
      <td colspan="999">
        <div :class="`${carbonPrefix}--child-row-inner-container`">
          <slot name="expandedContent" />
        </div>
      </td>
    </tr>
  </tbody>
  <cv-data-table-row-inner
    v-else
    ref="row"
    v-bind="$attrs"
    class="cv-data-table-row"
    :id="cvId"
    :rowId="cvId"
    @checked-change="onCheckedChange"
  >
    <slot />
  </cv-data-table-row-inner>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import CvDataTableRowInner from './_CvDataTableRowInner.vue';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import store from './cvDataTableStore';
import { getBus } from '../../global/component-utils/event-bus';

const props = defineProps({
  expanded: Boolean,
  ...propsCvId,
});
const cvId = useCvId(props, true);

const dataExpandable = ref(false);

const attrs = useAttrs();
const slots = useSlots();
const row = ref(null);
let parent;
let bus;
onMounted(() => {
  const el = row.value?.$el;
  const pe = el?.closest('.cv-data-table');
  parent = pe?.getAttribute('id');
  if (parent) {
    bus = getBus(parent);
    store.getParent(parent);
  } else console.warn('data table not found');

  dataExpandable.value = !!slots.expandedContent;
  const exists = store.findRow(parent, cvId);
  if (exists)
    console.error(
      `CvDataTable: Duplicate ID specified for CvDataTableRow, may cause issues. {id: ${cvId.value}, value: ${attrs.value}}`
    );
  else
    store.updateRow(parent, {
      id: cvId.value,
      value: attrs.value,
      expandable: dataExpandable.value,
      isExpanded: props.expanded,
      isChecked: false,
    });
});
onUpdated(() => {
  dataExpandable.value = !!slots.expandedContent;
  store.updateRow(parent, {
    id: cvId.value,
    expandable: dataExpandable.value,
  });
});
onBeforeUnmount(() => {
  store.removeRow(parent, cvId);
});
const dataExpanded = computed(() => {
  return props.expanded || store.findRow(parent, cvId);
});
watch(
  () => props.expanded,
  () => {
    store.updateRow(parent, {
      id: cvId.value,
      isExpanded: props.expanded,
    });
  }
);
const dataSomeExpandingRows = computed(() => {
  return store.someExpandingRows(parent);
});
function onExpandedChange(val) {
  const row = store.findRow(parent, cvId);
  store.updateRow(parent, {
    id: cvId.value,
    isExpanded: val,
  });
  bus?.emit('cv:expanded-change', row);
}
function onCheckedChange(val) {
  store.updateRow(parent, {
    id: cvId.value,
    isChecked: val,
  });
  bus?.emit('cv:check-change', attrs.value, val);
}
</script>
