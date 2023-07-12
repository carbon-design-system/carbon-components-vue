import { onBeforeMount, onBeforeUpdate, ref, useSlots } from 'vue';
import { useIsLight } from './cvTheme';

export const useCvInputHelpers = props => {
  const slots = useSlots();
  const isInvalid = ref(false);
  const isWarn = ref(false);
  const isHelper = ref(false);
  const isLight = useIsLight(props);

  function checkSlots() {
    // NOTE: slots is not reactive so needs to be managed on updated
    isInvalid.value = !!(
      props.invalidMessage?.length || slots['invalid-message']
    );
    isWarn.value =
      !isInvalid.value && !!(props.warnText?.length || slots['warn-text']);
    isHelper.value =
      !isInvalid.value &&
      !isWarn.value &&
      !!(props.helperText?.length || slots['helper-text']);
  }

  onBeforeMount(checkSlots);
  onBeforeUpdate(checkSlots);

  return {
    slots,
    isInvalid,
    isWarn,
    isHelper,
    isLight,
  };
};
