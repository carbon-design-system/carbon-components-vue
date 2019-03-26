<template>
  <cv-wrapper class="cv-select bx--form-item" :tag-type="formItem ? 'div' : ''">
    <div
      class="bx--select"
      :class="{
        'cv-select': !formItem,
        'bx--select--inline': inline,
        'bx--select--light': theme === 'light',
      }"
    >
      <label :for="uid" class="bx--label" :class="{ 'bx--visually-hidden': hideLabel }">{{ label }}</label>
      <select v-bind="$attrs" :id="uid" class="bx--select-input" v-on="inputListeners" ref="select" :value="value">
        <slot></slot>
      </select>
      <svg class="bx--select__arrow" width="10" height="5" viewBox="0 0 10 5">
        <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
      </svg>
    </div>
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvSelect',
  inheritAttrs: false,
  components: { CvWrapper },
  mixins: [uidMixin, themeMixin],
  props: {
    inline: Boolean,
    formItem: { type: Boolean, default: false },
    hideLabel: Boolean,
    label: { type: String, required: true },
    // *********************
    // declare here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    multiple: {
      type: String,
      validator: () => {
        console.warn('property multiple not supported in CvSelect');
        return false;
      },
    },
    value: { type: String },
  },
  beforeCreate() {
    // *********************
    // delete here to prevent the following from being added to the select
    // *********************
    // multiple does not work with styling from carbon-components 9.20
    delete this.$attrs.multiple;
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
  methods: {
    test() {
      alert('hi');
    },
  },
};
</script>

<style lang="scss"></style>
