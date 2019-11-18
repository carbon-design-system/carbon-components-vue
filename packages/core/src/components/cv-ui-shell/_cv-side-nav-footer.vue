<template>
  <footer class="cv-side-nav-footer bx--side-nav__footer">
    <button
      class="bx--side-nav__toggle"
      type="button"
      v-bind="$attrs"
      @click="$emit('toggle-expand')"
      :title="assistiveText"
    >
      <div class="bx--side-nav__icon">
        <Close20 v-if="expanded" class="bx--side-nav__icon--collapse bx--side-nave-collapse-icon" />
        <ChevronRight20 v-if="!expanded" class="bx--side-nav__icon--expand bx--side-nave-expand-icon" />
      </div>
      <span class="bx--assistive-text">{{ assistiveText }}</span>
    </button>
  </footer>
</template>

<script>
import Close20 from '@carbon/icons-vue/es/close/20';
import ChevronRight20 from '@carbon/icons-vue/es/chevron--right/20';

export default {
  name: 'CvSideNavFooter',
  inheritAttrs: false,
  components: { ChevronRight20, Close20 },
  props: {
    assistiveText: { type: String, default: 'Open / close side nav' },
    expanded: Boolean,
  },
};
</script>
