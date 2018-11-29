<template>
  <fieldset class="bx--fieldset">
    <legend class="bx--label">
      <slot name="label">

      </slot>
    </legend>
    <slot name="content">

    </slot>
  </fieldset>
</template>

<script>
export default {
  name: 'CvFormGroup',
};
</script>

<style lang="scss">
</style>
