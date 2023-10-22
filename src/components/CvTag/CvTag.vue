<template>
  <div v-if="skeleton" :class="tagClasses"></div>
  <div v-else :class="tagClasses" role="listitem" :title="title">
    <span :class="`${carbonPrefix}--tag__label`">
      {{ label }}
    </span>
    <button
      v-if="filter"
      :class="`${carbonPrefix}--tag__close-icon`"
      :aria-label="clearAriaLabel"
      :disabled="disabled"
      @click.stop.prevent="onRemove"
    >
      <Close16 />
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { tagKinds } from './consts';
import Close16 from '@carbon/icons-vue/es/close/16';

export default {
  name: 'CvTag',
  components: { Close16 },
  props: {
    clearAriaLabel: { type: String, default: 'Clear filter' },
    /**
     * disabled by property or if skeleton
     */
    disabled: Boolean,
    /**
     * label to be used in the CvTag component
     */
    label: { type: String, required: true },
    /**
     * kind of the CvTag
     */
    kind: {
      type: String,
      default: 'red',
      validator(val) {
        return tagKinds.includes(val);
      },
    },
    /**
     * If filter is true, the CvTag will include a remove button on the right side, which on a click, will emit the 'remove' event.
     */
    filter: {
      type: Boolean,
      default: false,
    },
    /**
     * skeleton used when loading
     */
    skeleton: Boolean,
    /**
     * tag size small
     */
    small: Boolean,
  },
  emits: [
    /**
     * Triggers when the clear button is pressed on a filter CvTag
     */
    'remove',
  ],
  setup(props, { emit }) {
    const title = computed(() => {
      return props.filter ? props.clearAriaLabel : null;
    });

    const tagClasses = computed(() => {
      const classes = [`${carbonPrefix}--tag`];

      if (props.small) classes.push(`${carbonPrefix}--tag--sm`);

      if (props.skeleton) {
        classes.push(`${carbonPrefix}--skeleton`);
      } else {
        classes.push(`${carbonPrefix}--tag--${props.kind}`);

        if (props.filter) {
          classes.push(`${carbonPrefix}--tag--filter`);
        }

        if (props.disabled) {
          classes.push(`${carbonPrefix}--tag--disabled`);
        }
      }
      return classes;
    });

    const onRemove = () => {
      if (!props.disabled) {
        emit('remove');
      }
    };

    return {
      carbonPrefix,
      title,
      tagClasses,
      onRemove,
    };
  },
};
</script>
