const kinds = ['error', 'warning', 'info', 'success'];

export default {
  props: {
    kind: {
      type: String,
      required: true,
      validator: value => kinds.includes(value),
    },
    title: String,
    subTitle: String,
  },
  computed: {
    isAlert() {
      return kinds.indexOf(this.kind) < 2;
    },
  },
};
