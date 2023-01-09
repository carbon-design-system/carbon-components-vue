<template>
  <div
    :class="[
      `${carbonPrefix}--snippet`,
      `${carbonPrefix}--skeleton`,
      {
        [`${carbonPrefix}--snippet--single`]: kind === 'oneline',
        [`${carbonPrefix}--snippet--multi`]: kind === 'multiline',
        [`${carbonPrefix}--snippet--light`]: light,
      },
    ]"
  >
    <div :class="`${carbonPrefix}--snippet-container`">
      <span />
      <span v-if="kind === 'multiline'" />
      <span v-if="kind === 'multiline'" />
    </div>
  </div>
</template>

<script>
import { carbonPrefix } from '../../global/settings';
import { includesOrError } from '../../global/component-utils/validators';
import CvCodeSnippetConsts from './consts';
export default {
  props: {
    kind: {
      type: String,
      default: CvCodeSnippetConsts.codeSnippetKinds[0],
      validator: includesOrError(
        CvCodeSnippetConsts.codeSnippetKinds.slice(0, 2),
        'CvCodeSnippetSkeleton',
        'kind'
      ),
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  setup: () => ({ carbonPrefix }),
};
</script>
