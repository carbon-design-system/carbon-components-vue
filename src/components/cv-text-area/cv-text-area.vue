<template>
  <div class="bx--form-item">
    <label :for="uid" :class="['bx--label', {'bx--label--disabled': $attrs.disabled !== undefined}]">{{label}}</label>
    <textarea :id="uid" class="bx--text-area" v-bind="$attrs" :value="value" v-on="inputListeners"></textarea>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvTextArea',
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    label: String,
    value: String,
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/text-area/text-area';
</style>
