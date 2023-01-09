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
    type="button"
    role="tab"
    class="cv-content-switcher-button"
    :class="[
      `${carbonPrefix}--content-switcher-btn`,
      {
        [`${carbonPrefix}--content-switcher--selected`]: isSelected,
      },
    ]"
    :data-target="contentSelector"
    :aria-selected="isSelected ? 'true' : 'false'"
    :id="cvId"
    @click="open"
  >
    <CvSvg
      v-if="icon"
      :svg="icon"
      :class="`${carbonPrefix}--content-switcher__icon`"
      height="16"
      width="16"
    />
    <span :class="`${carbonPrefix}--content-switcher__label`">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import CvSvg from '../CvSvg/_CvSvg.vue';
import { computed, onMounted, watch } from 'vue';
import { props as propsCvId, useCvId } from '../../use/cvId';
import store from './cvContentSwitcherStore';

const props = defineProps({
  contentSelector: { type: String, default: undefined },
  icon: {
    type: [String, Object],
    default: undefined,
    validator(val) {
      if (!val || typeof val === 'string') {
        return true;
      }
      return val.render !== null;
    },
  },
  ownerId: { type: String, default: undefined },
  parentSwitcher: { type: String, default: 'global' },
  selected: Boolean,
  ...propsCvId,
});
const cvId = useCvId(props, true);

function toggleContent(on) {
  if (!props.contentSelector) {
    console.error(
      'CvContentSwitcherButton: Either ownerId or content-selector property must not be defined.'
    );
    return;
  }

  // show/hide content
  const content = document.querySelectorAll(props.contentSelector);
  for (const element of content) {
    // element.style.visibility = on;
    if (!on) {
      element.setAttribute('hidden', 'hidden');
    } else {
      element.removeAttribute('hidden');
    }
    element.setAttribute('aria-hidden', `${!on}`);
  }
  if (on) store.setContentSelected(props.parentSwitcher, props.contentSelector);
}

function open() {
  store.setSelected(props.parentSwitcher, cvId.value);
  if (props.ownerId) store.setOwnerContent(props.parentSwitcher, props.ownerId);
  else toggleContent(true);
}
function close() {
  if (!props.ownerId) toggleContent(false);
}
const isSelected = computed(() => {
  return store.getSelected(props.parentSwitcher, cvId.value);
});
watch(isSelected, val => {
  if (val) open();
  else close();
});

// life cycle
onMounted(() => {
  if (props.contentSelector === '' && props.ownerId === '') {
    console.error(
      'CvContentSwitcherButton: ownerId or content-selector properties must not be empty strings.'
    );
  }
  if (props.selected) open();
  else close();
});
</script>

<style lang="scss"></style>
