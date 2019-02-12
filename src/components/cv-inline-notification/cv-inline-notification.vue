<template>
  <div
    data-inline-notification
    class="cv-inline-notification bx--inline-notification"
    :class="`bx--inline-notification--${kind.toLowerCase()}`"
    v-on="$listeners"
    :aria-role="isAlert ? 'alert' : false"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <div class="bx--inline-notification__details">
      <cv-icon
        :href="`cv(${icon})`"
        class="bx--inline-notification__icon"
        width="16"
        height="16"
      ></cv-icon>
      <div class="bx--inline-notification__text-wrapper">
        <p class="bx--inline-notification__title">{{ title }}</p>
        <p class="bx--inline-notification__subtitle">{{ subTitle }}.</p>
      </div>
    </div>
    <button
      type="button"
      data-notification-btn
      class="bx--inline-notification__close-button"
      @click="$emit('close')"
    >
      <svg
        class="bx--inline-notification__close-icon"
        aria-label="close"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"
          fill-rule="nonzero"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import notificationMixin from '../../mixins/notification-mixin';
import CvIcon from '../cv-icon/_cv-icon';

export default {
  name: 'CvInlineNotification',
  components: { CvIcon },
  mixins: [notificationMixin],
  props: {
    kind: {
      type: String,
      default: 'info',
      validator: val => ['error', 'info', 'warning', 'success'].includes(val),
    },
  },
  computed: {
    icon() {
      switch (this.kind) {
        case 'error':
          return 'icon--error--solid';
        case 'warning':
          return 'icon--warning--solid';
        case 'success':
          return 'icon--checkmark--solid';
        default:
          return 'icon--info--solid';
      }
    },
  },
};
</script>

<style lang="scss"></style>
