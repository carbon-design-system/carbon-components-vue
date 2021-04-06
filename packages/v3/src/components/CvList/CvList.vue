<template>
  <component
    :is="listType"
    :class="{
      [`${carbonPrefix}--list--nested`]: nested,
      [`${carbonPrefix}--list--ordered`]: isActuallyOrdered,
      [`${carbonPrefix}--list--unordered`]: !isActuallyOrdered,
    }"
  >
    <slot />
  </component>
</template>

<script>
import { getCurrentInstance, computed } from 'vue';
import { carbonPrefix } from '../../global/settings';

export default {
  name: 'CvList',
  props: {
    /** Is the list ordered? */
    ordered: {
      type: Boolean,
      default: undefined,
    },
    /** Is this list nested in another list? */
    nested: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const instance = getCurrentInstance();

    const isActuallyOrdered = computed(() => {
      if (props.nested && props.ordered === undefined) {
        if (instance.parent?.parent?.type.name === instance.type.name) {
          return instance.parent?.parent?.setupState.isActuallyOrdered;
        }
      }

      return props.ordered || false;
    });

    const listType = computed(() => (isActuallyOrdered.value ? 'ol' : 'ul'));

    return { carbonPrefix, isActuallyOrdered, listType };
  },
};
</script>
