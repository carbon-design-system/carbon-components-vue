<template>
  <component
    :is="!isFilter && hasClickListener ? 'button' : 'div'"
    v-on="this.$listeners"
    :id="uid"
    :class="[
      `cv-tag ${carbonPrefix}--tag`,
      `${carbonPrefix}--tag--${tagKind}`,
      {
        [`${carbonPrefix}--tag--filter`]: isFilter,
        [`${carbonPrefix}--tag--${size}`]: size,
      },
    ]"
    :title="title"
    @keydown.enter.stop.prevent="$emit('remove')"
    @keydown.space.prevent
    @keyup.space.prevent="$emit('remove')"
  >
    <div v-if="icon && !filter" :class="`${carbonPrefix}--tag__custom-icon`">
      <CvSvg :svg="icon" />
    </div>
    <span :class="`${carbonPrefix}--tag__label`">{{ label }}</span>
    <button
      v-if="isFilter"
      :class="`${carbonPrefix}--tag__close-icon`"
      :aria-label="clearAriaLabel"
      @click.stop.prevent="onRemove"
      :disabled="disabled"
    >
      <Close16 />
    </button>
  </component>
</template>

<script>
import Close16 from '@carbon/icons-vue/es/close/16';
import { carbonPrefixMixin, uidMixin } from '../../mixins';
import CvSvg from '../cv-svg/_cv-svg';

const tagKinds = [
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
  'high-contrast',
];

export default {
  name: 'CvTag',
  mixins: [carbonPrefixMixin, uidMixin],
  components: { Close16, CvSvg },
  props: {
    clearAriaLabel: { type: String, default: 'Clear filter' },
    disabled: Boolean,
    icon: {
      type: [String, Object],
      default: undefined,
      validator(val) {
        if (!val || typeof val === 'string') {
          return true;
        }
        return val.render !== null;
      },
    },
    label: { type: String, required: true },
    kind: {
      type: String,
      default: tagKinds[0],
      validator(val) {
        if (val === 'filter' && process.env.NODE_ENV === 'development') {
          console.warn('DEPRECARTED: Prefer props.filter (bool)');
          return true;
        }
        return tagKinds.includes(val);
      },
    },
    filter: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(val) {
        return !val || val == 'sm';
      },
    },
  },
  data() {
    return {
      hasClickListener: !!this.$listeners.click,
    };
  },
  updated() {
    this.hasClickListener = !!this.$listeners.click;
  },
  computed: {
    isFilter() {
      return this.filter || this.kind === 'filter';
    },
    tagKind() {
      return this.kind === 'filter' ? 'high-contrast' : this.kind;
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
