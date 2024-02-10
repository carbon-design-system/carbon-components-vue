<template>
  <div :class="`cv-radio-group ${carbonPrefix}--form-item`">
    <fieldset
      :class="[
        `${carbonPrefix}--radio-button-group`,
        { [`${carbonPrefix}--radio-button-group--vertical`]: vertical },
      ]"
    >
      <legend
        :class="[
          `${carbonPrefix}--label`,
          { [`${carbonPrefix}--visually-hidden`]: hideLegend },
        ]"
        dir="auto"
      >
        {{ legendText }}
      </legend>
      <slot></slot>
    </fieldset>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { carbonPrefix } from '../../global/settings';

defineProps({
  vertical: Boolean,
  legendText: {
    type: String,
    default: null,
    required: true,
    validator: legend => !!legend.length,
  },
  hideLegend: Boolean,
});

const emit = defineEmits(['change']);

provide('onRadioItemChange', clickedItemCvId => {
  emit('change', clickedItemCvId);
});
</script>
