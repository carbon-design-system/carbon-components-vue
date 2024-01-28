<template>
  <ul
    data-accordion
    :class="[
      `cv-accordion ${carbonPrefix}--accordion`,
      {
        [`${carbonPrefix}--accordion--${align}`]: align,
        [`${carbonPrefix}--accordion--${size}`]: size,
      },
    ]"
  >
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'CvAccordion',
};
</script>

<script setup>
import { computed, provide, reactive } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { alignConsts, sizeConsts } from './consts';

defineProps({
  /**
   * optional align, defaults to 'end'
   */
  align: {
    type: String,
    default: null,
    validator: val => alignConsts.includes(val),
  },
  /**
   * optional size setting
   */
  size: {
    type: String,
    default: null,
    validator: val => sizeConsts.includes(val),
  },
});

const emit = defineEmits({
  /**
   * Triggers when state of an accordion item changes
   */
  change: payload => {
    return (
      typeof payload?.change?.id === 'string' &&
      typeof payload?.change?.open === 'boolean' &&
      Array.isArray(payload?.state)
    );
  },
});

const items = reactive(new Map());
const state = computed({
  get() {
    return Array.from(items).map(item => ({
      id: item[0], // key
      open: item[1].open, // value
    }));
  },
  set(newStates) {
    newStates.forEach(newState => {
      const item = items.get(newState.id);
      if (item?.open !== newState.open) {
        item.toggleOpen();
      }
    });
  },
});

defineExpose({ state });

// Functions provided to CvAccordionItem
provide('registerItem', (itemCvId, item) => {
  items.set(itemCvId, item);
});
provide('deregisterItem', itemCvId => {
  items.delete(itemCvId);
});

/**
 * @typedef {Object} AccordianChangeElement
 * @property {string} id
 * @property {boolean} open
 */

/**
 * @typedef {Object} AccordianChangeEvent
 * @property {AccordianChangeElement} change
 * @property {Array<AccordianChangeElement>} state
 * @param ev
 */
provide('onAccItemChange', (clickedItemCvId, open) => {
  items.get(clickedItemCvId).open = open;
  emit('change', {
    change: { id: clickedItemCvId, open },
    state: state.value,
  });
});
</script>

<style lang="scss"></style>
