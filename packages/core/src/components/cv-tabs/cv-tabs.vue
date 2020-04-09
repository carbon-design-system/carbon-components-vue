<template>
  <div class="cv-tabs" @focusout="onFocusout" @focusin="onFocusin" style="width: 100%;">
    <div
      data-tabs
      class="cv-tab bx--tabs"
      :class="{ 'bx--tabs--container': container }"
      role="navigation"
      v-on="$listeners"
      v-bind="$attrs"
      @keydown.right.prevent="onRight"
      @keydown.left.prevent="onLeft"
      @keydown.down.prevent="onDown"
      @keydown.up.prevent="onUp"
      @keydown.esc.prevent="onEsc"
    >
      <div
        class="bx--tabs-trigger"
        :class="{ ' bx--tabs-trigger--open': open }"
        tabindex="0"
        ref="trigger"
        @click="onClick"
        @keydown.enter.prevent="onClick"
      >
        <a href="javascript:void(0)" class="bx--tabs-trigger-text" tabindex="-1">{{ currentTabLabel }}</a>
        <chevron-down-glyph />
      </div>
      <ul class="bx--tabs__nav" :class="{ 'bx--tabs__nav--hidden': !open }" role="tablist">
        <li
          v-for="tab in tabs"
          :key="tab.uid"
          class="cv-tabs-button bx--tabs__nav-item"
          :class="{
            'bx--tabs__nav-item--selected': selectedId == tab.uid,
            'bx--tabs__nav-item--disabled': disabledTabs.indexOf(tab.uid) !== -1,
          }"
          role="tab"
          :aria-selected="selectedId == tab.uid"
          :aria-disabled="disabledTabs.indexOf(tab.uid) !== -1"
        >
          <a
            class="bx--tabs__nav-link"
            href="javascript:void(0)"
            role="tab"
            :aria-controls="tab.uid"
            :id="`${tab.uid}-link`"
            @click="onTabClick(tab.uid)"
            @keydown.enter.prevent="onTabEnter(tab.uid)"
            ref="link"
            >{{ tab.label }}</a
          >
        </li>
      </ul>
    </div>
    <div class="cv-tabs__panels">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ChevronDownGlyph from '@carbon/icons-vue/es/chevron--down';

