const options = ['light'];

export default {
  props: {
    theme: {
      type: String,
      default: '',
      validator: value => value.length === 0 || options.includes(value),
    },
  },
};
