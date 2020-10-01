<template>
  <button class="timer-button" @click="onClick">
    {{ buttonLabel }}
  </button>
</template>

<script>
export default {
  name: 'TimerButton',
  props: {
    activeLabelPrefix: String,
    label: String,
    duration: { type: Number, default: 5 },
  },
  data() {
    return {
      active: false,
      countDown: 0,
    };
  },
  computed: {
    buttonLabel() {
      if (this.active) {
        return `${this.activeLabelPrefix}: ${this.countDown}s`;
      } else {
        return this.label;
      }
    },
  },
  methods: {
    onClick() {
      if (!this.active) {
        this.$emit('timer-start');
      }
      this.active = true;
      this.countDown = this.duration;
      this.runCountDown();
    },
    runCountDown() {
      setTimeout(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          this.active = false;
          this.$emit('timer-end');
        } else {
          this.runCountDown();
        }
      }, 1000);
    },
  },
};
</script>