export default {
  name: 'CvTabs',
  props: {
    noDefaultToFirst: Boolean,
    container: Boolean,
  },
  components: { ChevronDownGlyph },
  data() {
    return {
      tabs: [],
      selectedId: undefined,
      disabledTabs: [],
      open: false,
      lastDisplayProp: undefined,
      // data is open
    };
  },
  created() {
    // add these on created otherwise cv:mounted is too early.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
    this.$on('cv:selected', srcComponent => this.onCvSelected(srcComponent));
    this.$on('cv:disabled', srcComponent => this.onCvDisabled(srcComponent));
    this.$on('cv:enabled', srcComponent => this.onCvEnabled(srcComponent));
  },
  computed: {
    triggerStyleOverride() {
      // <style carbon tweaks - DO NOT USE STYLE TAG as it causes SSR issues
      return { padding: 0 };
    },
    currentTabLabel() {
      const index = this.tabs.findIndex(tab => tab.uid === this.selectedId);

      return index > -1 ? this.tabs[index].label : '';
    },
  },
  methods: {
    onFocusin(ev) {
      if (ev.target.classList.contains('bx--tabs__nav-link') || ev.target.classList.contains('bx--tabs-trigger')) {
        // record display prop state
        this.lastDisplayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');
      } else {
        this.lastDisplayProp = undefined;
      }
    },
    onFocusout(ev) {
      // works with onFocusin to determine whether focus needs to be set to a tab or trigger
      const displayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');
      if (ev.relatedTarget) {
        if (
          ev.relatedTarget.classList.contains('bx--tabs__nav-link') ||
          ev.relatedTarget.classList.contains('bx--tabs-trigger')
        ) {
          return; // no need to do anything - focus is going somewhere
        } else {
          this.open = false;
        }
      } else {
        if (this.lastDisplayProp && this.lastDisplayProp !== displayProp) {
          if (displayProp === 'none') {
            // focus on selected tab
            const currentTabLink = this.$refs.link.find(link => link.getAttribute('aria-controls') === this.selectedId);
            if (currentTabLink) {
              currentTabLink.focus();
            }
          } else {
            this.$refs.trigger.focus();
          }
        } else {
          this.open = false;
        }
      }
    },
    onWindowResize() {
      // check whether trigger is displayed
      this.dataDropdownShown = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display') !== 'none';
    },
    onDropChange(val) {
      this.onTabClick(val);
    },
    onCvMount(srcComponent) {
      this.tabs.push(srcComponent);
      if (this.tabs.filter(item => item.uid === srcComponent.uid).length > 1) {
        console.error(`CvTabs: Duplicate ID specified for CvTab, this may cause issues. {id: ${srcComponent.id}}}`);
      }

      this.checkDisabled(srcComponent);
      if (this.selectedId === undefined) {
        this.checkSelected();
      } else {
        if (srcComponent.internalSelected) {
          this.onTabClick(srcComponent.uid);
        }
      }
    },
    onCvBeforeDestroy(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      if (tabIndex > -1) {
        const wasSelected = srcComponent.uid === this.selectedId;

        this.tabs.splice(tabIndex, 1);

        this.checkDisabled(srcComponent);

        if (wasSelected && this.tabs.length) {
          this.onTabClick(this.tabs[Math.max(tabIndex - 1, 0)].uid);
        }
      }
    },
    onTabClick(id) {
      if (this.disabledTabs.indexOf(id) === -1) {
        if (this.selectedId !== id) {
          let newIndex = -1;

          this.selectedId = id;

          for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].uid === id) {
              this.tabs[i].internalSelected = true;
              newIndex = i;
            } else {
              this.tabs[i].internalSelected = false;
            }
          }

          this.open = false;
          if (this.$refs.trigger) {
            // following code build sometimes trigger is not yet available
            this.$refs.trigger.focus();
          }

          this.$emit('tab-selected', newIndex);
        }
      }
    },
    onCvSelected(srcComponent) {
      this.onTabClick(srcComponent.uid);
    },
    onCvDisabled(srcComponent) {
      this.disabledTabs.push(srcComponent.uid);
    },
    onCvEnabled(srcComponent) {
      let arrIdx = this.disabledTabs.indexOf(srcComponent.uid);
      if (arrIdx !== -1) {
        this.disabledTabs.splice(arrIdx, 1);
      }
    },
    checkDisabled(srcComponent) {
      if (srcComponent.internalDisabled) {
        this.onCvDisabled(srcComponent);
      } else {
        this.onCvEnabled(srcComponent);
      }
    },
    checkSelected() {
      let id;

      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].internalSelected) {
          id = this.tabs[i].uid;
        }
      }

      if (!this.noDefaultToFirst && id === undefined && this.tabs.length) {
        id = this.tabs[0].uid;
      }

      if (id !== undefined) {
        this.$nextTick(() => {
          this.onTabClick(id);
        });
      }
    },
    isAllTabsDisabled() {
      return this.disabledTabs.length === this.tabs.length;
    },
    onTabEnter(id) {
      // const newIndex = this.tabs.findIndex(tab => tab.uid === id);

      this.onTabClick(id);
      this.$refs.trigger.focus();
    },
    onClick() {
      this.open = !this.open;
    },
    onEsc() {
      this.open = false;
    },
    onUp() {
      if (this.isAllTabsDisabled()) {
        return;
      }

      const displayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');

      if (displayProp !== 'none') {
        const el = document.activeElement;
        let id;
        if (el.classList.contains('bx--tabs__nav-link')) {
          id = el.getAttribute('aria-controls');
        } else {
          id = this.selectedId;
        }

        const newIndex = this.move(id, false);
        this.$refs.link[newIndex].focus();
      }
    },
    onDown() {
      if (this.isAllTabsDisabled()) {
        return;
      }

      const displayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');

      if (displayProp !== 'none') {
        if (!this.open) {
          this.open = true;
        } else {
          const el = document.activeElement;
          let id;
          if (el.classList.contains('bx--tabs__nav-link')) {
            id = el.getAttribute('aria-controls');
          } else {
            id = this.selectedId;
          }

          const newIndex = this.move(id, true);
          this.$refs.link[newIndex].focus();
        }
      }
    },
    onLeft() {
      if (this.isAllTabsDisabled()) {
        return;
      }

      const displayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');
      if (displayProp === 'none') {
        const newIndex = this.move(this.selectedId, false);
        const newId = this.tabs[newIndex].uid;

        this.onTabClick(newId);
        this.$refs.link[newIndex].focus();
      }
    },
    move(id, next) {
      let newIndex;
      let newId;

      newIndex = this.tabs.findIndex(tab => tab.uid === id);

      if (newIndex > -1) {
        newIndex = next ? newIndex + 1 : newIndex - 1;
      }
      if (newIndex < 0 || newIndex >= this.tabs.length) {
        newIndex = next ? 0 : this.tabs.length - 1;
      }

      newId = this.tabs[newIndex].uid;
      while (newId === this.selectedId || this.disabledTabs.indexOf(newId) !== -1) {
        if (newIndex > -1) {
          newIndex = next ? newIndex + 1 : newIndex - 1;
        }
        if (newIndex < 0 || newIndex >= this.tabs.length) {
          newIndex = next ? 0 : this.tabs.length - 1;
        }
        newId = this.tabs[newIndex].uid;
      }

      return newIndex;
    },
    onRight() {
      if (this.isAllTabsDisabled()) {
        return;
      }

      const displayProp = window.getComputedStyle(this.$refs.trigger).getPropertyValue('display');
      if (displayProp === 'none') {
        const newIndex = this.move(this.selectedId, true);
        const newId = this.tabs[newIndex].uid;

        this.onTabClick(newId);
        this.$refs.link[newIndex].focus();
      }
    },
    selected(index) {
      let selItem = this.tabs[index ? index : -1];
      this.selectedId = selItem ? selItem.uid : undefined;
    },
  },
};
</script>
