<template>
  <svg class="cv-icon">
    <title v-if="title">{{ title }}</title>
    <use v-bind:xlink:href="iconHref" />
  </svg>
</template>

<script>
const spritePath = require('../../assets/images/component-icons.svg');

export default {
  name: 'CvIcon',
  props: {
    href: {
      type: String,
      required: true,
    },
    title: { type: String, default: undefined },
  },
  computed: {
    iconHref() {
      // syntax used to load a knwon icon
      if (this.href.toLowerCase().startsWith('cv(')) {
        return `${spritePath}#${this.href.substring(3, this.href.length - 1)}`;
      }
      return this.href;
    },
  },
};
</script>
