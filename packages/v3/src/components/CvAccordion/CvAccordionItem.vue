<template>
  <li
    data-accordion-item
    class="cv-accordion-item"
    :class="[
      `${carbonPrefix}--accordion__item`,

      {
        [`${carbonPrefix}--accordion__item--disabled`]: disabled,
        [`${carbonPrefix}--accordion__item--active`]: isOpen,
        [`${carbonPrefix}--accordion__item--${this.animation}`]: animation,
      },
    ]"
    @animationend="onAnimationEnd"
  >
    <button
      :disabled="disabled"
      ref="button"
      type="button"
      :class="`${carbonPrefix}--accordion__heading`"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="cvId"
      @click.prevent.stop="handleClick"
    >
      <ChevronRight16 :class="`${carbonPrefix}--accordion__arrow`" />
      <p :class="`${carbonPrefix}--accordion__title`">
        <slot name="title"></slot>
      </p>
    </button>
    <div :id="cvId" :class="`${carbonPrefix}--accordion__content`">
      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
import { onMounted, onBeforeUnmount, inject, ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId } from '../../use/cvId';
import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16';

export default {
  name: 'CvAccordionItem',
  components: { ChevronRight16 },
  props: {
    /**
     * disables this accodion item
     */
    disabled: Boolean,
    /**
     * initial open state of the accordion item
     */
    open: Boolean,
  },
  setup(props) {
    const cvId = useCvId(props);
    const isOpen = ref(false);
    const reg = inject('registerItem');
    const dereg = inject('deregisterItem');
    const onAccItemClick = inject('onAccItemClick');

    const toggleOpen = force => {
      isOpen.value = typeof force !== 'undefined' ? force : !isOpen.value;
    };

    const handleClick = () => {
      const newOpen = !isOpen.value;
      toggleOpen(newOpen);
      onAccItemClick(cvId, newOpen);
    };

    onMounted(() => {
      reg(cvId, { open: isOpen, toggleOpen });
    });

    onBeforeUnmount(() => {
      dereg(cvId);
    });

    return { carbonPrefix, cvId, handleClick, isOpen };
  },
};
</script>

<style lang="scss"></style>
