<template>
  <header class="cv-header bx--header" data-header>
    <slot />
    <div v-if="hasGlobalHeader" class="bx--header__global">
      <slot name="header-global" />
    </div>
    <slot name="left-panels" />
    <slot name="right-panels" />
  </header>
</template>

<script>
export default {
  name: 'CvHeader',
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:panel-control-mounted', this.onCvPanelControlMounted);
    this.$on('cv:panel-control-beforeDestroy', this.onCvPanelControlBeforeDestroy);
    this.$on('cv:panel-control-toggle', this.onCvPanelControlToggle);
    this.$on('cv:panel-control-focusout', this.onCvPanelControlFocusout);
    this.$on('cv:panel-mounted', this.onCvPanelMounted);
    this.$on('cv:panel-beforeDestroy', this.onCvPanelBeforeDestroy);
    this.$on('cv:panel-focusout', this.onCvPanelFocusout);
  },
  data() {
    return {
      panelControllers: [],
      panels: [],
      hasGlobalHeader: false,
    };
  },
  mounted() {
    // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
    this.hasGlobalHeader = !!this.$slots['header-global'];
  },
  beforeUpdate() {
    this.hasGlobalHeader = !!this.$slots['header-global'];
  },
  computed: {
    isCvHeader() {
      return true;
    },
  },
  methods: {
    hasRail(_ctrl, _panel) {
      let panel = _panel;
      let ctrl = _ctrl;
      if (ctrl) {
        panel = this.panels.find(item => item.id === ctrl.ariaControls);
      } else {
        if (panel) {
          ctrl = this.panelControllers.find(item => item.ariaControls === panel.id);
        }
      }
      if (ctrl) {
        ctrl.hasRail = !!(panel && ctrl) && panel.rail;
      }
    },
    onCvPanelControlMounted(srcComponent) {
      this.panelControllers.push(srcComponent);
      this.hasRail(srcComponent);
    },
    onCvPanelControlBeforeDestroy(srcComponent) {
      const index = this.panelControllers.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panelControllers.splice(index, 1);
      }
    },
    onCvPanelControlToggle(srcComponent, force) {
      const foundIndex = this.panels.findIndex(item => item.id === srcComponent.ariaControls);
      if (foundIndex > -1) {
        const newValue = force !== undefined ? force : !srcComponent.panelExpanded;

        for (let index in this.panels) {
          this.panels[index].panelExpanded = false;
        }
        for (let index in this.panelControllers) {
          this.panelControllers[index].panelExpanded = false;
        }

        srcComponent.panelExpanded = newValue;
        this.panels[foundIndex].panelExpanded = newValue;
      }
    },
    onCvPanelControlFocusout(srcComponent, srcEvent) {
      const found = this.panels.find(item => item.id === srcComponent.ariaControls);

      if (found && !found.rail && found.$el !== srcEvent.relatedTarget && !found.$el.contains(srcEvent.relatedTarget)) {
        // close when not a rail
        this.onCvPanelControlToggle(srcComponent, false);
      }
    },
    onCvPanelMounted(srcComponent) {
      this.panels.push(srcComponent);
      srcComponent.headerEmbedded = true;
      this.hasRail(undefined, srcComponent);
    },
    onCvPanelBeforeDestroy(srcComponent) {
      const index = this.panels.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panels.splice(index, 1);
      }
    },
    onCvPanelFocusout(srcComponent, srcEvent) {
      const found = this.panelControllers.find(item => item.ariaControls === srcComponent.id);
      if (
        srcComponent.$el !== srcEvent.relatedTarget &&
        !srcComponent.$el.contains(srcEvent.relatedTarget) &&
        found &&
        found.$el !== srcEvent.relatedTarget
      ) {
        this.onCvPanelControlToggle(found, false);
      }
    },
  },
};
</script>
