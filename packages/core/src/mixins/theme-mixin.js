const options = ['light'];

export default {
  props: {
    light: Boolean,
    theme: {
      type: String,
      default: undefined,
      validator: value => {
        if (value !== undefined && process.env.NODE_ENV === 'development') {
          console.warn(`theme='light' deprecated in favour of boolean light property.`);
        }

        return value.length === 0 || options.includes(value);
      },
    },
  },
  computed: {
    isLight() {
      return this.light || this.theme === 'light';
    },
  },
};
