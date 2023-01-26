<template>
  <li :class="`${carbonPrefix}--side-nav__item`">
    <component
      :is="tagType"
      :class="[
        'cv-side-nav-item-link',
        `${carbonPrefix}--side-nav__link`,
        { [`${carbonPrefix}--side-nav__link--current`]: active },
      ]"
      v-bind="{ ...$attrs, ...linkProps }"
    >
      <cv-side-nav-icon v-if="data.hasNavIcon" small>
        <slot name="nav-icon" />
      </cv-side-nav-icon>
      <cv-side-nav-link-text>
        <slot />
      </cv-side-nav-link-text>
    </component>
  </li>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { useTagType, useLinkProps, props as propsLink } from '../../use/cvLink';
import CvSideNavIcon from './CvSideNavIcon.vue';
import CvSideNavLinkText from './_CvSideNavLinkText.vue';
import { onMounted, onUpdated, reactive, useSlots } from 'vue';

const props = defineProps({
  active: Boolean,
  icon: Object,
  ...propsLink,
});
const tagType = useTagType(props);
const linkProps = useLinkProps(props);

const data = reactive({
  hasNavIcon: false,
});

const slots = useSlots();
onMounted(checkSlots);
onUpdated(checkSlots);
function checkSlots() {
  data.hasNavIcon = !!slots['nav-icon'];
}
</script>
