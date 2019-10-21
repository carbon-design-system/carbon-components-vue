<template>
  <div class="cv-tabs">
    <div
      data-tabs
      class="cv-tab bx--tabs"
      role="navigation"
      v-on="$listeners"
      v-bind="$attrs"
      @keydown.right.prevent="moveRight"
      @keydown.left.prevent="moveLeft"
    >
      <cv-dropdown class="bx--tabs-trigger" :value="`${selectedIndex}`" @change="onDropChange" :form-item="false">
        <cv-dropdown-item v-for="(tab, index) in tabs" :key="`drop-${index}`" :value="`${index}`">{{
          tab.label
        }}</cv-dropdown-item>
      </cv-dropdown>
      <ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="cv-tabs-button bx--tabs__nav-item"
          :class="{
            'bx--tabs__nav-item--selected': selectedIndex == index,
            'bx--tabs__nav-item--disabled': disabledTabs.indexOf(index) !== -1,
          }"
          role="presentation"
        >
          <a
            class="bx--tabs__nav-link"
            href="javascript:void(0)"
            role="tab"
            :aria-controls="tab.uid"
            :id="`${tab.uid}-link`"
            aria-selected="false"
            @click="onTabClick(index)"
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
import CvDropdown from '../cv-dropdown/cv-dropdown';
import CvDropdownItem from '../cv-dropdown/cv-dropdown-item';

export default {
  name: 'CvTabs',
  components: { CvDropdown, CvDropdownItem },
  data() {
    return {
      tabs: [],
      selectedIndex: -1,
      selectedId: undefined,
      disabledTabs: [],
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
  methods: {
    onDropChange(val) {
      this.onTabClick(parseInt(val));
    },
    onCvMount(srcComponent) {
      this.tabs.push(srcComponent);

      this.checkDisabled(srcComponent);
      if (this.selectedIndex < 0) {
        this.checkSelected();
      }
    },
    onCvBeforeDestroy(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      if (tabIndex > -1) {
        this.tabs.splice(tabIndex, 1);

        this.checkDisabled(srcComponent);
        if (tabIndex <= this.selectedIndex) {
          this.checkSelected();
        }
      }
    },
    onTabClick(index) {
      if (this.disabledTabs.indexOf(index) === -1) {
        if (this.selectedId !== this.tabs[index].uid) {
          this.selectedIndex = index;
          this.selectedId = this.tabs[index].uid;

          for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].internalSelected = i === index;
          }
          this.$emit('tab-selected', index);
        }
      }
    },
    onCvSelected(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      this.onTabClick(tabIndex);
    },
    onCvDisabled(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      this.disabledTabs.push(tabIndex);
    },
    onCvEnabled(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      let arrIdx = this.disabledTabs.indexOf(tabIndex);
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
      let somethingSelected = false;

      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].internalSelected) {
          this.onTabClick(i);
          somethingSelected = true;
        }
      }
      if (!somethingSelected && this.tabs.length) {
        this.onTabClick(0);
      }
    },
    isAllTabsDisabled() {
      return this.disabledTabs.length === this.tabs.length;
    },
    moveLeft() {
      if (this.isAllTabsDisabled()) {
        return;
      }
      let newIndex;
      if (this.selectedIndex > 0) {
        newIndex = this.selectedIndex - 1;
      } else {
        newIndex = this.tabs.length - 1;
      }
      while (this.disabledTabs.indexOf(newIndex) !== -1) {
        if (newIndex > 0) {
          newIndex--;
        } else {
          newIndex = this.tabs.length - 1;
        }
      }
      this.onTabClick(newIndex);
      this.$refs.link[newIndex].focus();
    },
    moveRight() {
      if (this.isAllTabsDisabled()) {
        return;
      }
      let newIndex;
      if (this.selectedIndex < this.tabs.length - 1) {
        newIndex = this.selectedIndex + 1;
      } else {
        newIndex = 0;
      }
      while (this.disabledTabs.indexOf(newIndex) !== -1) {
        if (newIndex < this.tabs.length - 1) {
          newIndex = newIndex + 1;
        } else {
          newIndex = 0;
        }
      }
      this.onTabClick(newIndex);
      this.$refs.link[newIndex].focus();
    },
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 41.95rem) {
  .cv-tabs .bx--tabs-trigger {
    display: block;
    padding: 0;

    .cv-dropdown__arrow {
      // Carbon uses a different chevron for the tabs dropdown, undo size difference.
      width: initial;
      height: initial;
    }
  }
}
</style>
