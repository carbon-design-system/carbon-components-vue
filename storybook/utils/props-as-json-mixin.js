export default {
  // requires managedProps to be defined
  data() {
    return { propsJSON: '' };
  },
  mounted() {
    this.propsJSON = this.propsAsJSON();
  },
  updated() {
    this.propsJSON = this.propsAsJSON();
  },
  methods: {
    propsAsJSON() {
      const output = {};
      const keys = Object.keys(this.$props).filter(
        key => this.extractedProps[key] !== null && !/((prop)|(slot))[A-Z]/.test(key)
      );
      keys.concat(...Object.keys(this.mappedProps));
      const sorted = keys.sort();

      for (let i = 0; i < sorted.length; i++) {
        const prop = sorted[i];
        output[prop] = this.mappedProps[prop]?.() ?? this.$props[prop];
      }
      return JSON.stringify(output, null, 2);
    },
  },
};
