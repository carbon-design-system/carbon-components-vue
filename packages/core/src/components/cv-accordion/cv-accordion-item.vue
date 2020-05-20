<!--
  An item in a Carbon accordion.

  Usage:
    See accordion.vue
-->

<template>
  <li
    data-accordion-item
    class="cv-accordion-item bx--accordion__item"
    :class="itemClasses"
    @animationend="onAnimationEnd"
  >
    <button
      type="button"
      class="bx--accordion__heading"
      :aria-expanded="`${dataOpen}`"
      :aria-controls="uid"
      @click="toggle"
    >
      <ChevronRight16 class="bx--accordion__arrow" />
      <p class="bx--accordion__title">
        <slot name="title"></slot>
      </p>
    </button>
    <div :id="uid" class="bx--accordion__content">
      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvAccordionItem',
  mixins: [uidMixin],
  components: { ChevronRight16 },
  props: {
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
  computed: {
    itemClasses() {
      const classes = [];
      if (this.dataOpen) {
        classes.push('bx--accordion__item--active');
      }
      if (this.animation) {
        classes.push(`bx--accordion__item--${this.animation}`);
      }
      return classes.join(' ');
    },
  },
};
</script>
