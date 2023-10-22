<template>
  <li
    data-accordion-item
    class="cv-accordion-item"
    :class="[
      `${carbonPrefix}--accordion__item`,

      {
        [`${carbonPrefix}--accordion__item--disabled`]: disabled,
        [`${carbonPrefix}--accordion__item--active`]: isOpen,
        [`${carbonPrefix}--accordion__item--${animation}`]: animation,
      },
    ]"
    @animationend="onAnimationEnd"
  >
    <button
      ref="button"
      :disabled="disabled"
      type="button"
      :class="`${carbonPrefix}--accordion__heading`"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="cvId"
      @click.prevent.stop="onClick"
    >
      <ChevronRight16 :class="`${carbonPrefix}--accordion__arrow`" />

      <p :class="`${carbonPrefix}--accordion__title`">
        <!-- @slot title of the accordion item -->

        <slot name="title"></slot>
      </p>
    </button>

    <div :id="cvId" :class="`${carbonPrefix}--accordion__content`">
      <!-- @slot content of accordion item -->

      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'CvAccordion',
};
</script>

<script setup>
import { onMounted, onBeforeUnmount, inject, ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { ChevronRight16 } from '@carbon/icons-vue/';

const props = defineProps({
  /**
   * disables this accodion item
   */
  disabled: Boolean,
  /**
   * initial open state of the accordion item
   */
  open: Boolean,
  ...propsCvId,
});

// Accordion methods
const registerItem = inject('registerItem', () => {});
const deregisterItem = inject('deregisterItem', () => {});
const onAccItemChagne = inject('onAccItemChange', () => {});

// Accordion item methods
const cvId = useCvId(props);
const isOpen = ref(props.open);
const animation = ref('');

const toggleOpen = force => {
  const newValue = typeof force !== 'undefined' ? force : !isOpen.value;

  animation.value = newValue ? 'expanding' : 'collapsing';
  isOpen.value = newValue;
  onAccItemChagne(cvId.value, newValue);
};

const onClick = () => {
  toggleOpen(!isOpen.value);
};

const onAnimationEnd = () => {
  animation.value = '';
};

onMounted(() => {
  registerItem(cvId.value, { open: isOpen.value, toggleOpen });
});

onBeforeUnmount(() => {
  deregisterItem(cvId.value);
});
</script>

<style lang="scss"></style>
