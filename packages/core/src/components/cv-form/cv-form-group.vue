<template>
  <fieldset :class="`cv-form-group ${carbonPrefix}--fieldset`">
    <legend :class="`${carbonPrefix}--label`">
      <slot name="label"></slot>
    </legend>
    <slot name="content"></slot>
  </fieldset>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvFormGroup',
  mixins: [carbonPrefixMixin],
};
</script>
