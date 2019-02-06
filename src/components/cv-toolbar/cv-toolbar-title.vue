<template>
  <li class="cv-toolbar-title bx--toolbar-menu__title">{{ title }}</li>
</template>

<script>
export default {
  name: 'CvToolbarTitle',
  props: {
    title: { type: String, required: true },
  },
};
</script>
