<template>
  <div data-content-switcher class="cv-content-switcher bx--content-switcher" role="tablist">
    <slot></slot>
  </div>
</template>

<script>
import store from './cv-content-switcher-store';

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
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:open', srcComponent => this.onCvOpen(srcComponent));
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
  },
  data() {
    return {
      store: store,
    };
  },
  methods: {
    switcherButtons() {
      return this.$children.filter(item => item.$_CvContentSwitcherButton);
    },
    onCvMount(srcComponent) {
      this.processState(srcComponent, srcComponent.isSelected);
    },
    onCvBeforeDestroy(srcComponent) {
      let nextOpen;
      if (srcComponent.isSelected) {
        const switcherButtons = this.switcherButtons();

        for (let index in switcherButtons) {
          if (
            switcherButtons[index].$_CvContentSwitcherButton &&
            switcherButtons[index].buttonId !== srcComponent.buttonId
          ) {
            nextOpen = switcherButtons[index];
            break;
          }
        }
      }
      // unhide content for destroyed srcComponent
      if (srcComponent.ownerId) {
        this.store.remove(srcComponent.ownerId);
      } else {
        toggleContent(srcComponent.contentSelector, true);
      }
      if (nextOpen) {
        setTimeout(() => {
          nextOpen.open();
        }, 1);
      }
    },
    processState(srcComponent, state) {
      const innerProcessState = (component, newState) => {
        if (component.ownerId) {
          this.store.setState(component.ownerId, newState);
        } else {
          toggleContent(component.contentSelector, newState);
        }
      };
      innerProcessState(srcComponent, state);

      if (state) {
        // if opening one button close others
        const switcherButtons = this.switcherButtons();
        for (let index in switcherButtons) {
          if (switcherButtons[index].buttonId !== srcComponent.buttonId) {
            switcherButtons[index].close();
            innerProcessState(switcherButtons[index], false);
          }
        }
      }
    },
    onCvOpen(srcComponent) {
      this.$emit('selected', srcComponent.ownerId ? srcComponent.ownerId : srcComponent.contentSelector);
      this.processState(srcComponent, true);
    },
  },
};
</script>
