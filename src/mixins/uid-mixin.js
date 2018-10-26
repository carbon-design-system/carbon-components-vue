const idGen = {
  lastId: 0,
  newId() {
    this.lastId++;
    return `uid-${this.lastId}`;
  },
};

// define a mixin object
export default {
  props: {
    id: { type: String, default: null },
  },
  computed: {
    uid() {
      return this.id && this.id.length ? this.id : idGen.newId();
    },
  },
};
