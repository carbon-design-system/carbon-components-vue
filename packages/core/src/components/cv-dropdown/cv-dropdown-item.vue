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
    :class="[
      `cv-dropdown-item ${carbonPrefix}--dropdown-item`,
      { [`${carbonPrefix}--dropdown--selected`]: internalSelected },
    ]"
  >
    <a
      :aria-checked="internalSelected"
      :class="`${carbonPrefix}--dropdown-link`"
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
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvDropdownItem',
  mixins: [carbonPrefixMixin],
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
