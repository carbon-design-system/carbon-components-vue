<template>
  <li
    class="cv-tabs-button bx--tabs__nav-item"
    :class="{'bx--tabs__nav-item--selected': selected}"
    :data-target="contentSelector"
    role="presentation"
  >
    <a
      class="bx--tabs__nav-link"
      href="javascript:void(0)"
      role="tab"
      :aria-controls="tabsPanelId"
      aria-selected="false"
    >
      <slot>
        <!-- tabs button content -->
      </slot>
    </a>
  </li>
</template>

<script>
export default {
  name: 'CvTabsButton',
  props: {
    contentSelector: { type: String, required: true },
    id: { type: String, required: true },
    selected: Boolean,
    tabsPanelId: { type: String, required: true },
  },
};
</script>

<style lang="scss">
</style>
