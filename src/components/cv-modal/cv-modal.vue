<template>
  <div
    data-modal
    :id="uid"
    class="cv-modal bx--modal"
    :class="{'bx--modal--danger': kind === 'danger'}"
    tabindex="-1"
    @modal-beingshown="$emit('modal-beingshown')"
    @modal-shown="$emit('modal-shown')"
    @modal-beinghidden="$emit('modal-beinghidden')"
    @modal-hidden="$emit('modal-hidden')"
  >
    <div class="bx--modal-container">
      <div class="bx--modal-header">
        <h4 class="bx--modal-header__label" v-if="$slots.label">
          <slot name="label">label (Optional)</slot>
        </h4>
        <h2 class="bx--modal-header__heading">
          <slot name="title">Modal Title</slot>
        </h2>
        <button
          class="bx--modal-close"
          type="button"
          data-modal-close
          :data-modal-primary-focus="initialFocus === 'close'"
        >
          <cv-icon class="bx--modal-close__icon" href="cv(icon--close)" height="10px" width="10px"></cv-icon>
        </button>
      </div>

      <div class="bx--modal-content">
        <slot name="content">
          <p>Passive modal notifications should only appear if there is an action the user needs to address immediately. Passive modal notifications are persistent on the screen.</p>
        </slot>
      </div>

      <div class="bx--modal-footer" v-if="hasFooter">
        <cv-button
          :kind="secondaryKind"
          @click="secondaryClick"
          v-if="this.$slots['secondary-button']"
          :data-modal-primary-focus="initialFocus === 'secondary'"
        >
          <slot name="secondary-button">Secondary button</slot>
        </cv-button>
        <cv-button
          :kind="primaryKind"
          @click="primaryClick"
          v-if="this.$slots['primary-button']"
          :data-modal-primary-focus="initialFocus === 'primary'"
        >
          <slot name="primary-button">Primary button</slot>
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import CvButton from '../cv-button/cv-button';
import CvIcon from '../cv-icon/cv-icon';
import { Modal } from 'carbon-components';
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvModal',
  mixins: [uidMixin],
  components: {
    CvButton,
    CvIcon,
  },
  props: {
    kind: {
      type: String,
      default: '',
      validator: val => ['', 'danger'].includes(val),
    },
  },
  computed: {
    primaryKind() {
      if (this.kind === 'danger') {
        return 'danger--primary';
      } else {
        return 'primary';
      }
    },
    secondaryKind() {
      if (this.kind === 'danger') {
        return 'tertiary';
      } else {
        return 'secondary';
      }
    },
    hasFooter() {
      return this.$slots['primary-button'] || this.$slots['secondary-button'];
    },
    initialFocus() {
      let _initialFocus = 'close';
      if (this.$slots['primary-button']) {
        _initialFocus = 'primary';
      } else if (this.$slots['secondary-button']) {
        _initialFocus = 'secondary';
      }
      return _initialFocus;
    },
  },
  methods: {
    show: function() {
      Modal.components.get(this.$el).show();
    },
    hide: function() {
      Modal.components.get(this.$el).hide();
    },
    primaryClick() {
      this.$emit('primary-click');
      if (!this.$listeners['primary-click']) {
        this.hide();
      }
    },
    secondaryClick() {
      this.$emit('secondary-click');
      if (!this.$listeners['secondary-click']) {
        this.hide();
      }
    },
  },
  mounted() {
    this.carbonComponent = Modal.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
</script>

<style lang="scss">
</style>
