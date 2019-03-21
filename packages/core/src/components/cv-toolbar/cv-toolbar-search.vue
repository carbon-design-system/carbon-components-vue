<template>
  <cv-search
    kind="toolbar"
    class="bx--toolbar-search"
    :form-item="false"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
  ></cv-search>
</template>

<script>
import CvSearch from '../cv-search/cv-search';

export default {
  name: 'CvToolbarSearch',
  components: { CvSearch },
  inheritAttrs: false,
  props: {
    value: String,
  },
};
</script>
