<template>
  <div
    data-inline-loading
    class="bx--inline-loading"
    role="alert"
    aria-live="assertive"
  >
    <div class="bx--inline-loading__animation">
      <cv-loading :hidden="!active" small />
      <svg
        :hidden="active"
        data-inline-loading-finished
        class="bx--inline-loading__checkmark-container bx--inline-loading__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
      >
        <polyline
          class="bx--inline-loading__checkmark"
          points="0.74 3.4 3.67 6.34 9.24 0.74"
        ></polyline>
      </svg>
    </div>
    <p
      data-inline-loading-text-active="active"
      data-inline-loading-text-finished="!active"
      class="bx--inline-loading__text"
    >
      {{ active ? loadingText : loadedText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CvInlineLoader',
  props: {
    active: Boolean,
    loadingText: { type: String, default: 'Loading data...' },
    loadedText: { type: String, default: 'Data loaded.' },
  },
};
</script>
