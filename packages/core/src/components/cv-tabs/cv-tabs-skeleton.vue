<template>
  <div class="cv-tabs bx--tabs bx--skeleton">
    <div class="bx--tabs-trigger">
      <div class="bx--tabs-trigger-text">&nbsp;</div>
      <svg width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
        <path d="M10 0L5 5 0 0z" />
      </svg>
    </div>
    <ul class="bx--tabs__nav bx--tabs__nav--hidden">
      <li class="cv-tab bx--tabs__nav-item bx--tabs__nav-item--selected">
        <div class="bx--tabs__nav-link">&nbsp;</div>
      </li>
      <li class="cv-tab bx--tabs__nav-item">
        <div class="bx--tabs__nav-link">&nbsp;</div>
      </li>
      <li class="cv-tab bx--tabs__nav-item">
        <div class="bx--tabs__nav-link">&nbsp;</div>
      </li>
      <li class="cv-tab bx--tabs__nav-item">
        <div class="bx--tabs__nav-link">&nbsp;</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CvTabsSkeleton',
};
</script>
