<template>
  <nav data-tabs class="cv-tabs bx--tabs" role="navigation" v-on="$listeners">
    <div class="bx--tabs-trigger" tabindex="0">
      <a href="javascript:void(0)" class="bx--tabs-trigger-text" tabindex="-1"></a>
      <svg width="10" height="5" viewBox="0 0 10 5">
        <path d="M0 0l5 4.998L10 0z" fill-rule="evenodd"></path>
      </svg>
    </div>
    <ul class="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
      <slot>
        <!-- cv-tabs-button's go here -->
      </slot>
    </ul>
  </nav>
</template>

<script>
import { Tab } from 'carbon-components';

export default {
  name: 'CvTabs',
  mounted() {
    this.carbonComponent = Tab.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
