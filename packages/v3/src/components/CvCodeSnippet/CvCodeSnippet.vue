<template>
  <component :is="component" v-bind="$props" @copy="handleCopy"
    ><slot
  /></component>
</template>

<script>
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { codeSnippetKinds } from './consts';
import { includesOrError } from '../../global/component-utils/validators';
import { carbonPrefix } from '../../global/settings';

import CviCodeSnippetInline from './_CviCodeSnippetInline';
import CviCodeSnippetOneline from './_CviCodeSnippetOneline';
import CviCodeSnippetMultiline from './_CviCodeSnippetMultiline';

export default {
  name: 'CvCodeSnippet',
  props: {
    /** Type of code snippet */
    kind: {
      type: String,
      default: codeSnippetKinds[0],
      validator: includesOrError(codeSnippetKinds, 'CvCodeSnippet', 'kind'),
    },
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
  components: {
    CviCodeSnippetInline,
    CviCodeSnippetOneline,
    CviCodeSnippetMultiline,
  },
  emits: [
    /** Emitted when user uses the copy function */
    'copy',
  ],
  setup(props, { emit }) {
    const component = computed(
      () =>
        ({
          inline: CviCodeSnippetInline,
          oneline: CviCodeSnippetOneline,
          multiline: CviCodeSnippetMultiline,
        }[props.kind])
    );

    const { copy } = useClipboard();

    const handleCopy = text => {
      copy(text);
      emit('copy');
    };

    return { component, handleCopy, carbonPrefix };
  },
};
</script>
