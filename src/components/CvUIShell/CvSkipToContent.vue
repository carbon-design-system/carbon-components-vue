<template>
  <component
    :is="tagType"
    v-bind="linkProps"
    :class="`cv-skip-to-content ${carbonPrefix}--skip-to-content`"
  >
    <slot>Skip to main content</slot>
  </component>
</template>

<script setup>
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';
import { carbonPrefix } from '../../global/settings';

const props = defineProps({
  ...propsLink,
});
const tagType = useTagType(props);
const linkProps = useLinkProps(props);
</script>
