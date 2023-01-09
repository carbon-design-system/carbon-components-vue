<template>
  <div
    :class="[
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--snippet--multi`,
      {
        [`${carbonPrefix}--snippet--no-copy`]: hideCopyButton,
        [`${carbonPrefix}--snippet--disabled`]: disabled,
        [`${carbonPrefix}--snippet--light`]: light,
        [`${carbonPrefix}--snippet--expand`]: isExpanded,
        [`${carbonPrefix}--snippet--wraptext`]: wrapText,
      },
    ]"
  >
    <div
      :class="`${carbonPrefix}--snippet-container`"
      :aria-label="ariaLabel || 'code-snippet'"
      :style="styles"
    >
      <pre ref="text"><code><slot /></code></pre>
    </div>
    <div
      v-if="hasOverflowLeft"
      :class="`${carbonPrefix}--snippet__overflow-indicator--left`"
    ></div>
    <div
      v-if="hasOverflowRight"
      :class="`${carbonPrefix}--snippet__overflow-indicator--right`"
    ></div>
    <cv-copy-button
      v-if="!hideCopyButton"
      :feedback="copyFeedback"
      :feedback-timeout="copyFeedbackTimeout"
      :icon-description="ariaLabel"
      @copy="handleCopy"
      :disabled="disabled"
    />
    <cv-button
      v-if="showMoreLessButton"
      kind="ghost"
      :class="`${carbonPrefix}--snippet-btn--expand`"
      :disabled="disabled"
      @click="isExpanded = !isExpanded"
    >
      <span :class="`${carbonPrefix}--snippet-btn--text`">{{
        isExpanded ? lessText : moreText
      }}</span>
      <chevron-down16
        :class="[
          `${carbonPrefix}--icon-chevron--down`,
          `${carbonPrefix}--snippet__icon`,
        ]"
      />
    </cv-button>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { carbonPrefix } from '../../global/settings';
import { useElementHasOverflow } from '../../use/overflow';
import CvCopyButton from '../CvCopyButton/CvCopyButton.vue';
import CvButton from '../CvButton';
import { ChevronDown16 } from '@carbon/icons-vue';

const ROW_HEIGHT_IN_PX = 16;

export default {
  props: {
    /** Text shown to user when copying code */
    copyFeedback: {
      type: String,
      default: 'Copied!',
    },
    /** How long should the copy feedback text be shown? */
    copyFeedbackTimeout: {
      type: Number,
      default: 2000,
    },
    /** Should the copy button be hidden? */
    hideCopyButton: {
      type: Boolean,
      default: false,
    },
    /** Should the code wrap if it's too long? */
    wrapText: {
      type: Boolean,
      default: false,
    },
    /** Disable copying */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** A11y label */
    ariaLabel: {
      type: String,
      default: '',
    },
    /** Use the light variant */
    light: {
      type: Boolean,
      default: false,
    },
    /** (if multiline) text for collapsing button */
    lessText: {
      type: String,
      default: 'Show less',
    },
    /** (if multiline) text for expanding button */
    moreText: {
      type: String,
      default: 'Show more',
    },
    /** (if multiline) max amount of rows shown in collapsed view (0 to disable) */
    maxCollapsedNumberOfRows: {
      type: Number,
      default: 15,
    },
    /** (if multiline) max amount of rows shown in expanded view (0 to disable) */
    maxExpandedNumberOfRows: {
      type: Number,
      default: 0,
    },
    /** (if multiline) min amount of rows shown in collapsed view (0 to disable) */
    minCollapsedNumberOfRows: {
      type: Number,
      default: 3,
    },
    /** (if multiline) min amount of rows shown in expanded view (0 to disable) */
    minExpandedNumberOfRows: {
      type: Number,
      default: 16,
    },
  },
  emits: ['copy'],
  components: {
    CvCopyButton,
    CvButton,
    ChevronDown16,
  },
  setup: (props, { emit }) => {
    const {
      minCollapsedNumberOfRows: minCollapsed,
      maxCollapsedNumberOfRows: maxCollapsed,
      minExpandedNumberOfRows: minExpanded,
      maxExpandedNumberOfRows: maxExpanded,
    } = toRefs(props);

    const showMoreLessButton = ref(false);
    const isExpanded = ref(false);
    const text = ref(null);

    const { hasOverflowLeft, hasOverflowRight } = useElementHasOverflow(text);

    const handleCopy = () => emit('copy', text.value?.innerText);

    const styles = computed(() => {
      const [min, max] = isExpanded.value
        ? [minExpanded.value, maxExpanded.value]
        : [minCollapsed.value, maxCollapsed.value];

      return {
        minHeight: min > 0 ? `${min * ROW_HEIGHT_IN_PX}px` : undefined,
        maxHeight: max > 0 ? `${max * ROW_HEIGHT_IN_PX}px` : undefined,
      };
    });

    useResizeObserver(text, ([entries]) => {
      const { height } = entries.contentRect;

      showMoreLessButton.value =
        maxCollapsed.value > 0 &&
        (maxExpanded.value === 0 || maxExpanded.value > maxCollapsed.value) &&
        height > maxCollapsed.value * ROW_HEIGHT_IN_PX;

      if (
        isExpanded.value &&
        minExpanded.value > 0 &&
        height <= minExpanded.value * ROW_HEIGHT_IN_PX
      ) {
        isExpanded.value = false;
      }
    });

    return {
      carbonPrefix,
      handleCopy,
      hasOverflowLeft,
      hasOverflowRight,
      isExpanded,
      showMoreLessButton,
      styles,
      text,
    };
  },
};
</script>
