/*
 * Provides common "light" property. Let's continue to support the deprecated "theme" property as well
 */
import { computed } from 'vue';

const options = ['light', ''];
export const props = {
  light: { type: Boolean, default: false },
  theme: {
    type: String,
    default: '',
    validator: value => {
      if (value && process.env.NODE_ENV === 'development') {
        console.warn(
          `theme='light' deprecated in favour of boolean light property.`
        );
      }

      return options.includes(value);
    },
  },
};

export const useIsLight = props => {
  const isLight = computed(() => {
    return props.light || props.theme === 'light';
  });

  return isLight;
};
