<template>
  <div :class="`cv-slider ${carbonPrefix}--form-item`">
    <label :class="`${carbonPrefix}--label ${carbonPrefix}--skeleton`"></label>
    <div :class="`${carbonPrefix}--slider-container ${carbonPrefix}--skeleton`">
      <span :class="`${carbonPrefix}--slider__range-label`"></span>
      <div :class="`${carbonPrefix}--slider`">
        <div :class="`${carbonPrefix}--slider__track`"></div>
        <div :class="`${carbonPrefix}--slider__filled-track`"></div>
        <div :class="`${carbonPrefix}--slider__thumb`"></div>
      </div>
      <span :class="`${carbonPrefix}--slider__range-label`"></span>
    </div>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvSliderSkeleton',
  mixins: [carbonPrefixMixin],
};
</script>
