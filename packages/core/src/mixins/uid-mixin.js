const idGen = {
  newId() {
    return `uid-${ crypto.randomUUID() }`;
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
