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
        [`${carbonPrefix}--link--${size}`]: size,
      },
    ]"
  >
    <slot></slot>
    <CvSvg v-if="icon" :class="`${carbonPrefix}--link__icon`" :svg="icon" />
  </component>
</template>

<script setup>
import CvSvg from '../CvSvg/_CvSvg.vue';
import { carbonPrefix } from '../../global/settings';
import {
  props as linkPropsDefinition,
  useLinkProps,
  useTagType,
} from '../../use/cvLink';

const props = defineProps({
  icon: { type: [String, Object] },
  inline: Boolean,
  visited: Boolean,
  ...linkPropsDefinition,
});
const linkProps = useLinkProps(props);
const tagType = useTagType(props);
</script>
