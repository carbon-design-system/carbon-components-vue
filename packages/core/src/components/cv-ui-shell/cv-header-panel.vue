<template>
  <div
    class="cv-header-panel bx--header-panel"
    :class="{ 'bx--header-panel--expanded': panelExpanded }"
    :aria-hidden="!panelExpanded"
    :id="id"
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
  model: {
    event: 'modelEvent',
    prop: 'expanded',
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
        if (this.dataExpanded !== val) {
          this.dataExpanded = val;
          this.$emit('modelEvent', val);
          this.$emit('panel-resize', this);
        }
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
