<template>
  <span class="cv-tag bx--tag" :class="`bx--tag--${kind}`">{{ label }}</span>
</template>

<script>
export default {
  name: 'CvTag',
  props: {
    label: { type: String, required: true },
    kind: {
      type: String,
      default: 'ibm',
      validator(val) {
        return [
          'ibm',
          'beta',
          'third-party',
          'local',
          'dedicated',
          'custom',
          'experimental',
          'community',
          'private',
          'deprecated',
        ].includes(val);
      },
    },
  },
};
</script>

<style lang="scss"></style>
