<template>
  <div data-content-switcher class="cv-content-switcher bx--content-switcher">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CvContentSwitcher',
  data() {
    return {
      switcherButtons: [],
    };
  },
  methods: {
    onOpen(buttonId) {
      let openButton;

      for (let index in this.switcherButtons) {
        if (this.switcherButtons[index].buttonId !== buttonId) {
          this.switcherButtons[index].closeFunction();
        } else {
          openButton = this.switcherButtons[index];
        }
      }
      if (openButton !== undefined) {
        this.$emit('selected', openButton.contentSelector);
      }
    },
    register(buttonId, contentSelector, closeFunction) {
      this.deregister(buttonId);
      this.switcherButtons.push({ buttonId, contentSelector, closeFunction });

      return this.onOpen;
    },
    deregister(buttonId) {
      let index = this.switcherButtons.findIndex(
        item => item.buttonId === buttonId
      );
      this.switcherButtons.slice(index, index + 1);
    },
  },
};
</script>

<style lang="scss">
</style>
