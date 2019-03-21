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
export default {
  name: 'CvToolbarSearch',
  inheritAttrs: false,
  props: {
    value: String,
  },
};
</script>
