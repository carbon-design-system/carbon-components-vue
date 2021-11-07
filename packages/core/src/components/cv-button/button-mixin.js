import { settings as carbonSettings } from 'carbon-components';

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
      validator: val =>
        ['', 'primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger--ghost', 'danger--tertiary'].includes(val),
    },
    small: {
      type: Boolean,
      default: undefined,
      validator(val) {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvButton: small deprecated in favour of size.');
        }
        return true;
      },
    },
    size: {
      type: String,
      default: undefined,
      validator: val => ['', 'default', 'field', 'small', 'sm', 'lg', 'xl'].includes(val),
    },
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
    buttonClassOpts() {
      return (opts = {}) => {
        const classes = [`${carbonSettings.prefix}--btn`];
        const lowerCaseKind = this.kind.toLowerCase();

        if (opts.skeleton) {
          classes.push(`${carbonSettings.prefix}--skeleton`);
        }

        if (opts.iconOnly) {
          classes.push(`${carbonSettings.prefix}--btn--icon-only`);
          if (this.selected && lowerCaseKind === 'ghost') {
            classes.push(`${carbonSettings.prefix}--btn--selected`);
          }
        }

        if (this.kind && !opts.skeleton) {
          classes.push(`${carbonSettings.prefix}--btn--${lowerCaseKind}`);
        }

        let size = this.size ? this.size : this.small && 'sm';
        if (size === 'small') {
          size = 'sm';
        }
        if (size && !(size === '' || size === 'default')) {
          classes.push(`${carbonSettings.prefix}--btn--${size}`);
        }

        return classes;
      };
    },
  },
};
