<template>
  <div :class="{ 'bx--form-item': formItem }">
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      :class="{ 'bx--toggle-input--small': small }"
      class="bx--toggle-input"
      type="checkbox"
      :id="uid"
      :checked="isChecked === true"
      :aria-checked="`${isChecked}`"
      :value="value"
    />
    <label class="bx--toggle-input__label" :for="uid" :aria-label="hiddenLabel">
      {{ visibleLabel }}
      <span class="bx--toggle__switch">
        <svg class="bx--toggle__check" width="6px" height="5px" viewBox="0 0 6 5">
          <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
        </svg>
        <span class="bx--toggle__text--off" aria-hidden="true">
          <slot name="text-left">Off</slot>
        </span>
        <span class="bx--toggle__text--on" aria-hidden="true">
          <slot name="text-right">On</slot>
        </span>
      </span>
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
    label: String,
    formItem: { type: Boolean, default: true },
    hideLabel: Boolean,
  },
  computed: {
    hiddenLabel() {
      return this.hideLabel ? this.label : undefined;
    },
    visibleLabel() {
      return this.hideLabel ? undefined : this.label;
    },
  },
};
</script>
