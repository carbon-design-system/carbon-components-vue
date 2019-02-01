<template>
  <div class="cv-tabs">
    <nav
      data-tabs
      class="cv-tab bx--tabs"
      role="navigation"
      v-on="$listeners"
      @keydown.right.prevent="moveRight"
      @keydown.left.prevent="moveLeft"
    >
      <div class="bx--tabs-trigger" tabindex="0">
        <a
          href="javascript:void(0)"
          class="bx--tabs-trigger-text"
          tabindex="-1"
        ></a>
        <svg width="10" height="5" viewBox="0 0 10 5">
          <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
        </svg>
      </div>
      <ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="cv-tabs-button bx--tabs__nav-item"
          :class="{
            'bx--tabs__nav-item--selected': selectedIndex == index,
          }"
          role="presentation"
        >
          <a
            class="bx--tabs__nav-link"
            href="javascript:void(0)"
            role="tab"
            :aria-controls="tab.id"
            :id="`${tab.id}-link`"
            aria-selected="false"
            @click="onTabClick(index)"
            ref="link"
            >{{ tab.label }}</a
          >
        </li>
      </ul>
    </nav>
    <div class="cv-tabs__panels"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'CvTabs',
  data() {
    return {
      tabs: [],
      selectedIndex: 0,
    };
  },
  created() {
    // add these on created otherwise cv:mounted is too early.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestory', srcComponent =>
      this.onCvBeforeDestroy(srcComponent)
    );
    this.$on('cv:selected', srcComponent => this.onCvSelected(srcComponent));
  },
  methods: {
    onCvMount(srcComponent) {
      this.tabs.push(srcComponent);
      this.checkSelected();
    },
    onCvBeforeDestroy(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.id === srcComponent.id);
      if (tabIndex > -1) {
        this.tabs.splice(tabIndex, 1);
      }
      this.checkSelected();
    },
    onTabClick(index) {
      for (let i = 0; i < this.tabs.length; i++) {
        this.tabs[i].internalSelected = i === index;
      }
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
        this.$emit('tab-selected', index); // only needed if changed.
      }
    },
    onCvSelected(srcComponent) {
      const tabIndex = this.tabs.findIndex(item => item.id === srcComponent.id);
      this.onTabClick(tabIndex);
    },
    checkSelected() {
      const childTabs = this.$children.filter(child => child.$_CvTab);
      let somethingSelected = false;

      for (let i = 0; i < childTabs.length; i++) {
        if (childTabs[i].internalSelected) {
          this.onTabClick(i);
          somethingSelected = true;
        }
      }
      if (!somethingSelected && childTabs.length) {
        this.onTabClick(0);
      }
    },
    moveLeft() {
      let newIndex;
      if (this.selectedIndex > 0) {
        newIndex = this.selectedIndex - 1;
      } else {
        newIndex = this.tabs.length - 1;
      }
      this.onTabClick(newIndex);
      this.$refs.link[newIndex].focus();
    },
    moveRight() {
      let newIndex;
      if (this.selectedIndex < this.tabs.length - 1) {
        newIndex = this.selectedIndex + 1;
      } else {
        newIndex = 0;
      }
      this.onTabClick(newIndex);
      this.$refs.link[newIndex].focus();
    },
  },
};
</script>

<style lang="scss"></style>
