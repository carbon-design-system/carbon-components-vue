<template>
  <tr
    ref="el"
    class="cv-data-table-row-inner"
    :class="{
      [`${carbonPrefix}--parent-row`]: expandingRow,
      [`${carbonPrefix}--expandable-row`]: dataExpanded,
    }"
  >
    <td
      v-if="dataSomeExpandingRows"
      :class="`${carbonPrefix}--table-expand`"
      :data-previous-value="dataExpanded ? 'collapsed' : 'expanded'"
    >
      <button
        v-if="expandingRow"
        :class="`${carbonPrefix}--table-expand__button`"
        type="button"
        :aria-label="dataExpanded ? ariaLabelCollapseRow : ariaLabelExpandRow"
        @click="toggleExpand"
      >
        <ChevronRight16 :class="`${carbonPrefix}--table-expand__svg`" />
      </button>
      <div v-else>{{ expandingRow }}</div>
    </td>
    <td
      v-if="hasBatchActions"
      :class="`${carbonPrefix}--table-column-checkbox`"
    >
      <cv-checkbox
        ref="rowChecked"
        v-model="dataChecked"
        :form-item="false"
        :value="value"
        :inline="true"
        :label="
          ariaLabelForBatchCheckbox || `Select row ${value} for batch action`
        "
        hide-label
        @change="onChange"
      />
    </td>
    <slot />
    <td v-if="hasOverflowMenu" :class="`${carbonPrefix}--table-column-menu`">
      <cv-overflow-menu v-bind="overflowMenuOptions">
        <cv-overflow-menu-item
          v-for="(item, index) in overflowMenuButtons"
          :key="`${index}`"
          @click="
            onMenuItemClick({
              rowValue: value,
              menuIndex: index,
              menuLabel: item,
            })
          "
          >{{ item }}</cv-overflow-menu-item
        >
      </cv-overflow-menu>
    </td>
  </tr>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import CvCheckbox from '../CvCheckbox';
import CvOverflowMenu from '../CvOverflowMenu';
import CvOverflowMenuItem from '../CvOverflowMenu/CvOverflowMenuItem.vue';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import { computed, onMounted, onUpdated, ref, useSlots, watch } from 'vue';
import store from './cvDataTableStore';
import { getBus } from '../../global/component-utils/event-bus';

const props = defineProps({
  ariaLabelForBatchCheckbox: { type: String, default: undefined },
  checked: Boolean,
  expanded: Boolean,
  expandingRow: Boolean,
  ariaLabelExpandRow: { type: String, default: 'Expand current row' },
  ariaLabelCollapseRow: { type: String, default: 'Collapse current row' },
  overflowMenu: { type: Array, default: () => [] },
  value: { type: String, default: undefined },
  rowId: { type: String, default: undefined },
});

const dataSomeExpandingRows = computed(() => {
  return store.someExpandingRows(parent);
});

const overflowMenuButtons = computed(() => {
  return props.overflowMenu.filter(item => typeof item === 'string');
});
const overflowMenuOptions = computed(() => {
  const incomingOptions =
    props.overflowMenu.find(item => typeof item === 'object') || {};
  const defaultOptions = {
    flipMenu: true,
    label: 'Row overflow menu',
    tipPosition: 'left',
  };
  return { ...defaultOptions, ...incomingOptions };
});

const slots = useSlots();
const hasOverflowMenu = ref(false);
function checkSlots() {
  // NOTE: this.$slots is not reactive so needs to be managed on updated
  hasOverflowMenu.value = !!(
    (props.overflowMenu && props.overflowMenu.length) ||
    slots['overflow-menu']
  );
}
onMounted(checkSlots);
onUpdated(checkSlots);

const el = ref(null);
const parent = ref(null);
let bus;
onMounted(() => {
  const pe = el.value.closest('.cv-data-table');
  parent.value = pe?.getAttribute('id');
  if (parent.value) {
    store.getTable(parent);
    bus = getBus(parent);
  } else console.warn('data table not found');
});
const hasBatchActions = computed(() => {
  return store.hasBatchActions(parent);
});

function onMenuItemClick(val) {
  bus.emit('cv:click', val);
}

const emit = defineEmits(['expanded-change', 'checked-change']);
const dataExpanded = ref(props.expanded);
watch(
  () => props.expanded,
  () => {
    dataExpanded.value = props.expanded;
  }
);
function toggleExpand() {
  dataExpanded.value = !dataExpanded.value;
  emit('expanded-change', dataExpanded.value);
}

const dataChecked = ref(props.checked);
function onChange() {
  emit('checked-change', dataChecked.value);
}
watch(
  () => props.checked,
  () => {
    dataChecked.value = props.checked;
    emit('checked-change', dataExpanded.value);
  }
);
watch(
  () => store.state[parent.value]?.rows,
  () => {
    const row = store.findRow(parent, props.rowId);
    const isChecked = row?.isChecked;
    if (isChecked !== undefined) {
      dataChecked.value = isChecked;
    }
  },
  { deep: true }
);
</script>
