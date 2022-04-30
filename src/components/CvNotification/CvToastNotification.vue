<template>
  <div
    role="alert"
    :kind="kind"
    :class="[
      `${carbonPrefix}--toast-notification`,
      `${carbonPrefix}--toast-notification--${kind}`,
      { [`${carbonPrefix}--toast-notification--low-contrast`]: lowContrast },
    ]"
  >
    <component
      :is="icon"
      :class="`${carbonPrefix}--toast-notification__icon`"
    />
    <div :class="`${carbonPrefix}--toast-notification__details`">
      <h3 :class="`${carbonPrefix}--toast-notification__title`">{{ title }}</h3>
      <div :class="`${carbonPrefix}--toast-notification__subtitle`">
        {{ subTitle }}
      </div>
      <div :class="`${carbonPrefix}--toast-notification__caption`">
        {{ caption }}
      </div>
      <slot />
    </div>
    <button
      type="button"
      :aria-label="closeAriaLabel"
      :class="`${carbonPrefix}--toast-notification__close-button`"
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
  name: 'CvToastNotification',
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
    /** Notification sub title (supports HTML) */
    subTitle: {
      type: String,
      default: '',
    },
    /** Notification caption (supports HTML) */
    caption: {
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
  },
  emits: [
    /** Emitted on clicking the close button */
    'close',
  ],
  setup(props) {
    const icon = computed(() => notificationIcons[props.kind]);

    return { carbonPrefix, icon };
  },
};
</script>
