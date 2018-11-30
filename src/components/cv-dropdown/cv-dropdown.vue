<!--
  Carbon Style Dropdown

  Attributes:
    placeholder: Placeholder text displayed before any  selection is made.

  Usage:
    <cv-dropdown placeholder="Choose an option">
      <cv-dropdown-item value="10">Option 1</cv-dropdown-item>
      <cv-dropdown-item value="20">Option 2</cv-dropdown-item>
      <cv-dropdown-item value="30">Option 3</cv-dropdown-item>
      <cv-dropdown-item value="40">Option 4</cv-dropdown-item>
      <cv-dropdown-item value="50">Option 5</cv-dropdown-item>
    </cv-dropdown>

-->

<template>
  <ul data-dropdown data-value class="bx--dropdown" tabindex="0">
    <li class="bx--dropdown-text">
      {{placeholder}}
    </li>
    <svg class="bx--dropdown__arrow" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
      <path d="M10 0L5 5 0 0z"></path>
    </svg>
    <li>
      <ul class="bx--dropdown-list" v-on:change="onChange">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
  import { Dropdown } from 'carbon-components';

  export default {
    name: 'CvDropdown',
    data () {
      return {
        selected: null,
        carbonComponent: null
      };
    },
    props: {
      placeholder: {
        type: String,
        default: 'Choose an option'
      }
    },
    methods: {
      onChange: function (value) {
        this.selected = value;
      }
    },
    mounted() {
      this.carbonComponent = Dropdown.create(this.$el);
    },
    beforeDestroy() {
      this.carbonComponent.release();
    }
  };
</script>

<style lang="scss">
  @import '~carbon-components/scss/components/dropdown/dropdown';
</style>
