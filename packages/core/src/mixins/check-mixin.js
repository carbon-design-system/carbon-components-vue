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
  mounted() {
    if (this.$options.propsData.modelValue === undefined) {
      this.isChecked = this.checked;
    }
  },
  watch: {
    checked(val) {
      if (this.$options.propsData.modelValue === undefined) {
        this.isChecked = val;
        if (!val && this.mixed) {
          this.dataMixed = true;
        }
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
    isChecked: {
      get() {
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
            if (this.dataChecked !== undefined) {
              return this.dataChecked;
            }
            if (this.dataMixed) {
              return 'mixed';
            }
          }

          return false;
        }
      },
      set(checked) {
        if (this.isArrayModel) {
          let modelSet = new Set(this.modelValue);

          if (!checked) {
            modelSet.delete(this.value);
          } else {
            modelSet.add(this.value);
          }
          this.dataChecked = Array.from(modelSet);
        } else {
          this.dataChecked = checked ? true : undefined; //
          if (this.dataChecked !== undefined) {
            this.dataMixed = false;
          }
        }
      },
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
    onChangeInner(checked) {
      this.isChecked = checked;
      this.$emit('modelEvent', this.dataChecked || false); // or false in case dataChecked is undefined
      this.$emit('change', checked);
    },
    onChange(ev) {
      this.onChangeInner(ev.target.checked);
    },
  },
};
