<!--suppress ES6PreferShortImport -->
<template>
  <div class="cv-tabs" style="width: 100%">
    <div
      data-tabs
      :class="[
        `cv-tab ${carbonPrefix}--tabs--scrollable`,
        {
          [`${carbonPrefix}--tabs--container`]: container,
          [`${carbonPrefix}--tabs--scrollable--container`]: container,
        },
      ]"
      role="navigation"
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
            [`${carbonPrefix}--tab--overflow-nav-button--hidden`]:
              leftOverflowNavButtonHidden,
          },
        ]"
        @click.stop.prevent="e => onOverflowClick(e, { direction: -1 })"
        @mousedown.stop.prevent="e => onOverflowMouseDown(e, { direction: -1 })"
        @mouseup.stop.prevent="onOverflowMouseUp"
        tabIndex="-1"
        type="button"
        ref="elLeftOverflow"
      >
        <ChevronLeft16 />
      </button>
      <div
        v-if="!leftOverflowNavButtonHidden"
        :class="`${carbonPrefix}--tabs__overflow-indicator--left`"
      />

      <ul
        :class="`${carbonPrefix}--tabs--scrollable__nav`"
        role="tablist"
        ref="elTabList"
      >
        <li
          v-for="tab in tabs"
          :key="tab.uid"
          :class="[
            `cv-tabs-button  ${carbonPrefix}--tabs--scrollable__nav-item`,
            {
              [`${carbonPrefix}--tabs__nav-item--selected`]:
                selectedId === tab.uid,
              [`${carbonPrefix}--tabs__nav-item--disabled`]: disabledTabs.has(
                tab.uid
              ),
              // TODO: remove scrollable in next major release
              [`${carbonPrefix}--tabs--scrollable__nav-item--disabled`]:
                disabledTabs.has(tab.uid),
              [`${carbonPrefix}--tabs--scrollable__nav-item--selected`]:
                selectedId === tab.uid,
            },
          ]"
          role="presentation"
        >
          <button
            :class="`${carbonPrefix}--tabs--scrollable__nav-link`"
            role="tab"
            :aria-controls="tab.uid"
            :aria-disabled="disabledTabs.has(tab.uid)"
            :aria-selected="selectedId === tab.uid"
            :id="`${tab.uid}-link`"
            @click="onTabClick(tab.uid)"
            ref="elLink"
            :tabindex="selectedId === tab.uid ? 0 : -1"
            type="button"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div
        v-if="!rightOverflowNavButtonHidden"
        :class="`${carbonPrefix}--tabs__overflow-indicator--right`"
      />
      <button
        aria-hidden="true"
        aria-label="scroll right"
        :class="[
          {
            [`${carbonPrefix}--tab--overflow-nav-button`]: horizontalOverflow,
            [`${carbonPrefix}--tab--overflow-nav-button--hidden`]:
              rightOverflowNavButtonHidden,
          },
        ]"
        @click="e => onOverflowClick(e, { direction: 1 })"
        @mousedown="e => onOverflowMouseDown(e, { direction: 1 })"
        @mouseup="onOverflowMouseUp"
        tabIndex="-1"
        type="button"
        ref="elRightOverflow"
      >
        <ChevronRight16 />
      </button>
    </div>
    <div class="cv-tabs__panels">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { ChevronLeft16, ChevronRight16 } from '@carbon/icons-vue';
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
} from 'vue';

const OVERFLOW_BUTTON_OFFSET = 40;

const props = defineProps({
  /**
   * Changes the look of the tabs themselves. Does NOT change the styles of the tab content.
   */
  container: { type: Boolean, default: false },
  /**
   * @deprecated not used in component
   */
  leftOverflowIconButtonProps: Object,
  /**
   * This is an edge use case. By default, if no tab is explicitly selected, the first non-disabled tab is selected.
   */
  noDefaultToFirst: { type: Boolean, default: false },
  /**
   * @deprecated not used in component
   */
  rightOverflowIconButtonProps: Object,
  /**
   * @deprecated not used in component
   */
  scrollIntoView: { type: Boolean, default: true },
});
const emit = defineEmits(['tab-selected', 'tab-selected-id']);

