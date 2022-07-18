/*
 * This component optionally wraps slotted content with the specified tag-type.
 *
 * If no tag-type is supplied then the slotted content is unwrapped.
 *
 *  Unwrapped slots do not receive class, style or attributes attached to the wrapper
 */
import { h, useSlots, useAttrs } from 'vue';

export default {
  name: 'CvWrapper',
  props: {
    tagType: { type: String, default: undefined },
  },
  setup(props) {
    const slots = useSlots();
    const attrs = useAttrs();
    return () => {
      if (props.tagType) return h(props.tagType, { ...attrs }, slots.default());
      else return slots.default();
    };
  },
};
