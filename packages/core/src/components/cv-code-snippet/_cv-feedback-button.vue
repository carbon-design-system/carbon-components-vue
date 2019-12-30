<template>
  <button
    type="button"
    class="cv-feedback-button"
    v-bind="$attrs"
    data-copy-btn
    :class="buttonClasses"
    @click="onClick"
  >
    <slot></slot>
    <div
      class="bx--btn--copy__feedback"
      :class="{ 'bx--btn--copy__feedback--displayed': showFeedback }"
      :data-feedback="feedback"
    ></div>
  </button>
</template>

<script>
export default {
  name: 'cvFeedbackButton',
  inheritAttrs: false,
  props: {
    feedback: { type: String, required: true },
    inline: Boolean,
    timeout: { type: Number, default: 2000 },
  },
  computed: {
    buttonClasses() {
      return this.inline ? 'bx--snippet bx--snippet--inline bx--btn--copy' : 'bx--snippet-button';
    },
  },
  data() {
    return {
      showFeedback: false,
    };
  },
  methods: {
    onClick() {
      this.$emit('click');
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
      }, this.timeout);
    },
  },
};
</script>
