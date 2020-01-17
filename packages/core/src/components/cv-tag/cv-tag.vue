<template>
  <span
    class="cv-tag bx--tag"
    :class="[
      `bx--tag--${kind}`,
      {
        'bx--tag--filter': isFilter,
        'bx--tag--disabled': disabled,
      },
    ]"
    :tabindex="!disabled ? 0 : undefined"
    role="listitem"
    :title="title"
    @keydown.enter.stop.prevent="$emit('remove')"
    @keydown.space.prevent
    @keyup.space.prevent="$emit('remove')"
  >
    <span class="bx--tag__label">{{ label }}</span>
    <Close16 v-if="isFilter" :aria-label="clearAriaLabel" role="button" @click.stop.prevent="onRemove" />
  </span>
</template>

<script>
import Close16 from '@carbon/icons-vue/es/close/16';

const componentsTags = [
  'filter',
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
];

export default {
  name: 'CvTag',
  components: { Close16 },
  props: {
    clearAriaLabel: { type: String, default: 'Clear filter' },
    disabled: Boolean,
    label: { type: String, required: true },
    kind: {
      type: String,
      default: componentsTags[0],
      validator(val) {
        return componentsTags.includes(val);
      },
    },
  },
  computed: {
    isFilter() {
      return this.kind === 'filter';
    },
    title() {
      return this.isFilter ? this.clearAriaLabel : null;
    },
  },
  methods: {
    onRemove() {
      if (!this.disabled) {
        this.$emit('remove');
      }
    },
  },
};
</script>
