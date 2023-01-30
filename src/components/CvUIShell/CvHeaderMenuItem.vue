<template>
  <li class="cv-header-menu-item" :role="role">
    <component
      :is="tagType"
      v-bind="{ ...$attrs, ...linkProps }"
      :class="[
        `${carbonPrefix}--header__menu-item`,
        { [`${carbonPrefix}--header__menu-item--current`]: activePage },
      ]"
      role="menuitem"
      :aria-current="ariaCurrent"
    >
      <span :class="`${carbonPrefix}--text-truncate--end`">
        <slot />
      </span>
    </component>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';
import { computed } from 'vue';

const props = defineProps({
  active: Boolean,
  ariaCurrent: String,
  role: String,
  ...propsLink,
});

const tagType = useTagType(props);
const linkProps = useLinkProps(props);

const activePage = computed(() => {
  return props.active && props.ariaCurrent !== 'page';
});
</script>
