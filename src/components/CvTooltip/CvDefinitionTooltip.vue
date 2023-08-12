<template>
  <div
    :class="`cv-definition-tooltip ${carbonPrefix}--tooltip--definition ${carbonPrefix}--tooltip--a11y`"
    :id="cvId"
  >
    <button
      :aria-describedby="`${cvId}-label`"
      :class="[
        `${carbonPrefix}--tooltip__trigger`,
        `${carbonPrefix}--tooltip--a11y`,
        `${carbonPrefix}--tooltip__trigger--definition`,
        `${carbonPrefix}--tooltip--${direction}`,
        `${carbonPrefix}--tooltip--align-${alignment}`,
      ]"
      type="button"
    >
      <slot name="term">
        {{ term }}
      </slot>
    </button>
    <div
      :class="`${carbonPrefix}--assistive-text`"
      :id="`${cvId}-label`"
      role="tooltip"
    >
      <slot name="definition">
        {{ definition }}
      </slot>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { TipAlignments, alignments, TipDirections, directions } from './consts';

const props = defineProps({
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
  definition: {
    type: String,
    default: '',
  },
  term: {
    type: String,
    default: '',
  },
  ...propsCvId,
});

const cvId = useCvId(props);
</script>
