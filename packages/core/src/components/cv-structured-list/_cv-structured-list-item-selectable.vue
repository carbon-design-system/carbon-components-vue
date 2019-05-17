<template>
  <label
    :for="uid"
    :aria-label="label"
    class="cv-structured-list-item--selectable bx--structured-list-row"
    :class="{ ' bx--structured-list-row--selected': isChecked }"
    tabindex="0"
  >
    <slot></slot>
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      tabindex="-1"
      :id="uid"
      class="bx--structured-list-input"
      :checked="isChecked"
      :value="value"
      type="radio"
    />
    <div class="bx--structured-list-td">
      <CheckmarkFilled16 class="bx--structured-list-svg" />
    </div>
  </label>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import radioMixin from '../../mixins/radio-mixin';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';

export default {
  name: 'CvStructuredListItemSelectable',
  components: { CheckmarkFilled16 },
  inheritAttrs: false,
  mixins: [uidMixin, radioMixin],
};
</script>
