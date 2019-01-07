<template>
  <div class="cv-toggle bx--form-item">
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      :class="{ 'bx--toggle--small': small }"
      class="bx--toggle"
      type="checkbox"
      :id="uid"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      @change="onChange"
      :value="value"
    />
    <label
      class="bx--toggle__label"
      :for="uid"
      :data-contained-checkbox-state="isChecked"
    >
      <div class="bx--toggle__text--left" v-if="!small">
        <slot name="text-left">Off</slot>
      </div>
      <span class="bx--toggle__appearance"></span>
      <div class="bx--toggle__text--right" v-if="!small">
        <slot name="text-right">On</slot>
      </div>
    </label>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import checkMixin from '../../mixins/check-mixin';

export default {
  name: 'CvToggle',
  mixins: [uidMixin, checkMixin],
  inheritAttrs: false,
  props: {
    small: Boolean,
  },
};
</script>

<style lang="scss"></style>
