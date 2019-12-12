<template>
  <button
    v-on="$listeners"
    class="cv-header-menu-button"
    :class="buttonClasses"
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
import Close20 from '@carbon/icons-vue/es/close/20';
import Menu20 from '@carbon/icons-vue/es/menu/20';

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
      hasRail: false,
    };
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
    buttonClasses() {
      let classes = ['bx--header__action', 'bx--header__menu-trigger', 'bx--header__menu-toggle'];
      if (this.dataActive) {
        classes.push('bx--header__action--active');
      }
      if (!this.hasRail) {
        classes.push('bx--header__menu-toggle__hidden');
      }
      return classes;
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
