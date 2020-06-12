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
      v-if="actionLabel"
      @click="$emit('action')"
      class="bx--inline-notification__action-button bx--btn bx--btn--sm bx--btn--ghost"
      type="button"
    >
      {{ actionLabel }}
    </button>
    <button
      type="button"
      :aria-label="closeAriaLabel"
      data-notification-btn
      class="bx--inline-notification__close-button"
      @click="$emit('close')"
    >
      <Close20 class="bx--inline-notification__close-icon" />
    </button>
  </div>
</template>

<script>
import notificationMixin from '../../mixins/notification-mixin';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningFilled20 from '@carbon/icons-vue/es/warning--filled/20';
import Close20 from '@carbon/icons-vue/es/close/20';
import InformationFilled20 from '@carbon/icons-vue/es/information--filled/20';

export default {
  name: 'CvInlineNotification',
  components: { Close20 },
  mixins: [notificationMixin],
  props: {
    actionLabel: { type: String, default: '' },
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
          return ErrorFilled20;
        case 'warning':
          return WarningFilled20;
        case 'success':
          return CheckmarkFilled20;
        case 'info':
          return InformationFilled20;
        default:
          return '';
      }
    },
  },
};
</script>
