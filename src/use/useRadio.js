import { computed, inject } from 'vue';

export const useRadio = (props, emit) => {
  const isChecked = computed(() => {
    if (props.modelValue === undefined) {
      return props.checked;
    } else {
      return props.modelValue === props.value;
    }
  });

  const onRadioItemChange = inject('onRadioItemChange', () => {});

  const onChange = () => {
    onRadioItemChange(props.value); // emit to parent
    emit('update:modelValue', props.value); // emit for v-model
    emit('change', props.value);
  };

  return {
    isChecked,
    onChange,
  };
};
