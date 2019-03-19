<template>
  <li class="cv-toolbar-option bx--toolbar-menu__option" @keydown.esc.prevent="$parent.$emit('cv:close')">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'CvToolbarOption',
};
</script>
