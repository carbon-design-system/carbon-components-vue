<template>
  <nav
    class="cv-side-nav bx--side-nav bx--side-nav__navigation"
    :class="{
      'bx--side-nav--expanded': internalExpanded,
      'bx--side-nav--collapsed': !internalExpanded && fixed,
      'bx--side-nav--ux': isChildOfHeader,
    }"
    :aria-hidden="!internalExpanded && !fixed"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
  >
    <slot></slot>
    <cv-side-nav-footer
      v-if="!fixed"
      :expanded="internalExpanded"
      :assistiveText="assistiveToggleText"
      @toggle-expand="toggleExpand"
    />
  </nav>
</template>

<script>
import CvSideNavFooter from './_cv-side-nav-footer';

export default {
  name: 'CvSideNav',
  components: { CvSideNavFooter },
  props: {
    expanded: Boolean,
    fixed: Boolean,
    id: { type: String, required: true },
    assistiveToggleText: String,
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
    isChildOfHeader() {
      return this.$parent.isCvHeader;
    },
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
    toggleExpand() {
      this.dataExpanded = !this.dataExpanded;
    },
  },
};
</script>

<style lang="scss"></style>
