/*
 * Provides common checkbox behaviour
 */
import { unref, ref, computed, watch, onMounted } from 'vue';

export const props = {
  modelValue: { type: [Array, Boolean], default: undefined },
  mixed: { type: Boolean, default: null },
  checked: { type: Boolean, default: undefined },
  name: String,
  value: { type: String, required: true },
};

export function useCheck(props, emit) {
  const isArrayModel = computed(() => {
    return Array.isArray(props.modelValue.value);
  });

  // Maintain the state of the checkbox
  let dataChecked = ref(undefined);
  let isChecked = computed({
    get() {
      if (props.modelValue.value !== undefined) {
        // model value always comes first
        if (isArrayModel.value) {
          if (props.modelValue.value.includes(unref(props.value))) {
            return true;
          } else {
            return false;
          }
        } else {
          return unref(props.modelValue);
        }
      } else {
        if (dataChecked.value !== undefined) {
          return dataChecked.value;
        } else if (dataMixed.value) {
          return 'mixed';
        }
        return false;
      }
    },
    set(checked) {
      // eslint-disable-next-line no-console
      console.log('set checked', checked, unref(dataChecked));

      if (isArrayModel.value) {
        let modelSet = new Set(props.modelValue.value);

        if (!checked) {
          modelSet.delete(props.value.value);
        } else {
          modelSet.add(props.value.value);
        }
        dataChecked.value = Array.from(modelSet);
      } else {
        dataChecked.value = checked ? true : undefined;
        // eslint-disable-next-line no-console
        console.log('set checked', checked, unref(dataChecked));

        if (dataChecked.value !== undefined) {
          dataMixed.value = false;
        }
      }
    },
  });
  onMounted(() => {
    if (props.modelValue.value === undefined) {
      isChecked.value = props.checked.value;
    }
  });

  // Maintain the state of the aria-checkbox
  let dataMixed = ref(props.mixed.value);
  watch(props.mixed, val => {
    dataMixed.value = val;
    if (dataMixed.value && props.checked.value !== true) {
      isChecked.value = false; // reset check state so mixed takes
    }
  });

  watch(props.checked, val => {
    if (props.modelValue.value === undefined) isChecked.value = val;
    if (!val && dataMixed.value) {
      dataMixed.value = true;
    }
  });

  // Watch for change
  function onChangeInner(checkedVal) {
    // eslint-disable-next-line no-console
    console.log('checked', checkedVal, dataChecked.value || false);
    isChecked.value = checkedVal;
    emit('update:modelValue', dataChecked.value || false); // or false in case dataChecked is undefined
    emit('change', checkedVal);
  }
  function onChange(ev) {
    onChangeInner(ev.target.checked);
  }
  // expose managed state as return value
  return { onChange, isChecked };
}
