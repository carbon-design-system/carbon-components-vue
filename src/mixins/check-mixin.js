/*
 * Provides common checkbox behaviour
 */

export default {
  props: {
    modelValue: { type: [Array, Boolean], default: () => undefined },
    checked: { type: Boolean, default: undefined },
    name: String,
    value: { type: String, required: true },
  },
  model: {
    prop: 'modelValue',
    event: 'modelEvent',
  },
  watch: {
    checked(val) {
      if (this.$options.propsData.modelValue === undefined) {
        this.dataChecked = val;
      }
    },
  },
  data() {
    return {
      dataChecked: undefined,
    };
  },
  computed: {
    isArrayModel() {
      return Array.isArray(this.modelValue);
    },
    isChecked() {
      if (this.$props.modelValue !== undefined) {
        // model value always comes first
        if (this.isArrayModel) {
          if (this.modelValue.includes(this.value)) {
            return true;
          } else {
            return false;
          }
        } else {
          return this.modelValue;
        }
      } else {
        if (this.dataChecked !== undefined) {
          return this.dataChecked;
        } else {
          // if checked defined
          if (this.checked !== undefined) {
            return this.checked;
          }

          if (this.mixed) {
            return 'mixed';
          }
        }

        return false;
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
      if (this.isArrayModel) {
        let modelSet = new Set(this.modelValue);

        if (!ev.target.checked) {
          modelSet.delete(this.value);
          this.$emit('change', false);
        } else {
          modelSet.add(this.value);
          this.$emit('change', true);
        }
        this.dataChecked = Array.from(modelSet);
      } else {
        this.dataChecked = ev.target.checked;
        this.$emit('change', ev.target.checked);
      }
      this.$emit('modelEvent', this.dataChecked);
    },
  },
};
