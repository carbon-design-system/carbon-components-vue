<template>
  <div class="props-revealed">
    <div>Props/data passed to story component.</div>
    <br />
    <pre v-highlightjs="json">
      <code class="json"></code>
    </pre>
  </div>
</template>

<script>
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
Vue.use(VueHighlightJS);

export default {
  props: {
    json: String,
  },
};
</script>
<style lang="scss">
@import '~carbon-components/scss/globals/scss/vars';

.props-revealed {
  margin-top: $spacing-09;
  padding: $spacing-05;
  border: 1px solid $text-01;

  pre {
    max-height: 300px;
    overflow: auto;
  }
}
</style>
