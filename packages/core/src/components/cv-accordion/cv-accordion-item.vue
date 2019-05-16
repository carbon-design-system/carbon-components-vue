<!--
  An item in a Carbon accordion.

  Usage:
    See accordion.vue
-->

<template>
  <li
    data-accordion-item
    class="cv-accordion-item bx--accordion__item"
    :class="{ 'bx--accordion__item--active': dataOpen }"
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
  mounted() {
    this.dataOpen = this.open;
  },
  watch: {
    open(val) {
      this.dataOpen = val;
    },
  },
  data() {
    return {
      dataOpen: false,
    };
  },
  methods: {
    toggle(force) {
      if (typeof force === 'boolean') {
        this.dataOpen = force === true;
      } else {
        this.dataOpen = !this.dataOpen;
      }
    },
  },
};
</script>
