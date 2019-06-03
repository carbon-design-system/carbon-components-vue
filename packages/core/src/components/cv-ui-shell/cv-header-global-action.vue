<template>
  <button
    v-on="$listeners"
    class="cv-header-global-action bx--header__action"
    :class="dataActive ? 'bx--header__action--active' : ''"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    :aria-expanded="active"
    @click="gaToggle"
    @blur="gaBlur"
  >
    <slot />
  </button>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvHeaderGlobalAction',
  mixins: [uidMixin],
  props: {
    active: Boolean,
    ariaControls: { type: String, required: true },
  },
  mounted() {
    this.$parent.$emit('cv:global-action-mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:global-action-beforeDestroy', this);
  },
  data() {
    return {
      dataActive: this.active,
    };
  },
  watch: {
    expanded() {
      if (this.active !== this.dataActive) {
        this.gaToggle();
      }
    },
  },
  computed: {
    internalActive: {
      get() {
        return this.dataActive;
      },
      set(val) {
        // do not emit 'cv:global-action-toggle'
        this.dataActive = val;
      },
    },
  },
  methods: {
    gaToggle() {
      this.$parent.$emit('cv:global-action-toggle', this);
    },
    gaBlur() {
      this.$parent.$emit('cv:global-action-blur', this);
    },
  },
};
</script>
