<template>
  <div :class="`cv-toggle ${carbonPrefix}--form-item`" :id="uid">
    <label
      :class="`${carbonPrefix}--toggle__label ${carbonPrefix}--skeleton`"
      :for="uid"
      :aria-label="label ? 'Toggle is loading' : label"
    >
      <span :class="`${carbonPrefix}--toggle__label-text`" />
      <span :class="`${carbonPrefix}--toggle__text--left`" />
      <span :class="`${carbonPrefix}--toggle__appearance`" />
      <span :class="`${carbonPrefix}--toggle__text--right`" />
    </label>
  </div>
</template>

<script>
import { uidMixin, carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvToggleSkeleton',
  mixins: [uidMixin, carbonPrefixMixin],
  props: {
    label: { type: String, default: 'Toggle is loading' },
  },
};
</script>
