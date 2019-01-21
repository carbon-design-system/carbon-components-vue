<template>
  <label
    :for="uid"
    :aria-label="label"
    class="cv-structured-list-item--selectable bx--structured-list-row"
    :class="{ ' bx--structured-list-row--selected': isChecked }"
    tabindex="0"
  >
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
      <svg
        class="bx--structured-list-svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
          fill-rule="evenodd"
        ></path>
      </svg>
    </div>
    <slot></slot>
  </label>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import radioMixin from '../../mixins/radio-mixin';

export default {
  name: 'CvStructuredListItemSelectable',
  mixins: [uidMixin, radioMixin],
};
</script>

<style lang="scss"></style>
