<template>
  <div :class="`cv-toggle ${carbonPrefix}--form-item`" :id="cvId">
    <label
      :class="`${carbonPrefix}--toggle__label ${carbonPrefix}--skeleton`"
      :for="cvId"
      :aria-label="label ? 'Toggle is loading' : label"
    >
      <span :class="`${carbonPrefix}--toggle__label-text`" />
      <span :class="`${carbonPrefix}--toggle__text--left`" />
      <span :class="`${carbonPrefix}--toggle__appearance`" />
      <span :class="`${carbonPrefix}--toggle__text--right`" />
    </label>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  label: {
    type: String,
    default: 'Toggle is loading',
    ...propsCvId,
  },
});

const cvId = useCvId(props);
</script>
