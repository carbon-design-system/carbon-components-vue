/*
 * Provides common "link" properties.
 */
import { computed } from 'vue';

export const props = {
  disabled: Boolean,
  to: { type: [String, Object] },
  href: String,
};

export const useTagType = props => {
  const tagType = computed(() => {
    // if to is used and not href then user wanted a router-link
    return props.to && !props.href ? 'router-link' : 'a';
  });

  return tagType;
};

export const useLinkProps = props => {
  const linkProps = computed(() => {
    if (props.disabled) {
      return {
        'aria-disabled': true,
        role: 'link',
      };
    } else if (props.to && !props.href) {
      return { to: props.to };
    }
    return { href: props.href };
  });

  return linkProps;
};
