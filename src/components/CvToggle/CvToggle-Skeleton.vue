<template>
  <div :class="`cv-toggle ${carbonPrefix}--form-item`" :aria-label="label">
    <input
      :id="cvId"
      type="checkbox"
      :class="[
        `${carbonPrefix}--toggle ${carbonPrefix}--skeleton`,
        {
          [`${carbonPrefix}--toggle-input--small`]: small,
        },
      ]"
    />
    <label :class="`${carbonPrefix}--toggle-input__label`" :for="cvId">
      <div></div>
      <span :class="`${carbonPrefix}--toggle__switch`">
        <span :class="`${carbonPrefix}--toggle__text--left`" />
        <span :class="`${carbonPrefix}--toggle__appearance`" />
        <span :class="`${carbonPrefix}--toggle__text--right`" />
      </span>
    </label>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';

const props = defineProps({
  /**
   * Label and aria-label for the toggle
   */
  label: {
    type: String,
    default: 'Toggle is loading',
  },
  /**
   * Specify the size of the Toggle. Default is medium. Set to `true` for small.
   */
  small: { type: Boolean, default: false },
  ...propsCvId,
});

const cvId = useCvId(props, true);
</script>
