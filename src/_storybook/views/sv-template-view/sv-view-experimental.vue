<template>
  <main>
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'SvViewExperimental',
  created() {
    document.body.classList.remove('carbon');
    document.body.classList.add('experimental');
  },
};
</script>

<style lang="scss">
$feature-flags: (
  components-x: true,
  ui-shell: false,
);

@import './sv-view';
</style>
