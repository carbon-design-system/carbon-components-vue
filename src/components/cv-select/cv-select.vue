<template>
  <div class="bx--form-item cv-select">
    <div class="bx--select" :class="{'bx--select--inline': inline, 'bx--select--light': theme === 'light'}">
      <select
        v-bind="$attrs"
        :id="uid"
        class="bx--select-input"
        v-on="inputListeners"
        ref="select"
      >
        <slot>

        </slot>
      </select>
      <svg class="bx--select__arrow" width="10" height="5" viewBox="0 0 10 5">
        <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd" />
      </svg>
      <label :for="uid" class="bx--label" :class="{'bx--visually-hidden': hideLabel}">{{label}}</label>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvSelect',
  inheritAttrs: false,
  mixins: [uidMixin, themeMixin],
  props: {
    inline: Boolean,
    hideLabel: Boolean,
    label: { type: String, required: true },
    _modelValue: { type: String, default: undefined },
    // *********************
    // declare here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    multiple: {
      type: String,
      validator: val => {
        console.log('multiple not supported in cv-select');
        return false;
      },
    },
  },
  model: {
    event: '_modelEvent',
    prop: '_modelValue',
  },
  beforeCreate() {
    // *********************
    // delete here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    delete this.$attrs.multiple;
    // value gets picked up by vues $attrs and set's select.value
    // the standard HTML control does not do this.
    // value: String,
    delete this.$attrs.value;
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        change: event => {
          this.$emit('_modelEvent', event.target.value);
          this.$emit('change', event);
        },
      };
    },
  },
  mounted() {
    if (this._modelValue) {
      this.$refs.select.value = this._modelValue;
    }
  },
  watch: {
    _modelValue(val) {
      this.$refs.select.value = val;
    },
  },
  methods: {
    value(val) {
      if (val !== undefined) {
        this.$refs.select.value = val;
      }
      return this.$refs.select.value;
    },
  },
};
</script>

<style lang="scss">
// Import Style Definitions
@import '~carbon-components/scss/components/select/select';
</style>
