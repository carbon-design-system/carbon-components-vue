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
import { computed, provide, reactive } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { alignConsts, sizeConsts } from './consts';

export default {
  name: 'CvAccordion',
  props: {
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
  },
  emits: {
    /**
     * Triggers when the clear button is pressed on a filter CvTag
     */
    change: payload => {
      return (
        typeof payload?.change?.id === 'string' &&
        typeof payload?.change?.open === 'boolean' &&
        Array.isArray(payload?.state)
      );
    },
  },
  setup(props, { emit }) {
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

    // Functions provided to CvAccordionItem
    provide('registerItem', (itemCvId, item) => {
      items.set(itemCvId, item);
    });
    provide('deregisterItem', itemCvId => {
      items.delete(itemCvId);
    });
    provide('onAccItemChagne', (clickedItemCvId, open) => {
      items.get(clickedItemCvId).open = open;
      emit('change', {
        change: { id: clickedItemCvId, open },
        state: state.value,
      });
    });

    return { carbonPrefix, state };
  },
};
</script>

<style lang="scss"></style>
