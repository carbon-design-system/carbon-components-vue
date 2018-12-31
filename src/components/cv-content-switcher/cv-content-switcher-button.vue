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
const toggleContent = (selector, on) => {
  // hide content
  const content = document.querySelectorAll(selector);
  for (const element of content) {
    // element.style.visibility = on;
    if (!on) {
      element.setAttribute('hidden', 'hidden');
    } else {
      element.removeAttribute('hidden');
    }
    element.setAttribute('aria-hidden', `${!on}`);
  }
};

export default {
  name: 'CvContentSwitcherButton',
  props: {
    contentSelector: String,
    selected: Boolean,
  },
  data() {
    return {
      buttonId: undefined,
      dataSelected: false,
      onOpenFunction: undefined,
    };
  },
  mounted() {
    this.buttonId = Symbol('content switcher button');
    this.dataSelected = this.selected;
    this.onOpenFunction = this.$parent.register(
      this.buttonId,
      this.contentSelector,
      this.close
    );

    if (this.selected) {
      this.open();
    } else {
      this.close();
    }
  },
  beforeDestroy() {
    this.$parent.deregister(this.buttonId);
  },
  methods: {
    close() {
      this.dataSelected = false;
      toggleContent(this.contentSelector, false);
    },
    open() {
      this.onOpenFunction(this.buttonId);
      this.dataSelected = true;
      toggleContent(this.contentSelector, true);
    },
  },
};
</script>

<style lang="scss"></style>
