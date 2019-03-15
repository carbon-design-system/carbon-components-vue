<template>
  <div class="cv-loading" :class="overlayClasses">
    <div
      data-loading
      class="bx--loading"
      :class="{
        'bx--loading--stop': !active,
        'bx--loading--small': small,
      }"
      ref="loading"
    >
      <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
        <title>Loading</title>
        <circle
          v-if="componentsX && small"
          class="bx--loading__background"
          cx="0"
          cy="0"
          r="37.5"
        ></circle>
        <circle
          :class="{
            'bx--loading__stroke': componentsX,
          }"
          cx="0"
          cy="0"
          r="37.5"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<script>
import { componentsX } from '../../_internal/_feature-flags';

export default {
  name: 'CvLoading',
  props: {
    active: { type: Boolean, default: true },
    overlay: Boolean,
    small: Boolean,
  },
  computed: {
    overlayClasses() {
      if (!this.overlay) return '';

      return `bx--loading-overlay ${
        this.stopped ? 'bx--loading-overlay--stop' : ''
      }`;
    },
  },
  data() {
    return {
      componentsX,
      stopped: false,
    };
  },
  watch: {
    active(val) {
      this.onActiveUpdate(val);
    },
  },
  methods: {
    onEnd(ev) {
      if (ev.animationName === 'rotate-end-p2') {
        this.$refs.loading.removeEventListener('animationend', this.onEnd);

        this.stopped = true;
        this.$emit('loading-end');
      }
    },
    onActiveUpdate(newValue) {
      if (newValue) {
        this.stopped = false;
      } else {
        this.$refs.loading.addEventListener('animationend', this.onEnd);
      }
    },
  },
};
</script>

<style lang="scss"></style>
