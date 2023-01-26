<template>
  <component
    :is="tagType"
    v-bind="linkProps"
    :class="[
      `cv-switcher-item-link`,
      `${carbonPrefix}--switcher__item-link`,
      { [`${carbonPrefix}--switcher__item-link--selected`]: selected },
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';

const props = defineProps({
  selected: Boolean,
  ...propsLink,
});

const tagType = useTagType(props);
const linkProps = useLinkProps(props);
</script>
