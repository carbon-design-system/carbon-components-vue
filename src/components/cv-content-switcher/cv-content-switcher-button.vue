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
    type="button"
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
    contentSelector: { type: String, default: undefined },
    ownerId: { type: String, default: undefined },
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
    this.$_CvContentSwitcherButton = true; // for use by parent with $children

    if (this.contentSelector === '' && this.ownerId === '') {
      console.error(
        'CvContentSwitcherButton: ownerId or content-selector properties must not be empty strings.'
      );
    }

    this.dataSelected = this.selected;
    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
  computed: {
    buttonId() {
      return this.uid;
    },
    isSelected() {
      return this.dataSelected;
    },
  },
  methods: {
    close() {
      this.dataSelected = false;
    },
    open() {
      this.dataSelected = true;
      this.$parent.$emit('cv:open', this);
    },
  },
};
</script>

<style lang="scss"></style>
