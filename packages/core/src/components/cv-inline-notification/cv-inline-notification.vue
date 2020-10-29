<template>
  <div
    data-notification
    :class="[
      'cv-inline-notification',
      `${carbonPrefix}--inline-notification`,
      `${carbonPrefix}--inline-notification--${kind.toLowerCase()}`,
      {
        [`${carbonPrefix}--inline-notification--low-contrast`]: lowContrast,
      },
    ]"
    v-on="$listeners"
    :role="isAlert ? 'alert' : false"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <div :class="`${carbonPrefix}--inline-notification__details`">
      <component :is="icon" :class="`${carbonPrefix}--inline-notification__icon`" />
      <div :class="`${carbonPrefix}--inline-notification__text-wrapper`">
        <p :class="`${carbonPrefix}--inline-notification__title`">{{ title }}</p>
        <p :class="`${carbonPrefix}--inline-notification__subtitle`" v-html="subTitle"></p>
      </div>
    </div>
    <button
      v-if="actionLabel"
      @click="$emit('action')"
      :class="[
        `${carbonPrefix}--inline-notification__action-button`,
        `${carbonPrefix}--btn`,
        `${carbonPrefix}--btn--sm`,
        `${carbonPrefix}--btn--ghost`,
      ]"
      type="button"
    >
      {{ actionLabel }}
    </button>
    <button
      type="button"
      :aria-label="closeAriaLabel"
      data-notification-btn
      :class="`${carbonPrefix}--inline-notification__close-button`"
      @click="$emit('close')"
    >
      <Close20 :class="`${carbonPrefix}--inline-notification__close-icon`" />
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
  name: 'CvInlineNotification',
  components: { Close20 },
  mixins: [notificationMixin, carbonPrefixMixin],
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
