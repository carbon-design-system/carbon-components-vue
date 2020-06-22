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
    :class="{ 'bx--dropdown--selected': internalSelected }"
  >
    <a
      :aria-checked="internalSelected"
      class="bx--dropdown-link"
      href="javascript:void(0)"
      ref="link"
      role="menuitemradio"
      tabindex="-1"
    >
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
    selected: Boolean,
  },
  watch: {
    selected() {
      this.dataSelected = this.selected;
      this.$parent.$emit('cv:selected', this);
    },
  },
  data() {
    return {
      dataSelected: undefined,
    };
  },
  mounted() {
    this.$_CvDropdownItem = true; // for use by parent with $children
    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
  computed: {
    internalSelected: {
      get() {
        return this.dataSelected === undefined ? this.selected : this.dataSelected === true;
      },
      set(val) {
        this.dataSelected = val;
      },
    },
    internalContent() {
      return this.$refs.link.innerHTML;
    },
  },
  methods: {
    setFocus() {
      this.$refs.link.focus();
    },
  },
};
</script>
