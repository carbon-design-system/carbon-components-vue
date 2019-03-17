<template>
  <div
    data-notification
    class="cv-inline-notification bx--inline-notification"
    :class="`bx--inline-notification--${kind.toLowerCase()}`"
    v-on="$listeners"
    :role="isAlert ? 'alert' : false"
    :aria-live="!isAlert ? 'polite' : false"
  >
    <div class="bx--inline-notification__details">
      <component
        v-if="componentsX"
        :is="icon"
        class="bx--inline-notification__icon"
      />
      <cv-icon
        v-else
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
      <Close16 v-if="componentsX" class="bx--inline-notification__close-icon" />
      <svg
        v-else
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
import { componentsX } from '../../_internal/_feature-flags';
import ErrorFilled16 from '@carbon/icons-vue/lib/error--filled/16';
import CheckmarkFilled16 from '@carbon/icons-vue/lib/checkmark--filled/16';
import WarningAltFilled16 from '@carbon/icons-vue/lib/warning--filled/16';
import Close16 from '@carbon/icons-vue/lib/close/16';

export default {
  name: 'CvInlineNotification',
  components: { CvIcon, Close16 },
  data() {
    return {
      componentsX,
    };
  },
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
          return componentsX ? ErrorFilled16 : 'icon--error--solid';
        case 'warning':
          return componentsX ? WarningAltFilled16 : 'icon--warning--solid';
        case 'success':
          return componentsX ? CheckmarkFilled16 : 'icon--checkmark--solid';
        default:
          return componentsX ? null : 'icon--info--solid';
      }
    },
  },
};
</script>

<style lang="scss"></style>
