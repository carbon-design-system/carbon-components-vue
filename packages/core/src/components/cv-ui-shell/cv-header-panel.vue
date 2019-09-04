<template>
  <div
    class="cv-header-panel bx--header-panel"
    :class="{ 'bx--header-panel--expanded': panelExpanded }"
    :aria-hidden="!panelExpanded"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CvHeaderPanel',
  props: {
    expanded: Boolean,
    id: { type: String, required: true },
  },
  mounted() {
    this.$parent.$emit('cv:panel-mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:panel-beforeDestroy', this);
  },
  data() {
    return {
      dataExpanded: this.expanded,
    };
  },
  watch: {
    expanded() {
      this.panelExpanded = this.expanded;
    },
  },
  computed: {
    panelExpanded: {
      get() {
        return this.dataExpanded;
      },
      set(val) {
        this.dataExpanded = val;
        this.$parent.$emit('cv:panel-resize', this);
      },
    },
  },
  methods: {
    onFocusout(ev) {
      this.$parent.$emit('cv:panel-focusout', this, ev);
    },
    onMouseDown(ev) {
      if (this.$el === ev.target) {
        // ignore mousedown on panel can cause focus event
        ev.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss"></style>
