<template>
  <button
    v-on="$listeners"
    class="cv-header-menu-button bx--header__action bx--header__menu-trigger bx--header__menu-toggle"
    :class="dataActive ? 'bx--header__action--active' : ''"
    type="button"
    aria-haspopup="true"
    :aria-controls="ariaControls"
    :aria-expanded="active"
    @click="gaToggle"
    @focusout="gaFocusout"
  >
    <Close20 v-if="dataActive" />
    <Menu20 v-if="!dataActive" />
  </button>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import Close20 from '@rocketsoftware/icons-vue/es/close/20';
import Menu20 from '@rocketsoftware/icons-vue/es/menu/20';

export default {
  name: 'CvHeaderMenuButton',
  mixins: [uidMixin],
  components: { Close20, Menu20 },
  props: {
    active: Boolean,
    ariaControls: { type: String, required: true },
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
  mounted() {
    // watch width transition and
  },
  watch: {
    active() {
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
