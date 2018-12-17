<!--
  Carbon dropdown item

  Attributes:
    value: The value for the item. Optional.

  Usage:
  See dropdown.vue

-->

<template>
  <li data-option :data-value="value" class="cv-dropdown-item bx--dropdown-item">
    <a
      class="bx--dropdown-link"
      :class="{'bx--dropdown--selected': internalSelected}"
      href="javascript:void(0)"
      @click="onClick"
      ref="link"
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
  mounted() {
    this.itemId = Symbol('dropdown item');
    this.parentClick = this.$parent.register(this);
  },
  beforeDestroy() {
    this.$parent.deregister(this);
  },
  data() {
    return {
      dataSelected: undefined,
    };
  },
  computed: {
    internalSelected: {
      get() {
        return this.dataSelected === undefined
          ? this.selected
          : this.dataSelected === true;
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
    onClick() {
      this.parentClick(this);
    },
  },
};
</script>
