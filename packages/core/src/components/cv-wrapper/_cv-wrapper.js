/*
 * This component optionally wraps slotted content with the specified tag-type.
 *
 * If no tag-type is supplied then the slotted content is unwrapped.
 *
 *  Unwrapped slots do not recieve class, style or attributes attached to the wrapper
 *
 * NOTE: render functions cannot return a multi root node, so unwrapped the default slot can have only one root node.
 *
 */
export default {
  name: 'CvWrapper',
  functional: true,
  props: {
    tagType: { type: String, default: null },
  },
  render(createElement, context) {
    if (context.props.tagType) {
      return createElement(
        context.props.tagType,
        {
          attrs: context.data.attrs,
          class: `${context.data.class || ''} ${context.data.staticClass || ''}`.trim(),
          style: { ...context.data.staticStyle, ...context.data.style },
          on: context.listeners,
        },
        context.slots().default
      );
    } else {
      return context.slots().default;
    }
  },
};
