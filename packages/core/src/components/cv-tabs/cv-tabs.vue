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
      <cv-dropdown class="bx--tabs-trigger" :value="`${selectedId}`" @change="onDropChange" :form-item="false">
        <cv-dropdown-item v-for="tab in tabs" :key="`drop-${tab.uid}`" :value="`${tab.uid}`">
          {{ tab.label }}
        </cv-dropdown-item>
      </cv-dropdown>
      <ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
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
  props: {
    noDefaultToFirst: Boolean,
  },
  data() {
    return {
      tabs: [],
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
      this.onTabClick(val);
    },
    onCvMount(srcComponent) {
      this.tabs.push(srcComponent);

      this.checkDisabled(srcComponent);
      if (this.selectedId === undefined) {
        this.checkSelected();
      }
    },
    onCvBeforeDestroy(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.uid === srcComponent.uid);
      if (tabIndex > -1) {
        const wasSelected = srcComponent.uid === this.selectedId;

        this.tabs.splice(tabIndex, 1);
        this.selectedId = undefined;

        this.checkDisabled(srcComponent);

        if (wasSelected) {
          this.checkSelected();
        }
      }
    },
    onTabClick(id) {
      if (this.disabledTabs.indexOf(id) === -1) {
        if (this.selectedId !== id) {
          let newIndex = -1;

          this.selectedId = id;

          for (let i = 0; i < this.tabs.length && newIndex < 0; i++) {
            if (this.tabs[i].uid === id) {
              this.tabs[i].internalSelected = true;
              newIndex = i;
            } else {
              this.tabs[i].internalSelected = false;
            }
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
      let somethingSelected = false;

      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].internalSelected) {
          this.onTabClick(this.tabs[i].uid);
          somethingSelected = true;
        }
      }

      if (!this.noDefaultToFirst && !somethingSelected && this.tabs.length) {
        this.onTabClick(this.tabs[0].uid);
      }
    },
    isAllTabsDisabled() {
      return this.disabledTabs.length === this.tabs.length;
    },
    moveLeft() {
      if (this.isAllTabsDisabled()) {
        return;
      }
      let newId;
      let newIndex;

      if (this.selectedId) {
        newIndex = this.tabs.indexOf(this.selectedId);
      }

      if (newIndex > 0) {
        newIndex--;
      } else {
        newIndex = this.tabs.length - 1;
      }
      newId = this.tabs[newIndex].uid;

      while (this.disabledTabs.indexOf(newId) !== -1) {
        if (newIndex > 0) {
          newIndex--;
        } else {
          newIndex = this.tabs.length - 1;
        }
        newId = this.tabs[newIndex].uid;
      }
      this.onTabClick(newId);
      this.$refs.link[newIndex].focus();
    },
    moveRight() {
      if (this.isAllTabsDisabled()) {
        return;
      }
      let newId;
      let newIndex;

      if (this.selectedId) {
        newIndex = this.tabs.indexOf(this.selectedId);
      }

      if (newIndex < this.tabs.length - 1) {
        newIndex++;
      } else {
        newIndex = 0;
      }
      newId = this.tabs[newIndex].uid;

      while (this.disabledTabs.indexOf(newIndex) !== -1) {
        if (newIndex < this.tabs.length - 1) {
          newIndex++;
        } else {
          newIndex = 0;
        }
        newId = this.tabs[newIndex].uid;
      }

      this.onTabClick(newId);
      this.$refs.link[newIndex].focus();
    },
    selected(index) {
      let selItem = this.tabs[index ? index : -1];
      this.selectedId = selItem ? selItem.uid : undefined;
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
