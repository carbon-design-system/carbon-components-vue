<template>
  <nav :class="`cv-header-nav ${carbonPrefix}--header__nav`">
    <ul :class="`${carbonPrefix}--header__menu-bar`" role="menubar" :ariaLabeldBy="ariaLabelledBy">
      <slot />
    </ul>
  </nav>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvHeaderNav',
  mixins: [carbonPrefixMixin],
  props: {
    ariaLabelledBy: String,
  },
};
</script>
