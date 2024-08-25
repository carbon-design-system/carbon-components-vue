<template>
  <tbody
    v-if="dataSomeExpandingRows"
    :id="cvId"
    class="cv-data-table-row cv-data-table-row--expandable"
  >
    <cv-data-table-row-inner
      ref="row"
      :row-id="cvId"
      v-bind="$attrs"
      :value="value"
      :expanding-row="dataExpandable"
      :expanded="dataExpanded"
      @expanded-change="onExpandedChange"
      @checked-change="onCheckedChange"
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
    v-bind="$attrs"
    :value="value"
    :id="cvId"
    ref="row"
    class="cv-data-table-row"
    :row-id="cvId"
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
  inject,
} from 'vue';
import store from './cvDataTableStore';
import { getBus } from '../../global/component-utils/event-bus';

const props = defineProps({
  /** The value associated with the input (required for tables with batch actions) */
  value: { type: String, default: undefined },
  /** This row will be initially expanded */
  expanded: Boolean,
  ...propsCvId,
});
const cvId = useCvId(props, true);

/** @type {Ref<Set<String>>} */
const expandingRowIds = inject('expanding-row-ids', ref(new Set()));
const dataExpandable = ref(false);
watch(dataExpandable, () => {
  if (dataExpandable.value) expandingRowIds.value?.add(cvId.value);
  else expandingRowIds.value?.delete(cvId.value);
});
const dataSomeExpandingRows = computed(() => {
  return expandingRowIds.value?.size > 0;
});

const attrs = useAttrs();
const slots = useSlots();
const row = ref(null);
const parent = ref(null);
let bus;
onMounted(() => {
  const el = row.value?.$el;
  const pe = el?.closest('.cv-data-table');
  parent.value = pe?.getAttribute('id');
  if (parent.value) {
    bus = getBus(parent);
    store.getTable(parent);
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
  const curr = dataExpandable.value;
  dataExpandable.value = !!slots.expandedContent;
  if (dataExpandable.value !== curr)
    store.updateRow(parent, {
      id: cvId.value,
      expandable: dataExpandable.value,
    });
});
onBeforeUnmount(() => {
  store.removeRow(parent, cvId);
});
const dataExpanded = computed(() => {
  return Boolean(props.expanded || store.isRowExpanded(parent, cvId));
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
  bus?.emit('cv:check-change', { value: props.value, checked: val });
}
</script>
