import { ref } from 'vue';

export const useMethods = methodDefs => {
  const methods = ref({});

  const keys = Object.keys(methodDefs);
  for (let key of keys) {
    for (let method of methodDefs[key]) {
      methods.value[method] = (...args) => {
        methods.value.$refs[key][method](...args);
      };
    }
  }

  return {
    methods,
  };
};
