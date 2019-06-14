<template>
  <div
    class="cv-header-panel bx--header-panel"
    :class="{ 'bx--header-panel--expanded': internalExpanded }"
    :aria-hidden="!internalExpanded"
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
      this.dataExpanded = this.expanded;
      this.$parent.$emit('cv:panel-resize', this);
    },
  },
  computed: {
    internalExpanded: {
      get() {
        return this.dataExpanded;
      },
      set(val) {
        // Do not emit cv:panel-resize
        this.dataExpanded = val;
      },
    },
  },
  methods: {
    onFocusout(ev) {
      this.$parent.$emit('cv:panel-focusout', this, ev);
    },
    onMouseDown(ev) {
      if (this.$el.contains(ev.target)) {
        ev.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss"></style>
