<template>
  <label
    :for="uid" :aria-label="label" class="bx--structured-list-row"
    :class="{' bx--structured-list-row--selected': isChecked}" tabindex="0">
    <input
      v-if
      v-bind="$attrs"
      v-on="inputListeners"
      tabindex="-1"
      :id="uid"
      class="bx--structured-list-input"
      :checked="isChecked"
      :value="value"
      type="radio"
    />
    <div class="bx--structured-list-td">
      <svg class="bx--structured-list-svg" width="16" height="16" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.646-10.854L6.75 10.043 4.354 7.646l-.708.708 3.104 3.103 5.604-5.603-.708-.708z"
          fill-rule="evenodd" />
      </svg>
    </div>
    <slot>

    </slot>
  </label>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

const noModelValue = Symbol(
  'cv-structured list item selectable - no model value'
); // a unique identifier

export default {
  name: 'CvStructuredListItemSelectable',
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    _modelValue: { type: [String, Symbol], default: noModelValue },
    checked: Boolean,
    label: String,
    value: { type: String, default: null },
  },
  model: {
    prop: '_modelValue',
    event: '_modelEvent',
  },
  computed: {
    isChecked() {
      if (this._modelValue === noModelValue) {
        return this.checked;
      } else {
        return this._modelValue === this.value;
      }
    },
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        change: event => this.onchange(event),
      });
    },
  },
  methods: {
    onchange(ev) {
      this.$emit('change', ev);
      // console.log(this.value === noModelValue, this.value);
      this.$emit('_modelEvent', this.value);
    },
  },
};
</script>

<style lang="scss">
</style>
