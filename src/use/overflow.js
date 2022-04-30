import { ref, computed, onMounted } from 'vue';
import {
  useDebounceFn,
  useEventListener,
  useResizeObserver,
} from '@vueuse/core';

export const useElementHasOverflow = element => {
  const DEBOUNCE_TIME_IN_MS = 200;

  const clientWidth = ref(0);
  const scrollLeft = ref(0);
  const scrollWidth = ref(0);

  const updateStaticValues = () => {
    clientWidth.value = element.value.clientWidth;
    scrollWidth.value = element.value.scrollWidth;
  };
  const debouncedUpdateStaticValues = useDebounceFn(
    updateStaticValues,
    DEBOUNCE_TIME_IN_MS
  );

  onMounted(updateStaticValues);
  useResizeObserver(element, debouncedUpdateStaticValues);

  useEventListener(element, 'scroll', () => {
    scrollLeft.value = element.value.scrollLeft;
  });

  const hasOverflowLeft = computed(() => scrollLeft.value > 0);
  const hasOverflowRight = computed(
    () => clientWidth.value + scrollLeft.value !== scrollWidth.value
  );

  return { hasOverflowLeft, hasOverflowRight };
};
