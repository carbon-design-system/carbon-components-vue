<!--
  An item in a Carbon accordion.

  Usage:
    See accordion.vue
-->

<template>
  <li
    data-accordion-item
    class="cv-accordion-item"
    :class="[
      `${carbonPrefix}--accordion__item`,

      {
        [`${carbonPrefix}--accordion__item--disabled`]: disabled,
        [`${carbonPrefix}--accordion__item--active`]: dataOpen,
        [`${carbonPrefix}--accordion__item--${this.animation}`]: animation,
      },
    ]"
    @animationend="onAnimationEnd"
  >
    <button
      :disabled="disabled"
      ref="button"
      type="button"
      :class="`${carbonPrefix}--accordion__heading`"
      :aria-expanded="dataOpen ? 'true' : 'false'"
      :aria-controls="uid"
      @click="toggle"
    >
      <ChevronRight16 :class="`${carbonPrefix}--accordion__arrow`" />
      <p :class="`${carbonPrefix}--accordion__title`">
        <slot name="title"></slot>
      </p>
    </button>
    <div :id="uid" :class="`${carbonPrefix}--accordion__content`">
      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import { uidMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';
export default {
  name: 'CvAccordionItem',
  mixins: [uidMixin, carbonPrefixMixin, methodsMixin({ button: ['blur', 'focus'] })],
  components: { ChevronRight16 },
  props: {
    disabled: Boolean,
    open: { type: Boolean, default: false },
  },
  watch: {
    open: {
      immediate: true,
      handler(value) {
        this.dataOpen = value;
      },
    },
  },
  data() {
    return {
      animation: '',
      dataOpen: false,
    };
  },
  mounted() {
    this.$_CvAccordionItem = true; // for use by parent with $children
  },
  methods: {
    toggle(force) {
      this.animation = this.dataOpen ? 'collapsing' : 'expanding';
      const newValue = typeof force === 'boolean' ? !!force : !this.dataOpen;
      const change = this.dataOpen !== undefined && newValue !== this.dataOpen;

      this.dataOpen = newValue;
      if (change) {
        this.$parent.$emit('cv:change', this);
      }
    },
    onAnimationEnd() {
      this.animation = '';
    },
  },
};
</script>
