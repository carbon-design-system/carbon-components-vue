<template>
  <div
    :class="[
      `cv-radio-button ${carbonPrefix}--radio-button-wrapper`,
      { [`${carbonPrefix}--radio-button-wrapper--label-left`]: labelLeft },
    ]"
  >
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      :id="uid"
      :checked="isChecked"
      :class="`${carbonPrefix}--radio-button`"
      ref="input"
      type="radio"
      :value="value"
    />
    <!-- symbol causes problem in codepen? -->
    <label :for="uid" :class="`${carbonPrefix}--radio-button__label`">
      <span :class="`${carbonPrefix}--radio-button__appearance`"></span>
      {{ label }}
    </label>
  </div>
</template>

<script>
import { uidMixin, radioMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';

export default {
  name: 'CvRadioButton',
  inheritAttrs: false,
  mixins: [uidMixin, radioMixin, carbonPrefixMixin, methodsMixin({ input: ['blur', 'focus'] })],
  props: {
    labelLeft: Boolean,
  },
};
</script>
