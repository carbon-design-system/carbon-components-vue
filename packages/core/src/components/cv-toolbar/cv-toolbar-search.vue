<template>
  <cv-search
    kind="toolbar"
    class="cv-toolbar-search"
    :form-item="false"
    v-bind="$attrs"
    v-on="$listeners"
    @focus="onFocus"
    @blur="onBlur"
    :value="value"
    small
  ></cv-search>
</template>

<script>
import CvSearch from '../cv-search/cv-search';

export default {
  name: 'CvToolbarSearch',
  components: {
    CvSearch,
  },
  inheritAttrs: false,
  props: {
    value: String,
  },
  methods: {
    onBlur(ev) {
      if (!this.$el.contains(ev.target)) {
        this.$el.classList.remove('bx--toolbar-search--active');
      }
    },
    onFocus() {
      this.$el.classList.add('bx--toolbar-search--active');
    },
  },
};
</script>
