<template>
  <footer :class="`cv-side-nav-footer ${carbonPrefix}--side-nav__footer`">
    <button
      :class="`${carbonPrefix}--side-nav__toggle`"
      type="button"
      v-bind="$attrs"
      :title="assistiveText"
      @click="$emit('toggle-expand')"
    >
      <div :class="`${carbonPrefix}--side-nav__icon`">
        <close20
          v-if="expanded"
          :class="`${carbonPrefix}--side-nav__icon--collapse ${carbonPrefix}--side-nave-collapse-icon`"
        />
        <chevron-right20
          v-if="!expanded"
          :class="`${carbonPrefix}--side-nav__icon--expand ${carbonPrefix}--side-nave-expand-icon`"
        />
      </div>
      <span :class="`${carbonPrefix}--assistive-text`">{{
        assistiveText
      }}</span>
    </button>
  </footer>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import Close20 from '@carbon/icons-vue/es/close/20';
import ChevronRight20 from '@carbon/icons-vue/es/chevron--right/20';

defineProps({
  assistiveText: { type: String, default: 'Open / close side nav' },
  expanded: Boolean,
});
defineEmits(['toggle-expand']);
</script>
