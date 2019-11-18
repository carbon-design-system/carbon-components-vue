<template>
  <div class="cv-toggle bx--form-item">
    <label class="bx--toggle__label bx--skeleton" :for="uid" :aria-label="label ? 'Toggle is loading' : label">
      <span class="bx--toggle__label-text" />
      <span class="bx--toggle__text--left" />
      <span class="bx--toggle__appearance" />
      <span class="bx--toggle__text--right" />
    </label>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
export default {
  name: 'CvToggleSkeleton',
  mixins: [uidMixin],
  props: {
    label: { type: String, default: 'Toggle is loading' },
  },
};
</script>