const selectedId = ref('');
provide('tab-selected', selectedId);
/**
 * @typedef TabData
 * @type {string} uid
 * @type {string} label
 */

/**
 * @type {Ref<UnwrapRef<Array<TabData>>>}
 */
const tabs = ref([]);
provide('tab-data', tabs);
const disabledTabs = ref(new Set());
provide('tab-disabled-ids', disabledTabs);
const horizontalOverflow = ref(false);
const leftOverflowNavButtonHidden = ref(false);
const rightOverflowNavButtonHidden = ref(false);

function maybeSelectFirstTab() {
  // Maybe user does not want something selected by default? Seems like this is an odd use case.
  if (props.noDefaultToFirst) return;

  // is something selected?
  if (tabs.value.find(tab => tab.uid === selectedId.value)) return;

  // Find the first not-disabled tab
  const index = tabs.value?.findIndex(
    tabData => !disabledTabs.value?.has(tabData.uid)
  );

  // if there is a non-disabled tab set that one as selected
  if (index > -1) selectedId.value = tabs.value[index].uid;
}
onMounted(maybeSelectFirstTab);
watch(tabs, maybeSelectFirstTab);
watch(selectedId, () => {
  nextTick(() => {
    doTabClick(selectedId.value);
  });
});
const elTabList = ref(null);
onMounted(() => {
  window.addEventListener('resize', handleResize);
  elTabList.value?.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUpdated(() => {
  checkScroll();
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  elTabList.value?.removeEventListener('scroll', checkScroll);
});

const skipScroll = ref(false);
const elLink = ref(null);
function checkScroll() {
  if (!skipScroll.value) {
    if (elTabList.value) {
      horizontalOverflow.value =
        elTabList.value?.scrollWidth > elTabList.value?.clientWidth;

      if (elLink.value && elLink.value.length > 0) {
        leftOverflowNavButtonHidden.value = elTabList.value?.scrollLeft <= 0;
        rightOverflowNavButtonHidden.value =
          elTabList.value?.scrollLeft + elTabList.value?.clientWidth >=
          elTabList.value?.scrollWidth;
      }
    }
  }
}
function handleResize() {
  checkScroll();
}

function doScrollIntoView(index) {
  const tab = elLink.value[index];
  /**
   * HTMLElement
   * @type {HTMLElement|null}
   */
  const scrollContainer =
    tab && tab.parentNode ? tab.parentNode.parentNode : null;
  let newScrollLeft;

  if (tab && scrollContainer) {
    const scrollLeft = scrollContainer.scrollLeft;
    const tabLeft = tab.offsetLeft - scrollContainer.offsetLeft;

    if (index === 0) {
      newScrollLeft = 0;
    } else if (index === elLink.value.length - 1) {
      newScrollLeft = scrollContainer.scrollWidth - scrollContainer.offsetWidth;
    } else if (tabLeft < scrollLeft) {
      newScrollLeft = tabLeft;
    } else {
      const rightOfTab =
        tab.offsetLeft - scrollContainer.offsetLeft + tab.offsetWidth;
      if (rightOfTab > scrollContainer.offsetWidth + scrollLeft) {
        newScrollLeft = rightOfTab - scrollContainer.offsetWidth;

        if (!rightOverflowNavButtonHidden.value) {
          newScrollLeft += OVERFLOW_BUTTON_OFFSET;
        }
      }
    }
  }

  if (newScrollLeft !== undefined) {
    skipScroll.value = true;
    leftOverflowNavButtonHidden.value = newScrollLeft <= 0;
    rightOverflowNavButtonHidden.value =
      newScrollLeft + elTabList.value?.clientWidth >=
      elTabList.value?.scrollWidth;

    nextTick(() => {
      // allow left and right nav hide to propagate before setting scroll
      scrollContainer.scrollLeft = newScrollLeft;
      skipScroll.value = false;
    });
  }
}
function doTabClick(id, setFocus = false) {
  if (!disabledTabs.value.has(id)) {
    if (selectedId.value !== id) {
      let newIndex = -1;

      selectedId.value = id;

      for (let i = 0; i < tabs.value.length; i++) {
        if (tabs.value[i].uid === id) {
          doScrollIntoView(i, setFocus);
          if (setFocus) {
            nextTick(() => {
              elLink.value[i].focus();
            });
          }
          newIndex = i;
        }
      }

      emit('tab-selected', newIndex);
      emit('tab-selected-id', tabs.value[newIndex].uid);
    }
  }
}
function onTabClick(id) {
  doTabClick(id);
}
function isAllTabsDisabled() {
  return disabledTabs.value.size === tabs.value.length;
}
function onLeft() {
  if (isAllTabsDisabled()) {
    return;
  }

  const curIndex = move(selectedId.value, false);
  const newId = tabs.value[curIndex].uid;

  doTabClick(newId, true);
}
function move(id, next) {
  let newIndex;
  let newId;

  newIndex = tabs.value.findIndex(tab => tab.uid === id);

  if (newIndex > -1) {
    newIndex = next ? newIndex + 1 : newIndex - 1;
  }
  if (newIndex < 0 || newIndex >= tabs.value.length) {
    newIndex = next ? 0 : tabs.value.length - 1;
  }

  newId = tabs.value[newIndex].uid;
  while (newId === selectedId.value || disabledTabs.value.has(newId)) {
    if (newIndex > -1) {
      newIndex = next ? newIndex + 1 : newIndex - 1;
    }
    if (newIndex < 0 || newIndex >= tabs.value.length) {
      newIndex = next ? 0 : tabs.value.length - 1;
    }
    newId = tabs.value[newIndex].uid;
  }

  return newIndex;
}
function onRight() {
  if (isAllTabsDisabled()) {
    return;
  }

  const curIndex = move(selectedId.value, true);
  const newId = tabs.value[curIndex].uid;

  doTabClick(newId, true);
}
const elRightOverflow = ref(null);
const elLeftOverflow = ref(null);
function onOverflowClick(e, { direction, multiplier = 10 }) {
  const scrollLeft = elTabList.value?.scrollLeft;

  // account for overflow button appearing and causing tablist width change
  if (elTabList.value && direction === 1 && !scrollLeft) {
    elTabList.value.scrollLeft += OVERFLOW_BUTTON_OFFSET;
  }

  if (elTabList.value) elTabList.value.scrollLeft += direction * multiplier;

  if (elTabList.value && leftEdgeReached(direction)) {
    elTabList.value.scrollLeft = 0;
  }

  // account for reaching left edge
  if (leftEdgeReached(direction)) {
    elRightOverflow.value?.focus();
  }
  if (rightEdgeReached(direction)) {
    elLeftOverflow.value?.focus();
  }
}
let overflowNavInterval;
function onOverflowMouseDown(e, { direction }) {
  // disregard mouse buttons aside from LMB
  if (e.buttons !== 1) {
    return;
  }

  if (overflowNavInterval) clearInterval(overflowNavInterval);
  overflowNavInterval = setInterval(() => {
    if (leftEdgeReached(direction) || rightEdgeReached(direction)) {
      clearInterval(overflowNavInterval);
    }

    onOverflowClick(e, { direction });
  });
}
function onOverflowMouseUp() {
  clearInterval(overflowNavInterval);
}
function leftEdgeReached(direction) {
  const scrollLeft = elTabList.value?.scrollLeft || Number.MIN_VALUE;

  return direction === -1 && scrollLeft <= OVERFLOW_BUTTON_OFFSET;
}
function rightEdgeReached(direction) {
  if (!elTabList.value) return false;
  const { clientWidth, scrollLeft, scrollWidth } = elTabList.value;
  return direction === 1 && scrollLeft + clientWidth >= scrollWidth;
}
</script>
