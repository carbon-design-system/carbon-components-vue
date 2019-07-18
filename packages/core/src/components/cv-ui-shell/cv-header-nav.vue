<template>
  <nav class="cv-header-nav bx--header__nav">
    <ul class="bx--header__menu-bar" role="menubar" :ariaLabeldBy="ariaLabelledBy">
      <slot />
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'CvHeaderNav',
  props: {
    ariaLabelledBy: String,
  },
};
</script>
