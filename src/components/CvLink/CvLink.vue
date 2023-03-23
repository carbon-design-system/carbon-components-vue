<template>
  <component
    :is="tagType"
    v-bind="linkProps"
    class="cv-link"
    :class="[
      `${carbonPrefix}--link`,
      {
        [`${carbonPrefix}--link--disabled`]: disabled,
        [`${carbonPrefix}--link--inline`]: inline,
        [`${carbonPrefix}--link--visited`]: visited,
      },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import {
  props as linkPropsDefinition,
  useLinkProps,
  useTagType,
} from '../../use/cvLink';

const props = defineProps({
  inline: Boolean,
  visited: Boolean,
  ...linkPropsDefinition,
});
const linkProps = useLinkProps(props);
const tagType = useTagType(props);
</script>
