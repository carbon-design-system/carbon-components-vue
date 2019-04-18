<template>
  <component :is="tagType" v-bind="$attrs" v-on="$listeners" :value="value" class="cv-dropdown">
    <template slot="invalid-message">
      <slot name="invalid-message" />
    </template>
    <template slot="helper-text">
      <slot name="helper-text" />
    </template>
    <slot></slot>
  </component>
</template>

<script>
import { componentsX } from '../../internal/feature-flags';
import CvDropdownInnerC10 from './_cv-dropdown-inner-c10';
import CvDropdownInner from './_cv-dropdown-inner';

export default {
  name: 'CvDropdown',
  components: { CvDropdownInnerC10, CvDropdownInner },
  inheritAttrs: false,
  data() {
    return { componentsX };
  },
  props: {
    value: String,
  },
  computed: {
    tagType() {
      return this.componentsX ? 'cv-dropdown-inner-c10' : 'cv-dropdown-inner';
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>
