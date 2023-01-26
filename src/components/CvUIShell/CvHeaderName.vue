<template>
  <component
    :is="tagType"
    v-bind="linkProps"
    :class="`cv-header-name ${carbonPrefix}--header__name`"
  >
    <span v-if="prefix" :class="`${carbonPrefix}--header__name--prefix`"
      >{{ prefix }}&nbsp;</span
    >
    <slot />
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';

const props = defineProps({
  prefix: String,
  ...propsLink,
});

const tagType = useTagType(props);
const linkProps = useLinkProps(props);
</script>
