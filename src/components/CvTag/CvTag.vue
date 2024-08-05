<template>
  <div v-if="skeleton" :class="tagClasses"></div>
  <div v-else :class="tagClasses" role="listitem" :title="title">
    <cv-svg
      v-if="!skeleton && renderIcon"
      :svg="renderIcon"
      :class="`${carbonPrefix}--tag__custom-icon`"
    />
    <span :class="`${carbonPrefix}--tag__label`">
      {{ label }}
    </span>
    <button
      v-if="filter"
      :class="`${carbonPrefix}--tag__close-icon`"
      :aria-label="clearAriaLabel"
      :disabled="disabled || null"
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
import CvSvg from '../CvSvg/_CvSvg.vue';

export default {
  name: 'CvTag',
  components: { CvSvg, Close16 },
  props: {
    /** aria label to use for the x icon for the filter tag */
    clearAriaLabel: { type: String, default: 'Clear filter' },
    /** disabled by property or if skeleton */
    disabled: Boolean,
    /** label to be used in the CvTag component */
    label: { type: String, required: true },
    /** kind of the CvTag */
    kind: {
      type: String,
      default: undefined,
      validator(val) {
        return tagKinds.includes(val);
      },
    },
    /**
     * If filter is true, the CvTag will include a remove button on the right side, which on a click, will emit the
     * 'remove' event.
     */
    filter: {
      type: Boolean,
      default: false,
    },
    /** skeleton used when loading */
    skeleton: Boolean,
    /** tag size small */
    small: Boolean,
    /** Optional prop to render a custom icon. \@carbon/icons-vue icon, href, svg or symbol */
    renderIcon: {
      type: [String, Object],
      default: undefined,
    },
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
      const classes = [`cv-tag ${carbonPrefix}--tag`];

      if (props.small) classes.push(`${carbonPrefix}--tag--sm`);

      if (props.skeleton) {
        classes.push(`${carbonPrefix}--skeleton`);
      } else {
        if (props.kind) {
          classes.push(`${carbonPrefix}--tag--${props.kind}`);
        }

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
