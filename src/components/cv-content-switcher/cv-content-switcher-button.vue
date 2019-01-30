<!--
  Carbon content switcher button.

  Attributes:
    content-selector: A CSS selector for the content to be shown when the button is selected.
    selected: If true the button is initially selected (only valid on one button per content switcher).

  Usage:
    See content-switcher.vue

-->

<template>
  <button
    class="cv-content-switcher-button"
    :class="[
      'bx--content-switcher-btn',
      {
        'bx--content-switcher--selected': dataSelected,
      },
    ]"
    :data-target="contentSelector"
    :aria-selected="`${dataSelected}`"
    @click="open"
  >
    <slot></slot>
  </button>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvContentSwitcherButton',
  mixins: [uidMixin],
  props: {
    contentSelector: { type: String, required: true },
    selected: Boolean,
  },
  watch: {
    selected(val) {
      if (val) {
        this.open();
      } else {
        this.close();
      }
    },
  },
  data() {
    return {
      dataSelected: false,
    };
  },
  mounted() {
    this.dataSelected = this.selected;
    this.$parent.$emit('cv:mounted', this);
  },
  computed: {
    buttonId() {
      return this.uid;
    },
    isSelected() {
      return this.selected;
    },
  },
  methods: {
    close() {
      this.dataSelected = false;
    },
    open() {
      this.$parent.$emit('cv:open', this);
      this.dataSelected = true;
    },
  },
};
</script>

<style lang="scss"></style>
