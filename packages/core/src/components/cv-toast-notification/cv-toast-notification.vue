<template>
  <div
    data-notification
    class="cv-notifiation bx--toast-notification"
    :class="`bx--toast-notification--${kind}`"
    v-on="$listeners"
    :role="isAlert ? 'alert' : undefined"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <component :is="icon" class="bx--toast-notification__icon" />
    <div class="bx--toast-notification__details">
      <h3 class="bx--toast-notification__title">{{ title }}</h3>
      <p class="bx--toast-notification__subtitle">{{ subTitle }}</p>
      <p class="bx--toast-notification__caption">{{ caption }}</p>
    </div>
    <button
      :aria-label="closeAriaLabel"
      type="button"
      data-notification-btn
      class="bx--toast-notification__close-button"
      @click="$emit('close')"
    >
      <Close16 class="bx--toast-notification__close-icon" />
    </button>
  </div>
</template>

<script>
import notificationMixin from '../../mixins/notification-mixin';
import ErrorFilled16 from '@rocketsoftware/icons-vue/es/error--filled/16';
import CheckmarkFilled16 from '@rocketsoftware/icons-vue/es/checkmark--filled/16';
import WarningAltFilled16 from '@rocketsoftware/icons-vue/es/warning--alt--filled/16';
import Close16 from '@rocketsoftware/icons-vue/es/close/16';

export default {
  name: 'CvToastNotification',
  components: { Close16 },
  mixins: [notificationMixin],
  props: {
    caption: String,
    closeAriaLabel: { type: String, default: 'Close' },
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
          return ErrorFilled16;
        case 'warning':
          return WarningAltFilled16;
        case 'success':
          return CheckmarkFilled16;
        default:
          return null;
      }
    },
  },
};
</script>
