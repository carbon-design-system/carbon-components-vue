<template>
  <nav
    class="cv-side-nav bx--side-nav bx--side-nav__navigation"
    :class="{
      'bx--side-nav--expanded': panelExpanded,
      'bx--side-nav--rail': rail,
      'bx--side-nav--collapsed': !panelExpanded && fixed,
      'bx--side-nav--ux': isChildOfHeader,
    }"
    :aria-hidden="!panelExpanded && !fixed"
    :id="id"
    @focusout="onFocusout"
    @mousedown="onMouseDown"
  >
    <slot></slot>
    <cv-side-nav-footer
      v-if="!fixed && !rail && !headerEmbedded"
      :expanded="panelExpanded"
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
    rail: Boolean,
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
      headerEmbedded: false,
    };
  },
  watch: {
    expanded() {
      this.panelExpanded = this.expanded;
    },
  },
  computed: {
    isChildOfHeader() {
      return this.$parent.isCvHeader;
    },
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
    toggleExpand() {
      this.panelExpanded = !this.dataExpanded;
    },
  },
  model: {
    event: 'modelEvent',
    prop: 'expanded',
  },
};
</script>
