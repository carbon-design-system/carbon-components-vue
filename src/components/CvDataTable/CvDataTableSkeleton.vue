<template>
  <cv-data-table skeleton :data="data" :columns="cols" v-bind="$attrs">
    <template v-if="hasHelperText" #helper-text>
      <slot name="helper-text" />
    </template>

    <template v-if="hasBatchActions" #batch-actions>
      <slot name="batch-actions" />
    </template>

    <template v-if="hasActions" #actions>
      <slot name="actions" />
    </template>
  </cv-data-table>
</template>

<script setup>
import CvDataTable from './CvDataTable.vue';
import { computed, onMounted, onUpdated, ref, useSlots } from 'vue';

const props = defineProps({
  columns: { type: [Array, Number], default: 5 },
  rows: { type: Number, default: 5 },
});
const hasActions = ref(false);
const hasHelperText = ref(false);
const hasBatchActions = ref(false);
const slots = useSlots();
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  hasBatchActions.value = !!slots['batch-actions'];
  hasHelperText.value = !!slots['helper-text'];
  hasActions.value = !!slots['actions'];
}
onMounted(checkSlots);
onUpdated(checkSlots);

const data = computed(() => {
  return [...Array(Math.max(props.rows, 1))].map(() =>
    Array(cols.value.length).fill('')
  );
});
const cols = computed(() => {
  return typeof props.columns !== 'number'
    ? props.columns
    : Array(Math.max(props.columns, 1)).fill('');
});
</script>
