<template>
  <cv-wrapper :tag-type="overlay ? 'div' : ''" class="cv-loading" :class="overlayClasses">
    <div
      data-loading
      class="bx--loading"
      :class="{
        'cv-loading': !overlay,
        'bx--loading--stop': !active,
        'bx--loading--small': small,
      }"
      ref="loading"
    >
      <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
        <title>Loading</title>
        <circle v-if="small" class="bx--loading__background" cx="0" cy="0" :r="loadingRadius" />
        <circle class="bx--loading__stroke" cx="0" cy="0" :r="loadingRadius" />
      </svg>
    </div>
  </cv-wrapper>
</template>

<script>
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvLoading',
  components: { CvWrapper },
  props: {
    active: { type: Boolean, default: true },
    overlay: Boolean,
    small: Boolean,
  },
  computed: {
    overlayClasses() {
      if (!this.overlay) return '';

      return `bx--loading-overlay ${this.stopped ? 'bx--loading-overlay--stop' : ''}`;
    },
    loadingRadius() {
      return this.small ? '26.8125' : '37.5';
    },
  },
  data() {
    return {
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
