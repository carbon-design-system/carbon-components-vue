<template>
  <div class="cv-slider bx--form-item">
    <label class="bx--label bx--skeleton"></label>
    <div class="bx--slider-container bx--skeleton">
      <span class="bx--slider__range-label"></span>
      <div class="bx--slider">
        <div class="bx--slider__track"></div>
        <div class="bx--slider__filled-track"></div>
        <div class="bx--slider__thumb"></div>
      </div>
      <span class="bx--slider__range-label"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvSliderSkeleton',
};
</script>
