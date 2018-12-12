<template>
  <div class="cv-select bx--form-item">
    <div
      class="bx--select"
      :class="{'bx--select--inline': inline, 'bx--select--light': theme === 'light'}"
    >
      <select v-bind="$attrs" :id="uid" class="bx--select-input" v-on="inputListeners" ref="select">
        <slot></slot>
      </select>
      <svg class="bx--select__arrow" width="10" height="5" viewBox="0 0 10 5">
        <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
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
    modelValue: { type: String, default: undefined },
    // *********************
    // declare here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    multiple: {
      type: String,
      validator: val => {
        console.warn('property multiple not supported in CvSelect');
        return false;
      },
    },
  },
  model: {
    event: 'modelEvent',
    prop: 'modelValue',
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
          this.$emit('modelEvent', event.target.value);
          this.$emit('change', event);
        },
      };
    },
    internalValue: {
      get() {
        return this.$refs.select.value;
      },
      set(val) {
        this.$refs.select.value = val;
      },
    },
  },
  mounted() {
    if (this.modelValue) {
      this.internalValue = this.modelValue;
    }
  },
  watch: {
    modelValue(val) {
      this.internalValue = val;
    },
  },
};
</script>

<style lang="scss">
.bx--visually-hidden {
  visibility: visible;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  white-space: nowrap;
}

.cv-select {
  // todo carbon issues? test in date picker
  display: inline-flex;
  flex: initial;
}
</style>
