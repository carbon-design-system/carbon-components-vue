<template>
  <div
    class="cv-tabs-panel"
    :id="id"
    role="tabpanel"
    :aria-labelledby="`${id}-link`"
    :aria-hidden="!dataSelected"
    :hidden="!dataSelected"
  >
    <slot> <!-- Content for first tab goes here. --> </slot>
  </div>
</template>

<script>
export default {
  name: 'CvTabsPanel',
  props: {
    id: { type: String, required: true },
    selected: Boolean,
    label: { type: String, required: true },
  },
  data() {
    return {
      dataSelected: this.selected,
    };
  },
  watch: {
    selected() {
      this.$parent.selectById(this.id);
    },
  },
  computed: {
    internalSelected: {
      get() {
        return this.dataSelected;
      },
      set(val) {
        this.dataSelected = val;
      },
    },
  },
  mounted() {
    this.$parent.register(this);
  },
  beforeDestroy() {
    this.$parent.deregister(this);
  },
};
</script>

<style lang="scss"></style>
