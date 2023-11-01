<template>
  <ul
    :class="[
      `${carbonPrefix}--progress`,
      `${carbonPrefix}--skeleton`,
      { [`${carbonPrefix}--progress--vertical`]: vertical },
    ]"
  >
    <li
      v-for="n in 4"
      :key="n"
      :class="[
        `${carbonPrefix}--progress-step`,
        `${carbonPrefix}--progress-step--incomplete`,
      ]"
    >
      <div
        :class="[
          `${carbonPrefix}--progress-step-button`,
          `${carbonPrefix}--progress-step-button--unclickable`,
        ]"
      >
        <CircleDash16 />
        <p :class="[`${carbonPrefix}--progress-label`]" />
        <span :class="[`${carbonPrefix}--progress-line`]" />
      </div>
    </li>
  </ul>
</template>
<script setup>
import { carbonPrefix } from '../../global/settings';
import { CircleDash16 } from '@carbon/icons-vue';

defineProps({
  vertical: { type: Boolean, default: false },
});
</script>
