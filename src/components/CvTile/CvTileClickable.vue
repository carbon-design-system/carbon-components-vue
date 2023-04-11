<template>
  <component
    :is="tagType"
    ref="target"
    data-tile="clickable"
    :class="`cv-tile-clickable ${carbonPrefix}--tile--clickable`"
    v-bind="{ ...$attrs, ...linkProps }"
    tabindex="0"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsLink, useLinkProps, useTagType } from '../../use/cvLink';

const props = defineProps({
  ...propsLink,
});
const tagType = useTagType(props);
const linkProps = useLinkProps(props);
</script>
