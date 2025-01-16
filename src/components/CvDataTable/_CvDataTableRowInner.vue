<template>
  <tr
    class="cv-data-table-row-inner"
    :data-value="value"
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
    </td>
    <td
      v-if="hasBatchActions"
      :class="`${carbonPrefix}--table-column-checkbox`"
    >
      <cv-checkbox-skeleton v-if="isSkeleton" />
      <cv-checkbox
        v-else
        :id="`row-checked-${id}`"
        ref="rowChecked"
        v-model="dataChecked"
        :form-item="false"
        :value="value"
        :inline="true"
        :label="
          ariaLabelForBatchCheckbox || `Select row ${value} for batch action`
        "
        :hide-label="true"
        @change="onChange"
      />
    </td>
    <slot />
    <td v-if="hasOverflowMenu" :class="`${carbonPrefix}--table-column-menu`">
      <cv-overflow-menu v-bind="overflowMenuOptions" :id="`om-${id}`">
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
import { CvCheckbox, CvCheckboxSkeleton } from '../CvCheckbox';
import CvOverflowMenu from '../CvOverflowMenu';
import CvOverflowMenuItem from '../CvOverflowMenu/CvOverflowMenuItem.vue';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import {
  computed,
  onMounted,
  onUpdated,
  ref,
  useSlots,
  watch,
  inject,
  useAttrs,
} from 'vue';
import { useCvId } from '../../use/cvId';

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

const attrs = useAttrs();
const id = useCvId(attrs, true);

const isSkeleton = inject('is-skeleton', ref(false));
/** @type {Ref<UnwrapRef<Set<>>>} */
const expandingRowIds = inject('expanding-row-ids', ref(new Set()));
const dataSomeExpandingRows = computed(() => {
  return expandingRowIds.value.size > 0;
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

const hasBatchActions = inject('has-batch-actions', ref(false));

const emitClick = inject('cv:click');
function onMenuItemClick(val) {
  emitClick(val);
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
const rowsSelected = inject('rows-selected');
watch(
  () => rowsSelected,
  () => {
    // For historical reasons we have a prop named "value" but this makes the code
    // below look weird since .value is used for refs. So just a note that this
    // is not a ref is a prop named "value"
    const isChecked = rowsSelected.value.includes(props.value);
    if (isChecked !== undefined) {
      dataChecked.value = isChecked;
    }
  },
  { deep: true }
);
</script>
