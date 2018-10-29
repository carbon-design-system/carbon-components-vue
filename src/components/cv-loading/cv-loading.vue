<template>
  <div :class="overlayClasses">
    <div data-loading
      class="bx--loading"
      :class="{
        'bx--loading--stop': !active,
        'bx--loading--small': small,
      }"
      ref="loading"
      >
      <svg
        class="bx--loading__svg"
        viewBox="-75 -75 150 150">
        <title>Loading</title>
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvLoading',
  props: {
    overlay: Boolean,
    small: Boolean,
  },
  computed: {
    overlayClasses() {
      if (!this.overlay) return '';

      return `bx--loading-overlay ${
        this.stopped ? 'bx--loading-overlay--stopped' : ''
      }`;
    },
  },
  data() {
    return {
      active: true,
      stopped: false,
    };
  },
  methods: {
    end() {
      const onEnd = ev => {
        if (ev.animationName === 'rotate-end-p2') {
          this.$refs.loading.removeEventListener('animationend', onEnd);

          this.stopped = true;
          this.$emit('loading-end');
        }
      };

      this.$refs.loading.addEventListener('animationend', onEnd);
      this.active = false;
    },
    isActive() {
      return this.active;
    },
    set(value) {
      const newValue = value !== false;

      if (newValue !== this.active) {
        if (newValue) {
          this.stopped = false;
        } else {
          this.end();
        }
      }
      this.active = newValue;
    },
    toggle() {
      this.set(!this.active);
    },
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/components/loading/loading';
</style>
