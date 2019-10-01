const idGen = {
  newId() {
    // as it is funny gen IDs using b - https://gist.github.com/jed/982883
    const b = a =>
      a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);

    return `uid-${b()}`;
  },
};

// define a mixin object
export default {
  props: {
    id: { type: String, default: undefined },
  },
  computed: {
    uid() {
      return this.id && this.id.length ? this.id : idGen.newId();
    },
  },
};
