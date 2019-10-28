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
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvButton: iconHref deprecated in favour of icon to be removed in future versions.');
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
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvButton: small deprecated in favour of size.');
        }
        return true;
      },
    },
    size: { type: String, default: undefined, validator: val => ['', 'field', 'small'].includes(val) },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        click: event => this.$emit('click', event),
      });
    },
  },
};
