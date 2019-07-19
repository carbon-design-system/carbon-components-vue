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
    :title="title"
  >
    {{ label }}
    <Close16
      v-if="isFilter"
      aria-label="Clear filter"
      @click.stop.prevent="$emit('remove')"
      tabindex="0"
      @keydown.enter.stop.prevent="$emit('remove')"
      @keydown.space.prevent
      @keyup.space.prevent="$emit('remove')"
    />
  </span>
</template>

<script>
import Close16 from '@rocketsoftware/icons-vue/es/close/16';

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
      return this.isFilter ? 'Close filter' : null;
    },
  },
};
</script>
