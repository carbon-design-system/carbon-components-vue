<template>
  <div
    class="cv-tabs-panel"
    :id="id"
    role="tabpanel"
    :aria-labelledby="tabsButtonId"
    :aria-hidden="!selected"
    :hidden="!selected"
  >
    <slot>
      <!-- Content for first tab goes here. -->
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CvTabsPanel',
  props: {
    id: { type: String, required: true },
    selected: Boolean,
    tabsButtonId: { type: String, requried: true },
  },
};
</script>

<style lang="scss">
</style>
