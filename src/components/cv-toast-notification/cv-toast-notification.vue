<template>
  <div
    data-notification
    class="cv-notifiation bx--toast-notification"
    :class="`bx--toast-notification--${kind}`"
    v-on="$listeners"
    :aria-role="isAlert ? 'alert' : false"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <component
      v-if="componentsX"
      :is="icon"
      class="bx--toast-notification__icon"
    />
    <div class="bx--toast-notification__details">
      <h3 class="bx--toast-notification__title">{{ title }}</h3>
      <p class="bx--toast-notification__subtitle">{{ subTitle }}</p>
      <p class="bx--toast-notification__caption">{{ caption }}</p>
    </div>
    <button
      type="button"
      data-notification-btn
      class="bx--toast-notification__close-button"
      @click="$emit('close')"
    >
      <Close16 v-if="componentsX" class="bx--toast-notification__close-icon" />
      <svg
        v-else
        class="bx--toast-notification-icon"
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
import { componentsX } from '../../_internal/_feature-flags';
import ErrorFilled16 from '@carbon/icons-vue/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';
import WarningAltFilled16 from '@carbon/icons-vue/lib/warning--alt--filled/16';
import Close16 from '@carbon/icons-vue/lib/close/16';

export default {
  name: 'CvToastNotification',
  components: { Close16 },
  data() {
    return {
      componentsX,
    };
  },
  mixins: [notificationMixin],
  props: {
    caption: String,
    kind: {
      type: String,
      default: 'info',
      validator: val => ['error', 'info', 'warning', 'success'].includes(val),
    },
  },
  computed: {
    icon() {
      if (this.componentsX) {
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
      }
      return null;
    },
  },
};
</script>

<style lang="scss"></style>
