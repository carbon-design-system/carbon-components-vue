<template>
  <span
    :class="tagClasses"
    role="listitem"
    :title="title"
  >
    <span :class="`${carbonPrefix}--tag__label`">
      {{ label }}
      </span>
    <button 
      v-if="isFilter"
      :class="`${carbonPrefix}--tag__close-icon`"
      :aria-label="clearAriaLabel"
      @click="onRemove"
      :disabled="disabled"
    >
      <Close16 />
    </button>
  </span>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { tagKinds } from './consts';
import Close16 from '@carbon/icons-vue/es/close/16';

export default {
  name: 'CvTag',
  components: { Close16 },
  props: {
    // Docgen comments added for storybook doc page
    /**
     * asd by property or if skeleton
     */
    clearAriaLabel: { type: String, default: 'Clear filter' },
    /**
     * disabled by property or if skeleton
     */
    disabled: Boolean,
    label: { type: String, required: true },
    kind: {
      type: String,
      default: tagKinds[0],
      validator(val) {
        return tagKinds.includes(val);
      },
    },
    filter: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Triggers when the clear button is pressed on a filter CvTag
     */
    'remove'
  ],
  setup(props, { emit }) {
    const instance = getCurrentInstance();

    const isFilter = computed(() => {
      return props.filter;
    });

    const tagKind = computed(() => {
      return props.kind === 'filter' ? 'high-contrast' : props.kind;
    });

    const title = computed(() => {
      return isFilter.value ? props.clearAriaLabel : null;
    });

    const tagClasses = computed(() => {
      const classes = [
        `cv-tag`,
        `${carbonPrefix}--tag`,
        `${carbonPrefix}--tag--${tagKind.value}`
      ];

      if (isFilter.value)
      {
        classes.push(`${carbonPrefix}--tag--filter`);
      }

      if (props.disabled)
      {
        classes.push(`${carbonPrefix}--tag--disabled`);
      }
      return classes
    })

    const onRemove = ()  => {
      if (!props.disabled) {
        emit('remove');
      }
    };


    return {
      carbonPrefix,
      isFilter,
      tagKind,
      title,
      tagClasses,
      onRemove
    };
  },
};
</script>
