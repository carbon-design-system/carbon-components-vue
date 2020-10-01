const methodsMixin = methodDefs => {
  const methods = {};
  const keys = Object.keys(methodDefs);

  for (let key of keys) {
    for (let method of methodDefs[key]) {
      methods[method] = function(...args) {
        this.$refs[key][method](...args);
      };
    }
  }

  return {
    methods: methods,
  };
};

export default methodsMixin;
