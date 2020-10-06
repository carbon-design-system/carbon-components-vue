<template>
  <div
    data-notification
    :class="[
      `cv-notifiation ${carbonPrefix}--toast-notification`,
      `${carbonPrefix}--toast-notification--${kind.toLowerCase()}`,
      { [`${carbonPrefix}--toast-notification--low-contrast`]: lowContrast },
    ]"
    v-on="$listeners"
    :role="isAlert ? 'alert' : undefined"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <component :is="icon" :class="`${carbonPrefix}--toast-notification__icon`" />
    <div :class="`${carbonPrefix}--toast-notification__details`">
      <h3 :class="`${carbonPrefix}--toast-notification__title`">{{ title }}</h3>
      <p :class="`${carbonPrefix}--toast-notification__subtitle`" v-html="subTitle"></p>
      <p :class="`${carbonPrefix}--toast-notification__caption`" v-html="caption"></p>
    </div>
    <button
      :aria-label="closeAriaLabel"
      type="button"
      data-notification-btn
      :class="`${carbonPrefix}--toast-notification__close-button`"
      @click="$emit('close')"
    >
      <Close20 :class="`${carbonPrefix}--toast-notification__close-icon`" />
    </button>
  </div>
</template>

<script>
import { notificationMixin, carbonPrefixMixin } from '../../mixins';
import ErrorFilled20 from '@carbon/icons-vue/es/error--filled/20';
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20';
import WarningFilled20 from '@carbon/icons-vue/es/warning--filled/20';
import Close20 from '@carbon/icons-vue/es/close/20';
import InformationFilled20 from '@carbon/icons-vue/es/information--filled/20';

export default {
  name: 'CvToastNotification',
  components: { Close20 },
  mixins: [notificationMixin, carbonPrefixMixin],
  props: {
    caption: String,
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
