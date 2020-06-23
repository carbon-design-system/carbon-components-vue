<template>
  <form class="cv-form bx--form" v-on="$listeners">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'CvForm',
};
</script>
