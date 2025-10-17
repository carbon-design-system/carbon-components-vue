<template>
  <li class="cv-header-menu-item" role="none">
    <component
      :is="tagType"
      v-bind="{ ...$attrs, ...linkProps }"
      :class="[
        `${carbonPrefix}--header__menu-item`,
        { [`${carbonPrefix}--header__menu-item--current`]: activePage },
      ]"
      :aria-current="ariaCurrent"
      :role="role"
      :tabindex="tabindex"
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
  ariaCurrent: { type: String, default: undefined },
  role: { type: String, default: 'menuitem' },
  ...propsLink,
});

const tagType = useTagType(props);
const linkProps = useLinkProps(props);

const activePage = computed(() => {
  return props.active && props.ariaCurrent !== 'page';
});

const tabindex = computed(() => {
  return props.role === 'menuitem' ? '0' : undefined;
});
</script>
