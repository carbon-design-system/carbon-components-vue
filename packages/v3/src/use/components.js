import { reactivePick } from '@vueuse/core';
import { computed } from 'vue';

/**
 * Picks subcomponent props from super component props based on a subcomponent map
 * @param props Reactive super component props
 * @param subcomponents Map of kind name to component
 * @param kindKey key under which to find the current kind name in props
 */
export const useSubcomponentProps = (props, subcomponents, kindKey = 'kind') =>
  computed(() =>
    reactivePick(props, Object.keys(subcomponents[props[kindKey]].props))
  );

/**
 * Reactive subcomponent and sub props
 * @param props Reactive super component props
 * @param subcomponents Map of kind name to component
 * @param kindKey key under which to find the current kind name in props
 */
export const useSubcomponent = (props, subcomponents, kindKey = 'kind') => ({
  component: computed(() => subcomponents[props[kindKey]]),
  subProps: reactivePick(
    props,
    ...Object.keys(subcomponents[props[kindKey]].props)
  ),
});
