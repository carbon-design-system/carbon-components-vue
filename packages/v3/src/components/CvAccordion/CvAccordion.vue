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
    align: {
      type: String,
      default: 'start',
      validator: val => alignConsts.includes(val),
    },
    size: {
      type: String,
      default: '',
      validator: val => sizeConsts.includes(val),
    },
  },
  emits: [
    /**
     * Triggers when the clear button is pressed on a filter CvTag
     */
    'change',
  ],
  setup(props, { emit }) {
    const items = reactive(new Map());
    const state = computed({
      get() {
        return Array.from(items).map(item => ({
          id: item.cvId,
          open: item.open,
        }));
      },
      set(newStates) {
        newStates.forEach(newState => {
          items.get(newState.id).open = newState.open;
        });
      },
    });

    provide('reg', (itemCvId, item) => {
      items.set(itemCvId, item);
    });
    provide('dereg', itemCvId => {
      items.delete(itemCvId);
    });
    provide('onAccItemClick', (clickedItemCvId, open) => {
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
