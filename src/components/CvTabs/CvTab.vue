<template>
  <div
    :class="`cv-tab ${carbonPrefix}--tab-content`"
    :id="uid"
    role="tabpanel"
    :aria-labelledby="`${uid}-link`"
    :aria-hidden="!dataSelected ? 'true' : 'false'"
    :hidden="!dataSelected"
  >
    <slot>
      <!-- Content for tab goes here. -->
    </slot>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, required: true },
  ...propsCvId,
});
const uid = useCvId(props, true);

/**
 * Is this tab selected?
 * @type {Ref<UnwrapRef<string>>}
 */
const tabSelected = inject('tab-selected');
const dataSelected = ref(props.selected);
onMounted(() => {
  if (props.selected) tabSelected.value = uid.value;
});
watch(
  () => props.selected,
  () => {
    if (props.selected) tabSelected.value = uid.value;
  }
);
watch(tabSelected, () => {
  dataSelected.value = tabSelected.value === uid.value;
});

/**
 * Is this tab disabled?
 * @type {Ref<UnwrapRef<Set>>}
 */
const tabDisabledIds = inject('tab-disabled-ids');
function updateTabDisabled() {
  if (props.disabled) tabDisabledIds.value?.add(uid.value);
  else tabDisabledIds.value?.delete(uid.value);
}
onMounted(updateTabDisabled);
watch(() => props.disabled, updateTabDisabled);

/**
 * Keep this tab's data up to date
 * @type {Ref<UnwrapRef<Array<TabData>>>}
 */
const tabData = inject('tab-data');
function updateTabData() {
  const index = tabData.value?.findIndex(tab => tab.uid === uid.value);
  if (index > -1)
    tabData.value.splice(index, 1, { uid: uid.value, label: props.label });
  else tabData.value.push({ uid: uid.value, label: props.label });
}
onMounted(updateTabData);
watch(() => props.label, updateTabData);
onBeforeUnmount(() => {
  const index = tabData.value?.findIndex(tab => tab.uid === uid.value);
  if (index > -1) tabData.value.splice(index, 1);
});
</script>
