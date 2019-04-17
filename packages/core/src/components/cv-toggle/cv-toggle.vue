<template>
  <component :is="label ? 'fieldset' : 'div'" :class="{ 'bx--fieldset': label }">
    <legend v-if="label" class="bx--label">{{ label }}</legend>
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
        :value="value"
      />
      <label class="bx--toggle__label" :for="uid" :data-contained-checkbox-state="isChecked">
        <div class="bx--toggle__text--left">
          <slot name="text-left">Off</slot>
        </div>
        <span class="bx--toggle__appearance">
          <svg v-if="small" class="bx--toggle__check" width="6px" height="5px" viewBox="0 0 6 5">
            <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z"></path>
          </svg>
        </span>
        <div class="bx--toggle__text--right">
          <slot name="text-right">On</slot>
        </div>
      </label>
    </div>
  </component>
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
  },
};
</script>

<style lang="scss"></style>
