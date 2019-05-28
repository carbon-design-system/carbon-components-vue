<template>
  <main>
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'SvView',
  created() {
    // document.body.classList.add('carbon');
    // document.body.classList.remove('experimental');
  },
};
</script>
