<template>
  <svg class="cv-icon">
    <use v-bind:xlink:href="iconHref"></use>
  </svg>
</template>

<script>
const spritePath = require('carbon-icons/dist/carbon-icons.svg');

export default {
  name: 'CvIcon',
  props: {
    href: { type: String, required: true },
  },
  beforeCreate() {
    console.warn(
      `${
        this.$options._componentTag
      }: may be replaced by carbon resource library`
    );
  },
  computed: {
    iconHref() {
      if (this.href.toLowerCase().startsWith('cv(')) {
        return `${spritePath}#${this.href.substring(3, this.href.length - 1)}`;
      }
      return this.href;
    },
  },
};
</script>
