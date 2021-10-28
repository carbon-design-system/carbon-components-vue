<template>
  <div class="cv-tabs" ref="tabs" style="width: 100%;">
    <div
      data-tabs
      :class="[`cv-tab ${carbonPrefix}--tabs--scrollable`, { [`${carbonPrefix}--tabs--container`]: container }]"
      role="navigation"
      v-on="$listeners"
      v-bind="$attrs"
      @keydown.right.prevent.stop="onRight"
      @keydown.left.prevent.stop="onLeft"
    >
      <button
        aria-hidden="true"
        aria-label="scroll left"
        :class="[
          {
            [`${carbonPrefix}--tab--overflow-nav-button`]: horizontalOverflow,
            [`${carbonPrefix}--tab--overflow-nav-button--hidden`]: leftOverflowNavButtonHidden,
          },
        ]"
        @click.stop.prevent="e => onOverflowClick(e, { direction: -1 })"
        @mousedown.stop.prevent="e => onOverflowMouseDown(e, { direction: -1 })"
        @mouseup.stop.prevent="onOverflowMouseUp"
        tabIndex="-1"
        type="button"
        ref="leftOverflow"
      >
        <ChevronLeft16 />
      </button>
      <div v-if="!leftOverflowNavButtonHidden" :class="`${carbonPrefix}--tabs__overflow-indicator--left`" />

      <ul :class="`${carbonPrefix}--tabs--scrollable__nav`" role="tablist" ref="tablist">
        <li
          v-for="tab in tabs"
          :key="tab.uid"
          :class="[
            `cv-tabs-button  ${carbonPrefix}--tabs--scrollable__nav-item`,
            {
              [`${carbonPrefix}--tabs__nav-item--selected`]: selectedId == tab.uid,
              [`${carbonPrefix}--tabs__nav-item--disabled`]: disabledTabs.indexOf(tab.uid) !== -1,
              // TODO: remove scrollable in next major release
              [`${carbonPrefix}--tabs--scrollable__nav-item--disabled`]: disabledTabs.indexOf(tab.uid) !== -1,
              [`${carbonPrefix}--tabs--scrollable__nav-item--selected`]: selectedId == tab.uid,
            },
          ]"
          role="presentation"
          :aria-selected="selectedId == tab.uid ? 'true' : 'false'"
          :aria-disabled="disabledTabs.indexOf(tab.uid) !== -1"
        >
          <button
            :class="`${carbonPrefix}--tabs--scrollable__nav-link`"
            role="tab"
            :aria-controls="tab.uid"
            :aria-disabled="disabledTabs.indexOf(tab.uid) !== -1"
            :aria-selected="selectedId == tab.uid"
            :id="`${tab.uid}-link`"
            @click="onTabClick(tab.uid)"
            ref="link"
            eslint-disable-next-line
            :tabindex="
              // eslint-disable-nextx-line
              selectedId == tab.uid ? 0 : -1
            "
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div v-if="!rightOverflowNavButtonHidden" :class="`${carbonPrefix}--tabs__overflow-indicator--right`" />
      <button
        aria-hidden="true"
        aria-label="scroll right"
        :class="[
          {
            [`${carbonPrefix}--tab--overflow-nav-button`]: horizontalOverflow,
            [`${carbonPrefix}--tab--overflow-nav-button--hidden`]: rightOverflowNavButtonHidden,
          },
        ]"
        @click="e => onOverflowClick(e, { direction: 1 })"
        @mousedown="e => onOverflowMouseDown(e, { direction: 1 })"
        @mouseup="onOverflowMouseUp"
        tabIndex="-1"
        type="button"
        ref="rightOverflow"
      >
        <ChevronRight16 />
      </button>
    </div>
    <div class="cv-tabs__panels">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ChevronLeft16, ChevronRight16 } from '@carbon/icons-vue';
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvTabs',
  mixins: [carbonPrefixMixin],
  props: {
    container: Boolean,
    leftOverflowIconButtonProps: Object,
    noDefaultToFirst: Boolean,
    rightOverflowIconButtonProps: Object,
    scrollIntoView: { type: Boolean, default: true },
  },
  components: { ChevronLeft16, ChevronRight16 },
  data() {
    return {
      disabledTabs: [],
      horizontalOverflow: false,
      leftOverflowNavButtonHidden: false,
      rightOverflowNavButtonHidden: false,
      // scrollIntoView,
      // selectionMode,
      selectedId: undefined,
      tabs: [],
    };
  },
  created() {
    // add these on created otherwise cv:mounted is too early.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
    this.$on('cv:selected', srcComponent => this.onCvSelected(srcComponent));
    this.$on('cv:disabled', srcComponent => this.onCvDisabled(srcComponent));
    this.$on('cv:enabled', srcComponent => this.onCvEnabled(srcComponent));
    this.OVERFLOW_BUTTON_OFFSET = 40;
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.$refs.tablist.addEventListener('scroll', this.checkScroll);
    this.checkScroll();
  },
  updated() {
    this.checkScroll();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    this.$refs.tablist.removeEventListener('scroll', this.checkScroll);
  },
  computed: {
    currentTabLabel() {
      const index = this.tabs.findIndex(tab => tab.uid === this.selectedId);

      return index > -1 ? this.tabs[index].label : '';
    },
  },
  methods: {
    checkScroll() {
      if (!this.skipScroll) {
        if (this.$refs.tablist) {
          this.horizontalOverflow = this.$refs.tablist.scrollWidth > this.$refs.tablist.clientWidth;

          if (this.$refs.link && this.$refs.link.length > 0) {
            this.leftOverflowNavButtonHidden = this.$refs.tablist.scrollLeft <= 0;
            this.rightOverflowNavButtonHidden =
              this.$refs.tablist.scrollLeft + this.$refs.tablist.clientWidth >= this.$refs.tablist.scrollWidth;
          }
        }
      }
    },
    handleResize() {
      this.checkScroll();
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
          this.doTabClick(srcComponent.uid);
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
          this.doTabClick(this.tabs[Math.max(tabIndex - 1, 0)].uid);
        }
      }
    },
    doScrollIntoView(index) {
      const tab = this.$refs.link[index];
      const scrollContainer = tab && tab.parentNode ? tab.parentNode.parentNode : null;
      let newScrollLeft;

      if (tab && scrollContainer) {
        const scrollLeft = scrollContainer.scrollLeft;
        const tabLeft = tab.offsetLeft - scrollContainer.offsetLeft;

        if (index === 0) {
          newScrollLeft = 0;
        } else if (index === this.$refs.link.length - 1) {
          newScrollLeft = scrollContainer.scrollWidth - scrollContainer.offsetWidth;
        } else if (tabLeft < scrollLeft) {
          newScrollLeft = tabLeft;
        } else {
          const rightOfTab = tab.offsetLeft - scrollContainer.offsetLeft + tab.offsetWidth;
          if (rightOfTab > scrollContainer.offsetWidth + scrollLeft) {
            newScrollLeft = rightOfTab - scrollContainer.offsetWidth;

            if (!this.rightOverflowNavButtonHidden) {
              newScrollLeft += this.OVERFLOW_BUTTON_OFFSET;
            }
          }
        }
      }

      if (newScrollLeft !== undefined) {
        this.skipScroll = true;
        this.leftOverflowNavButtonHidden = newScrollLeft <= 0;
        this.rightOverflowNavButtonHidden =
          newScrollLeft + this.$refs.tablist.clientWidth >= this.$refs.tablist.scrollWidth;

        this.$nextTick(() => {
          // allow left and right nav hide to propegate before setting scroll
          scrollContainer.scrollLeft = newScrollLeft;
          this.skipScroll = false;
        });
      }
    },
    doTabClick(id, setFocus = false) {
      if (this.disabledTabs.indexOf(id) === -1) {
        if (this.selectedId !== id) {
          let newIndex = -1;

          this.selectedId = id;

          for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].uid === id) {
              this.doScrollIntoView(i, setFocus);
              if (setFocus) {
                this.$nextTick(() => {
                  this.$refs.link[i].focus();
                });
              }

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
    onTabClick(id) {
      this.doTabClick(id);
    },
    onCvSelected(srcComponent) {
      this.doTabClick(srcComponent.uid);
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
          this.doTabClick(id);
        });
      }
    },
    isAllTabsDisabled() {
      return this.disabledTabs.length === this.tabs.length;
    },
    onLeft() {
      if (this.isAllTabsDisabled()) {
        return;
      }

      const curIndex = this.move(this.selectedId, false);
      const newId = this.tabs[curIndex].uid;

      this.doTabClick(newId, true);
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

      const curIndex = this.move(this.selectedId, true);
      const newId = this.tabs[curIndex].uid;

      this.doTabClick(newId, true);
    },
    selected(index) {
      let selItem = this.tabs[index ? index : -1];
      this.selectedId = selItem ? selItem.uid : undefined;

      // const selectedTab = this.tabs.find(tab => tab.id === id);
      // selectedTab.$el.scrollIntoView();
    },
    onOverflowClick(e, { direction, multiplier = 10 }) {
      const { scrollLeft } = this.$refs.tablist;

      // account for overflow button appearing and causing tablist width change
      if (direction === 1 && !scrollLeft) {
        this.$refs.tablist.scrollLeft += this.OVERFLOW_BUTTON_OFFSET;
      }

      this.$refs.tablist.scrollLeft += direction * multiplier;

      if (this.leftEdgeReached(direction)) {
        this.$refs.tablist.scrollLeft = 0;
      }

      // account for reaching left edge
      if (this.leftEdgeReached(direction)) {
        this.$refs.rightOverflow.focus();
      }
      if (this.rightEdgeReached(direction)) {
        this.$refs.leftOverflow.focus();
      }
    },
    onOverflowMouseDown(e, { direction }) {
      // disregard mouse buttons aside from LMB
      if (e.buttons !== 1) {
        return;
      }

      this.overflowNavInterval = setInterval(() => {
        if (this.leftEdgeReached(direction) || this.rightEdgeReached(direction)) {
          clearInterval(this.overflowNavInterval);
        }

        this.onOverflowClick(e, { direction });
      });
    },
    onOverflowMouseUp() {
      clearInterval(this.overflowNavInterval);
    },
    leftEdgeReached(direction) {
      const { scrollLeft } = this.$refs.tablist;

      return direction === -1 && scrollLeft <= this.OVERFLOW_BUTTON_OFFSET;
    },
    rightEdgeReached(direction) {
      const { clientWidth, scrollLeft, scrollWidth } = this.$refs.tablist;
      return direction === 1 && scrollLeft + clientWidth >= scrollWidth;
    },
  },
};
</script>
