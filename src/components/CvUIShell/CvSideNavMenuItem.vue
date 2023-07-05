<template>
  <li :class="`${carbonPrefix}--side-nav__menu-item`">
    <component
      :is="tagType"
      :class="[
        `${carbonPrefix}--side-nav__link`,
        { [`${carbonPrefix}--side-nav__link--current`]: active },
      ]"
      v-bind="{ ...$attrs, ...linkProps }"
      role="menuitem"
    >
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';
import CvSideNavLinkText from './_CvSideNavLinkText.vue';

const props = defineProps({
  active: Boolean,
  ...propsLink,
});

const tagType = useTagType(props);
const linkProps = useLinkProps(props);
</script>
