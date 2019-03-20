<template>
  <div v-show="isVisible" class="cv-content-switcher-content">
    <slot></slot>
  </div>
</template>

<script>
import store from './cv-content-switcher-store';

export default {
  name: 'CvContentSwitcherContent',
  props: {
    ownerId: { type: String, required: true },
  },
  data() {
    return {
      store: store,
    };
  },
  computed: {
    isVisible() {
      return this.store.getState(this.ownerId);
    },
  },
};
</script>
