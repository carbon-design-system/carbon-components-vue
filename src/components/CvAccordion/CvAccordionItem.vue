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
      :disabled="disabled"
      ref="button"
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
import { onMounted, onBeforeUnmount, inject, ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { ChevronRight16 } from '@carbon/icons-vue/';

const { id } = propsCvId;

export default {
  name: 'CvAccordionItem',
  components: { ChevronRight16 },
  props: {
    /**
     * disables this accodion item
     */
    disabled: Boolean,
    /**
     * id for element, optional uses cvId if not set
     */
    id,
    /**
     * initial open state of the accordion item
     */
    open: Boolean,
  },
  setup(props) {
    // Accordion methods
    const registerItem = inject('registerItem');
    const deregisterItem = inject('deregisterItem');
    const onAccItemChagne = inject('onAccItemChagne');

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

    return { animation, carbonPrefix, cvId, onClick, onAnimationEnd, isOpen };
  },
};
</script>

<style lang="scss"></style>
