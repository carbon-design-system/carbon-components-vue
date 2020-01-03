<template>
  <cv-wrapper :tag-type="overlay ? 'div' : ''" class="cv-loading" :class="overlayClasses">
    <div
      data-loading
      :class="{
        'cv-loading': !overlay,
        'bx--loading': active || stopping,
        'bx--loading--stop': !active && stopping,
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
      const classes = [];
      if (this.overlay) {
        if (this.active || this.stopping) {
          classes.push('bx--loading-overlay');
        } else {
          classes.push('bx--loading-overlay--stop');
        }
      }

      return classes;
    },
    loadingRadius() {
      return this.small ? '26.8125' : '37.5';
    },
  },
  data() {
    return {
      stopping: false,
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

        this.stopping = false;
        this.$emit('loading-end');
      }
    },
    onActiveUpdate(newValue) {
      this.stopping = !newValue;
      if (!newValue) {
        this.$refs.loading.addEventListener('animationend', this.onEnd);
      }
    },
  },
};
</script>
