<template>
  <div
    :class="[
      `${carbonPrefix}--file__selected-file`,
      { [`${carbonPrefix}--file__selected-file--invalid`]: isInvalid },
    ]"
  >
    <p :class="`${carbonPrefix}--file-filename`" :title="item.file?.name">
      {{ item.file?.name }}
    </p>
    <span :class="`${carbonPrefix}--file__state-container`">
      <div
        v-if="item.state === 'uploading'"
        :class="`${carbonPrefix}--inline-loading__animation`"
      >
        <div
          data-inline-loading-spinner
          :class="`${carbonPrefix}--loading ${carbonPrefix}--loading--small`"
        >
          <svg
            :class="`${carbonPrefix}--loading__svg`"
            viewBox="-75 -75 150 150"
          >
            <circle
              :class="`${carbonPrefix}--loading__background`"
              cx="0"
              cy="0"
              r="37.5"
            />
            <circle
              :class="`${carbonPrefix}--loading__stroke`"
              cx="0"
              cy="0"
              r="37.5"
            />
          </svg>
        </div>
      </div>
      <CheckmarkFilled16
        v-if="item.state === 'complete'"
        :class="`${carbonPrefix}--file-complete`"
      />
      <WarningFilled16
        v-if="isInvalid"
        :class="`${carbonPrefix}--file--invalid`"
      />
      <button
        v-if="removable"
        type="button"
        :class="`${carbonPrefix}--file-close`"
        :alt="removeAriaLabel"
        :arial-label="removeAriaLabel"
        @click="emit('remove', item)"
      >
        <Close16 />
        <span :class="`${carbonPrefix}--visually-hidden`">
          {{ removeAriaLabel }}
        </span>
      </button>
    </span>
    <!-- check role (alert) and id / accessibility -->
    <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
      <div :class="`${carbonPrefix}--form-requirement__title`">
        {{ item.invalidMessageTitle || 'Invalid file' }}
      </div>
      <p :class="`${carbonPrefix}--form-requirement__supplement`">
        {{ item.invalidMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import Close16 from '@carbon/icons-vue/es/close/16';

const emit = defineEmits(['remove']);

const props = defineProps({
  item: Object,
  removable: Boolean,
  removeAriaLabel: { type: String, default: 'Remove selected file' },
});

// Computed
const isInvalid = computed(() => {
  return props.item.invalidMessage && props.item.invalidMessage.length;
});
</script>
