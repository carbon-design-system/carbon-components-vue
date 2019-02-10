export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
    checked: Boolean,
    label: String,
    value: { type: String, required: true },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  computed: {
    isChecked() {
      if (this.modelValue === undefined) {
        return this.checked;
      } else {
        return this.modelValue === this.value;
      }
    },
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        change: event => this.onChange(event),
      });
    },
  },
  methods: {
    onChange() {
      this.$parent.$emit('cv:change', this.value); // emit to parent
      this.$emit('change', this.value);
    },
  },
};
