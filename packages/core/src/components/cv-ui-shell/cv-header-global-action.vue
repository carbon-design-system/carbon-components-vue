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
    @focusout="gaFocusout"
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
    ariaControls: String,
  },
  mounted() {
    this.$parent.$emit('cv:panel-control-mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:panel-control-beforeDestroy', this);
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
    panelExpanded: {
      get() {
        return this.dataActive;
      },
      set(val) {
        // do not emit 'cv:panel-control-toggle'
        this.dataActive = val;
      },
    },
  },
  methods: {
    gaToggle() {
      this.$el.focus();
      this.$parent.$emit('cv:panel-control-toggle', this);
    },
    gaFocusout(ev) {
      this.$parent.$emit('cv:panel-control-focusout', this, ev);
    },
  },
};
</script>
