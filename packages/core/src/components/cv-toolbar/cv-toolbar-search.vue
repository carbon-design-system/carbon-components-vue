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
import { carbonPrefixMixin } from '../../mixins';

export default {
  name: 'CvToolbarSearch',
  mixins: [carbonPrefixMixin],
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
        this.$el.classList.remove(`${this.carbonPrefix}--toolbar-search--active`);
      }
    },
    onFocus() {
      this.$el.classList.add(`${this.carbonPrefix}--toolbar-search--active`);
    },
  },
};
</script>
