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
      validator: val => ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger--primary'].includes(val),
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
    buttonClassOpts() {
      return (opts = {}) => {
        let classes = [`${carbonSettings.prefix}--btn`];

        if (opts.skeleton) {
          classes.push(`${carbonSettings.prefix}--skeleton`);
        }

        if (opts.iconOnly) {
          classes.push(`${carbonSettings.prefix}--btn--icon-only`);
        }

        if (this.kind && !opts.skeleton) {
          classes.push(`${carbonSettings.prefix}--btn--${this.kind.toLowerCase()}`);
        }

        if (this.size === 'small' || (this.size === undefined && this.small)) {
          classes.push(`${carbonSettings.prefix}--btn--sm`);
        }
        if (this.size === 'field') {
          classes.push(`${carbonSettings.prefix}--btn--field`);
        }

        return classes.join(' ');
      };
    },
  },
};
