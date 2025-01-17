<template>
  <tbody
    v-if="tableExpandable"
    :id="cvId"
    class="cv-data-table-row cv-data-table-row--expandable"
  >
    <cv-data-table-row-inner
      :id="`${cvId}-ri`"
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
    :id="cvId"
    ref="row"
    :value="rowValue"
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
  ref,
  useAttrs,
  useSlots,
  watch,
  inject,
  onUpdated,
} from 'vue';

const props = defineProps({
  /** The value associated with the input (required for tables with batch actions) */
  value: { type: String, default: undefined },
  /** This row will be initially expanded */
  expanded: Boolean,
  ...propsCvId,
});
const cvId = useCvId(props, true);
// For historical reasons we have a prop named "value" but this makes the code
// hard to read since .value is used for refs. So it would be props.value
// which is weird. Let's shadow this as "rowValue"
const rowValue = ref(props.value);
watch(
  () => props.value,
  () => (rowValue.value = props.value)
);

/** @type {Ref<boolean>} */
const tableExpandable = inject('table-expandable', ref(false));
/** @type {Ref<Set<String>>} */
const expandingRowIds = inject('expanding-row-ids', ref(new Set()));
const dataExpandable = ref(tableExpandable.value);
watch(dataExpandable, value => {
  if (value && !expandingRowIds.value.has('table-expand-row')) {
    console.warn(
      `row ${cvId.value} is expandable but the expandable property is not set to true on the table`
    );
  }
  if (dataExpandable.value) expandingRowIds.value.add(cvId.value);
  else expandingRowIds.value?.delete(cvId.value);
});
const attrs = useAttrs();
const rowIds = inject('row-ids', ref(new Set()));
const expandedRowIds = inject('expanded-row-ids', ref(new Set()));

const slots = useSlots();
const row = ref(null);
const rowsSelected = inject('rows-selected');

onMounted(() => {
  dataExpandable.value = !!slots.expandedContent;
  rowIds.value.add(cvId.value);
  if (props.expanded) expandedRowIds.value.add(cvId.value);
});
onUpdated(() => {
  dataExpandable.value = !!slots.expandedContent;
});
onBeforeUnmount(() => {
  rowIds.value.delete(cvId.value);
  expandingRowIds.value.delete(cvId.value);
  expandedRowIds.value.delete(cvId.value);
  const index = rowsSelected.value.indexOf(rowValue.value);
  if (index > -1) rowsSelected.value.splice(index, 1);
});
const dataExpanded = computed(() => {
  return Boolean(props.expanded || expandedRowIds.value.has(cvId.value));
});
watch(
  () => props.expanded,
  () => {
    if (props.expanded) expandedRowIds.value.add(cvId.value);
    else expandingRowIds.value.delete(cvId.value);
  }
);

const notifyExpandedChange = inject('cv:expanded-change');

function onExpandedChange(val) {
  notifyExpandedChange({
    id: cvId.value,
    value: rowValue.value,
    expandable: expandingRowIds.value.has(cvId.value),
    isExpanded: val,
    isChecked: rowsSelected.value.includes(rowValue.value),
  });
}

// Manage the checkmark on the row. Notify the table if it changes.
const notifyCheckedChange = inject('cv:check-change');
function onCheckedChange(isChecked) {
  if (!rowsSelected.value) return;
  const index = rowsSelected.value.indexOf(rowValue.value);
  if (isChecked) {
    // if the row value is not already in the rowsSelected array, add it.
    if (index === -1) rowsSelected.value.push(rowValue.value);
  } else {
    // if the row value is in the rowsSelected array, delete it.
    if (index > -1) rowsSelected.value.splice(index, 1);
  }
  notifyCheckedChange(attrs.value, isChecked);
}
</script>
