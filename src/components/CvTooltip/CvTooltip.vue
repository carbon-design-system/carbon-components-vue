<template>
  <button
    :class="[
      `cv-tooltip`,
      `${carbonPrefix}--tooltip__trigger`,
      `${carbonPrefix}--tooltip--a11y`,
      `${carbonPrefix}--tooltip--${direction}`,
      `${carbonPrefix}--tooltip--align-${alignment}`,
    ]"
    type="button"
  >
    <span :class="`${carbonPrefix}--assistive-text`">
      <slot name="content">
        {{ tip }}
      </slot>
    </span>
    <slot>
      <Information16 />
    </slot>
  </button>
</template>

<script setup>
import Information16 from '@carbon/icons-vue/es/information/16';
import { carbonPrefix } from '../../global/settings';
import { TipAlignments, alignments, TipDirections, directions } from './consts';

defineProps({
  alignment: {
    type: String,
    default: TipAlignments.center,
    validator: val => alignments.includes(val),
  },
  direction: {
    type: String,
    default: TipDirections.top,
    validator: val => directions.includes(val),
  },
  tip: {
    type: String,
    default: '',
  },
});
</script>
