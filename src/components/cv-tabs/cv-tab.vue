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
      if (this.selected && 1) {
        this.$parent.$emit('cv:selected', this);
      }
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
    this.$_CvTab = true; // for use by parent with $children

    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
};
</script>

<style lang="scss"></style>
