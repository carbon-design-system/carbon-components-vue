<template>
  <div data-content-switcher class="cv-content-switcher bx--content-switcher">
    <slot></slot>
  </div>
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
  name: 'CvContentSwitcher',
  data() {
    return {
      switcherButtons: [],
    };
  },
  created() {
    // add these on created otherwise cv:mounted is too early.
    this.$on('cv:open', srcComponent => this.onCvOpen(srcComponent));
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
  },
  methods: {
    onCvMount(srcComponent) {
      toggleContent(srcComponent.contentSelector, srcComponent.isSelected);
    },
    onCvOpen(srcComponent) {
      this.$emit('selected', srcComponent.contentSelector);
      toggleContent(srcComponent.contentSelector, true);

      for (let index in this.$children) {
        if (this.$children[index].buttonId !== srcComponent.buttonId) {
          this.$children[index].close();
          toggleContent(this.$children[index].contentSelector, false);
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
