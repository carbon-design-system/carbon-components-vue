<template>
  <div
    role="alert"
    :kind="kind"
    class="cv-inline-notification"
    :class="[
      `${carbonPrefix}--inline-notification`,
      `${carbonPrefix}--inline-notification--${kind}`,
      { [`${carbonPrefix}--inline-notification--low-contrast`]: lowContrast },
    ]"
  >
    <div :class="`${carbonPrefix}--inline-notification__details`">
      <component
        :is="icon"
        :class="`${carbonPrefix}--inline-notification__icon`"
      />
      <div :class="`${carbonPrefix}--inline-notification__text-wrapper`">
        <p :class="`${carbonPrefix}--inline-notification__title`">
          <slot name="title">
            {{ title }}
          </slot>
        </p>
        <div :class="`${carbonPrefix}--inline-notification__subtitle`">
          <slot name="subtitle">
            {{ subTitle }}
          </slot>
        </div>
      </div>
    </div>
    <button
      v-if="actionLabel.length > 0"
      :class="[
        `${carbonPrefix}--inline-notification__action-button`,
        `${carbonPrefix}--btn`,
        `${carbonPrefix}--btn--sm`,
        `${carbonPrefix}--btn--ghost`,
      ]"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
    <button
      v-if="!hideCloseButton"
      type="button"
      :aria-label="closeAriaLabel"
      :class="`${carbonPrefix}--inline-notification__close-button`"
      @click="$emit('close')"
    >
      <close20 :class="`${carbonPrefix}--inline-notification__close-icon`" />
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { Close20 } from '@carbon/icons-vue';
import { carbonPrefix } from '../../global/settings';
import { notificationKinds, notificationIcons } from './consts';

export default {
  name: 'CvInlineNotification',
  components: { Close20 },
  props: {
    /** Type of status */
    kind: {
      type: String,
      default: notificationKinds[0],
      validator: value => notificationKinds.includes(value),
    },
    /** Notification title */
    title: {
      type: String,
      default: '',
    },
    /** Notification subtitle */
    subTitle: {
      type: String,
      default: '',
    },
    /** Optional action button label - if empty no action button is displayed! */
    actionLabel: {
      type: String,
      default: '',
    },
    /** Close button A11y label */
    closeAriaLabel: {
      type: String,
      default: 'Close notification',
    },
    /** Use lower contrast version of the notification */
    lowContrast: {
      type: Boolean,
      default: false,
    },
    /** Set to true to hide the code button */
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /** Emitted on clicking the action button */
    'action',
    /** Emitted on clicking the close button */
    'close',
  ],
  setup(props) {
    const icon = computed(() => notificationIcons[props.kind]);

    return { carbonPrefix, icon };
  },
};
</script>
