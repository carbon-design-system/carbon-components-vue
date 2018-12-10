/*
* Provides common checkbox behaviour
*/

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: () => undefined },
    checked: Boolean,
    name: String,
    value: { type: String, required: true },
  },
  model: {
    prop: 'modelValue',
    event: '_modelEvent',
  },
  beforeCreate() {
    console.log(
      `WARNING(${this.$options._componentTag}): v-model under review`
    );
  },
  computed: {
    isArrayModel() {
      return Array.isArray(this.modelValue);
    },
    isChecked() {
      if (this.$props.modelValue !== undefined) {
        if (this.isArrayModel) {
          return this.modelValue.includes(this.value);
        } else {
          return this.modelValue;
        }
      } else {
        return this.checked;
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
    onChange(ev) {
      let modelValue;

      if (this.isArrayModel) {
        let modelSet = new Set(this.modelValue);

        if (!ev.target.checked) {
          modelSet.delete(this.value);
          this.$emit('change', false);
        } else {
          modelSet.add(this.value);
          this.$emit('change', true);
        }
        modelValue = Array.from(modelSet);
      } else {
        modelValue = ev.target.checked;
        this.$emit('change', ev.target.checked);
      }
      this.$emit('_modelEvent', modelValue);
    },
  },
};
