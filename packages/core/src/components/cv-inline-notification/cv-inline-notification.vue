<template>
  <div
    data-notification
    class="cv-inline-notification bx--inline-notification"
    :class="[
      `bx--inline-notification--${kind.toLowerCase()}`,
      {
        'bx--inline-notification--low-contrast': lowContrast,
      },
    ]"
    v-on="$listeners"
    :role="isAlert ? 'alert' : false"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <div class="bx--inline-notification__details">
      <component :is="icon" class="bx--inline-notification__icon" />
      <div class="bx--inline-notification__text-wrapper">
        <p class="bx--inline-notification__title">{{ title }}</p>
        <p class="bx--inline-notification__subtitle">{{ subTitle }}</p>
      </div>
    </div>
    <button
      type="button"
      :aria-label="closeAriaLabel"
      data-notification-btn
      class="bx--inline-notification__close-button"
      @click="$emit('close')"
    >
      <Close16 class="bx--inline-notification__close-icon" />
    </button>
  </div>
</template>

<script>
import notificationMixin from '../../mixins/notification-mixin';
import ErrorFilled16 from '@carbon/icons-vue/es/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';
import WarningAltFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import Close16 from '@carbon/icons-vue/es/close/16';

export default {
  name: 'CvInlineNotification',
  components: { Close16 },
  mixins: [notificationMixin],
  props: {
    closeAriaLabel: { type: String, default: 'Dismiss notification' },
    kind: {
      type: String,
      default: 'info',
      validator: val => ['error', 'info', 'warning', 'success'].includes(val),
    },
    lowContrast: Boolean,
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
