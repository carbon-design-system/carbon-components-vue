/*
 * Provides common checkbox behaviour
 */
import { ref, computed, watch, onMounted, defineEmits } from 'vue';

export const props = {
  modelValue: { type: [Array, Boolean], default: () => undefined },
  mixed: { type: Boolean, default: null },
  checked: { type: Boolean, default: undefined },
  name: String,
  value: { type: String, required: true },
};

const isArrayModel = computed(() => {
  return Array.isArray(props.modelValue);
});

export function useCheck(props, emit) {
  // Maintain the state of the checkbox
  let dataChecked = ref(undefined);
  let isChecked = computed({
    get() {
      if (props.modelValue !== undefined) {
        // model value always comes first
        if (isArrayModel.value) {
          if (props.modelValue.includes(props.value)) {
            return true;
          } else {
            return false;
          }
        } else {
          return this.modelValue;
        }
      } else {
        if (dataChecked.value !== undefined) {
          return dataChecked;
        } else if (dataMixed.value) {
          return 'mixed';
        }
        return false;
      }
    },
    set() {
      if (isArrayModel.value) {
        let modelSet = new Set(props.modelValue);

        if (!props.checked) {
          modelSet.delete(props.value);
        } else {
          modelSet.add(props.value);
        }
        dataChecked = Array.from(modelSet);
      } else {
        dataChecked = props.checked ? true : undefined;
        if (dataChecked.value !== undefined) {
          dataMixed = false;
        }
      }
    },
  });
  onMounted(() => {
    if (props.modelValue === undefined) {
      isChecked = props.checked;
    }
  });

  // Maintain the state of the aria-checkbox
  let dataMixed = ref(props.mixed);
  watch(props.mixed, val => {
    dataMixed = val;
    if (dataMixed && props.checked !== true) {
      isChecked = false; // reset check state so mixed takes
    }
  });

  watch(props.checked, val => {
    if (props.modelValue === undefined) isChecked = val;
    if (!val && dataMixed) {
      dataMixed.value = true;
    }
  });

  // Watch for change
  function onChangeInner(checked) {
    isChecked = checked;
    emit('modelEvent', dataChecked || false); // or false in case dataChecked is undefined
    emit('change', checked);
  }
  function onChange(ev) {
    onChangeInner(ev.target.checked);
  }
  // expose managed state as return value
  return { onChange, isChecked };
}
