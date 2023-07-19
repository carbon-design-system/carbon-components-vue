import { computed, inject } from 'vue';

export const useRadio = props => {
  const isChecked = computed(() => {
    if (props.modelValue === undefined) {
      return props.checked;
    } else {
      return props.modelValue === props.value;
    }
  });

  const onRadioItemChagne = inject('onRadioItemChagne', () => {});

  const onChange = () => {
    onRadioItemChagne(props.value); // emit to parent

    emit('update:modelValue', props.value); // emit for v-model
    emit('change', props.value);
  };

  return {
    isChecked,
    onChange,
    // inputListeners,
  };

  // inheritAttrs: false,
  // props: {
  //   modelValue: String,
  //   checked: Boolean,
  //   label: String,
  //   value: { type: String, required: true },
  // },
  // model: {
  //   prop: 'modelValue',
  //   event: 'change',
  // },
  // computed: {
  //   isChecked() {
  //     if (this.modelValue === undefined) {
  //       return this.checked;
  //     } else {
  //       return this.modelValue === this.value;
  //     }
  //   },
  //   // Bind listeners at the component level to the embedded input element and
  //   // add our own input listener to service the v-model. See:
  //   // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
  //   inputListeners() {
  //     return Object.assign({}, this.$listeners, {
  //       change: event => this.onChange(event),
  //     });
  //   },
  // },
  // methods: {
  //   onChange() {
  //     this.$parent.$emit('cv:change', this.value); // emit to parent
  //     this.$emit('change', this.value);
  //   },
  // },
};
