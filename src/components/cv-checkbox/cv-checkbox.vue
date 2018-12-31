<template>
  <div class="cv-checkbox bx--form-item bx--checkbox-wrapper">
    <label
      :class="[
        'bx--checkbox-label',
        { 'bx--label--disabled': $attrs.disabled !== undefined },
      ]"
      :data-contained-checkbox-state="isChecked"
    >
      <input
        ref="input"
        v-bind="$attrs"
        v-on="inputListeners"
        class="bx--checkbox"
        type="checkbox"
        :checked="isChecked === true"
        :aria-checked="`${isChecked}`"
        @change="onChange"
      />
      {{ label }}
    </label>
  </div>
</template>

<script>
import checkMixin from '../../mixins/check-mixin';

export default {
  name: 'CvCheckbox',
  mixins: [checkMixin],
  inheritAttrs: false,
  props: {
    label: String,
    mixed: Boolean,
  },
  data() {
    return {
      dataMixed: this.mixed,
    };
  },
};
</script>

<style lang="scss"></style>
