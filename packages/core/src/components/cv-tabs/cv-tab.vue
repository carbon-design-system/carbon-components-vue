<template>
  <div
    class="cv-tab"
    :id="uid"
    role="tabpanel"
    :aria-labelledby="`${uid}-link`"
    :aria-hidden="!dataSelected"
    :hidden="!dataSelected"
  >
    <slot>
      <!-- Content for first tab goes here. -->
    </slot>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvTab',
  mixins: [uidMixin],
  props: {
    selected: Boolean,
    disabled: Boolean,
    label: { type: String, required: true },
  },
  data() {
    return {
      dataSelected: this.selected,
    };
  },
  watch: {
    selected() {
      if (this.selected) {
        this.$parent.$emit('cv:selected', this);
      }
    },
    disabled() {
      if (this.disabled) {
        this.$parent.$emit('cv:disabled', this);
      } else {
        this.$parent.$emit('cv:enabled', this);
      }
    },
  },
  computed: {
    internalSelected: {
      get() {
        return this.dataSelected;
      },
      set(val) {
        this.dataSelected = val;
      },
    },
    internalDisabled() {
      return this.disabled;
    },
  },
  mounted() {
    this.$_CvTab = true; // for use by parent with $children

    this.$parent.$emit('cv:mounted', this);
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy', this);
  },
};
</script>
