<template>
  <form class="demo-container">
    <fieldset>
      <legend>V-Model demonstration (not part of component)</legend>
      <br />
      <slot />
    </fieldset>
  </form>
</template>

<style lang="scss">
@import '~carbon-components/scss/globals/scss/vars';

.demo-container {
  margin-top: $spacing-09;
  padding: $spacing-05;
  border: 1px solid $text-01;
}
</style>
