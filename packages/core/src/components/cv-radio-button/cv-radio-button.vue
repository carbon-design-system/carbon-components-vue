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
import uidMixin from '../../mixins/uid-mixin';
import radioMixin from '../../mixins/radio-mixin';
import carbonPrefixMixin from '../../mixins/carbon-prefix-mixin';
import methodsMixin from '../../mixins/methods-mixin';

export default {
  name: 'CvRadioButton',
  inheritAttrs: false,
  mixins: [uidMixin, radioMixin, carbonPrefixMixin, methodsMixin({ input: ['blur', 'focus'] })],
  props: {
    labelLeft: Boolean,
  },
};
</script>
