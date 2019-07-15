<template>
  <div class="cv-radio-button bx--radio-button-wrapper" :class="{ 'bx--radio-button-wrapper--label-left': labelLeft }">
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      :id="uid"
      :checked="isChecked"
      class="bx--radio-button"
      ref="input"
      type="radio"
      :value="value"
    />
    <!-- symbol causes problem in codepen? -->
    <label :for="uid" class="bx--radio-button__label">
      <span class="bx--radio-button__appearance"></span>
      {{ label }}
    </label>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import radioMixin from '../../mixins/radio-mixin';

export default {
  name: 'CvRadioButton',
  inheritAttrs: false,
  mixins: [uidMixin, radioMixin],
  props: {
    labelLeft: Boolean,
  },
};
</script>
