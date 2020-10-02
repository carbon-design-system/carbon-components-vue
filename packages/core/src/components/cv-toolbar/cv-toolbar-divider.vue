<template>
  <hr :class="`cv-toolbar-divider ${carbonPrefix}--toolbar-menu__divider`" />
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
export default {
  name: 'CvToolbarDivider',
  mixins: [carbonPrefixMixin],
};
</script>
