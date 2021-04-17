<template>
  <span v-if="hideCopyButton" :class="classes">
    <code ref="text"><slot /></code>
  </span>
  <cvi-copy-button
    v-else
    :class="classes"
    @copy="handleCopy"
    :feedback="copyFeedback"
    :feedback-timeout="copyFeedbackTimeout"
    :aria-describedby="codeId"
  >
    <code :id="codeId" ref="text"><slot /></code>
  </cvi-copy-button>
</template>

<script>
import { computed, ref } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { useCvId } from '../../use';
import CviCopyButton from '../CvCopyButton/_CviCopyButton';

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
    /** Use the light variant */
    light: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['copy'],
  components: { CviCopyButton },
  setup(props, { emit }) {
    const codeId = useCvId();
    const classes = computed(() => [
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--snippet--inline`,
      {
        [`${carbonPrefix}--snippet--no-copy`]: props.hideCopyButton,
        [`${carbonPrefix}--snippet--light`]: props.light,
      },
    ]);

    const text = ref(null);

    const handleCopy = () => emit('copy', text.value?.innerText);

    return {
      carbonPrefix,
      codeId,
      text,
      classes,
      handleCopy,
    };
  },
};
</script>
