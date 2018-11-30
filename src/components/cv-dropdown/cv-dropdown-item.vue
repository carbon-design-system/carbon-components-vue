<!--
  Carbon dropdown item

  Attributes:
    value: The value for the item. Optional.

  Usage:
  See dropdown.vue

-->

<template>
  <li
    data-option
    :data-value="value"
    class="cv-dropdown-item bx--dropdown-item"
    v-on:click="selectValue"
  >
    <a class="bx--dropdown-link" href="javascript:void(0)">
      <slot></slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'CvDropdownItem',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectValue: function(event) {
      if (event) {
        this.$parent.$emit('change', this.value);
      }
    },
  },
};
</script>
