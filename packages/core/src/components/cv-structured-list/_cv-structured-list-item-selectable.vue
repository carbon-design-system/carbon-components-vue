<template>
  <label
    :for="uid"
    :aria-label="label"
    :class="[
      `cv-structured-list-item--selectable ${carbonPrefix}--structured-list-row`,
      { ' ${carbonPrefix}--structured-list-row--selected': isChecked },
    ]"
    tabindex="0"
  >
    <slot></slot>
    <input
      v-bind="$attrs"
      v-on="inputListeners"
      tabindex="-1"
      :id="uid"
      :class="`${carbonPrefix}--structured-list-input`"
      :checked="isChecked"
      :value="value"
      type="radio"
    />
    <div :class="`${carbonPrefix}--structured-list-td`">
      <CheckmarkFilled16 :class="`${carbonPrefix}--structured-list-svg`" />
    </div>
  </label>
</template>

<script>
import { uidMixin, radioMixin, carbonPrefixMixin } from '../../mixins';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';
export default {
  name: 'CvStructuredListItemSelectable',
  components: { CheckmarkFilled16 },
  inheritAttrs: false,
  mixins: [uidMixin, radioMixin, carbonPrefixMixin],
};
</script>
