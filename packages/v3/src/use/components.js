import { reactivePick } from '@vueuse/core';
import { computed } from 'vue';

/**
 * Picks subcomponent props from super component props based on a subcomponent map
 * @param props Reactive super component props
 * @param subComponents Map of kind name to component
 * @param kindKey key under which to find the current kind name in props
 */
export const useSubComponentProps = (props, subComponents, kindKey = 'kind') =>
  computed(() =>
    reactivePick(props, ...Object.keys(subComponents[props[kindKey]].props))
  );

/**
 * Reactive subcomponent and sub props
 * @param props Reactive super component props
 * @param subComponents Map of kind name to component
 * @param kindKey key under which to find the current kind name in props
 */
export const useSubComponent = (props, subComponents, kindKey = 'kind') => ({
  component: computed(() => subComponents[props[kindKey]]),
  subProps: useSubComponentProps(props, subComponents, kindKey),
});
