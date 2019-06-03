<template>
  <header class="cv-header bx--header" role="banner" data-header>
    <slot />
    <div v-if="$slots['header-global']" class="bx--header__global">
      <slot name="header-global" />
    </div>
    <slot name="right-panels" />
  </header>
</template>

<script>
export default {
  name: 'CvHeader',
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:global-action-mounted', srcComponent => this.onCvGAMounted(srcComponent));
    this.$on('cv:global-action-beforeDestroy', srcComponent => this.onCvGABeforeDestroy(srcComponent));
    this.$on('cv:global-action-toggle', srcComponent => this.onCvGAToggle(srcComponent));
    this.$on('cv:global-action-blur', srcComponent => this.onCvGABlur(srcComponent));
    this.$on('cv:panel-mounted', srcComponent => this.onCvPanelMounted(srcComponent));
    this.$on('cv:panel-beforeDestroy', srcComponent => this.onCvPanelBeforeDestroy(srcComponent));
    this.$on('cv:panel-blur', srcComponent => this.onCvPanelBlur(srcComponent));
  },
  mounted() {
    console.warn(
      `${
        this.$vnode.componentOptions.Ctor.extendOptions.name
      } - Under review. This component isn't quite ready. Hopefully no features will get broken but this cannot be guarenteed.`
    );
  },
  data() {
    return {
      panelControllers: [],
      panels: [],
    };
  },
  methods: {
    onCvGAMounted(srcComponent) {
      this.panelControllers.push(srcComponent);
    },
    onCvGABeforeDestroy(srcComponent) {
      const index = this.panelControllers.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panelControllers.splice(index, 1);
      }
    },
    onCvGAToggle(srcComponent) {
      const foundIndex = this.panels.findIndex(item => item.id === srcComponent.ariaControls);
      if (foundIndex > -1) {
        const newValue = !srcComponent.internalActive;

        for (let index in this.panels) {
          this.panels[index].internalExpanded = false;
        }
        for (let index in this.panelControllers) {
          this.panelControllers[index].internalActive = false;
        }

        srcComponent.internalActive = newValue;
        this.panels[foundIndex].internalExpanded = newValue;
      }
    },
    onCvGABlur(srcComponent) {
      console.dir(srcComponent);
    },
    onCvPanelMounted(srcComponent) {
      this.panels.push(srcComponent);
    },
    onCvPanelBeforeDestroy(srcComponent) {
      const index = this.panels.findIndex(item => item.id === srcComponent.id);
      if (index > -1) {
        this.panels.splice(index, 1);
      }
    },
    onCvPanelBlur(srcComponent) {
      console.dir(srcComponent);
    },
  },
};
</script>
