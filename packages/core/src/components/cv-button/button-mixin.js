export default {
  props: {
    icon: {
      type: [String, Object],
      default: undefined,
      validator(val) {
        if (!val || typeof val === 'string') {
          return true;
        }
        return val.render !== null;
      },
    },
    iconHref: {
      type: String,
      default: undefined,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (val !== undefined) {
            console.warn('CvButton: iconHref deprecated in favour of icon to be removed in future versions.');
          }
        }
        return true;
      },
    },
    kind: {
      type: String,
      default: 'primary',
      validator: val => ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger--primary'].includes(val),
    },
    small: {
      type: Boolean,
      default: false,
      validator(val) {
        if (process.env.NODE_ENV === 'development') {
          if (val !== undefined) {
            console.warn('CvButton: small deprecated in favour of size.');
          }
        }
        return true;
      },
    },
    size: { type: String, default: undefined, validator: val => ['', 'field', 'small'].includes(val) },
  },
};
