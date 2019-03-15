<template>
  <div
    data-modal
    :id="uid"
    class="cv-modal bx--modal"
    :class="{
      'is-visible': dataVisible,
      'bx--modal--danger': kind === 'danger',
    }"
    tabindex="-1"
    @keydown.esc.prevent="hide"
    @click.self="onClick"
  >
    <div class="bx--modal-container" ref="modalDialog">
      <div
        class="cv-modal__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusBeforeContent"
      />
      <div class="bx--modal-header">
        <h4 class="bx--modal-header__label" v-if="$slots.label">
          <slot name="label">label (Optional)</slot>
        </h4>
        <h2 class="bx--modal-header__heading">
          <slot name="title">Modal Title</slot>
        </h2>
        <button class="bx--modal-close" type="button" @click="hide" ref="close">
          <Close16 v-if="componentsX" class="bx--modal-close__icon" />
          <cv-icon
            v-else
            class="bx--modal-close__icon"
            href="cv(icon--close)"
            height="10px"
            width="10px"
          ></cv-icon>
        </button>
      </div>

      <div class="bx--modal-content" ref="content">
        <slot name="content">
          <p>
            Passive modal notifications should only appear if there is an action
            the user needs to address immediately. Passive modal notifications
            are persistent on the screen.
          </p>
        </slot>
      </div>

      <div class="bx--modal-footer" v-if="hasFooter">
        <cv-button
          type="button"
          :kind="secondaryKind"
          @click="onSecondaryClick"
          v-if="this.$slots['secondary-button']"
          ref="secondary"
        >
          <slot name="secondary-button">Secondary button</slot>
        </cv-button>
        <cv-button
          type="button"
          :kind="primaryKind"
          @click="onPrimaryClick"
          v-if="this.$slots['primary-button']"
          ref="primary"
        >
          <slot name="primary-button">Primary button</slot>
        </cv-button>
      </div>
      <div
        class="cv-modal__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusAfterContent"
      />
    </div>
  </div>
</template>

<script>
import CvButton from '../cv-button/cv-button';
import CvIcon from '../cv-icon/_cv-icon';
import uidMixin from '../../mixins/uid-mixin';
import Close16 from '@carbon/icons-vue/lib/close//16';
import { componentsX } from '../../_internal/_feature-flags';

export default {
  name: 'CvModal',
  mixins: [uidMixin],
  components: {
    CvButton,
    CvIcon,
    Close16,
  },
  props: {
    kind: {
      type: String,
      default: '',
      validator: val => ['', 'danger'].includes(val),
    },
    visible: Boolean,
  },
  data() {
    return {
      componentsX,
      dataVisible: false,
    };
  },
  mounted() {
    if (this.visible) {
      this.show();
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    },
  },
  computed: {
    primaryKind() {
      if (this.kind === 'danger') {
        return componentsX ? 'danger' : 'danger--primary';
      } else {
        return 'primary';
      }
    },
    secondaryKind() {
      if (this.kind === 'danger') {
        return componentsX ? 'secondary' : 'tertiary';
      } else {
        return 'secondary';
      }
    },
    hasFooter() {
      return this.$slots['primary-button'] || this.$slots['secondary-button'];
    },
  },
  methods: {
    focusBeforeContent() {
      if (this.$slots['primary-button']) {
        this.$refs.primary.$el.focus();
      } else if (this.$slots['secondary-button']) {
        this.$refs.secondary.$el.focus();
      } else {
        this.$refs.close.focus();
      }
    },
    focusAfterContent() {
      this.$refs.close.focus();
    },
    onShown() {
      const focusEl = this.$refs.content.querySelector(
        '[data-modal-primary-focus]'
      );
      if (focusEl) {
        focusEl.focus();
      } else if (this.$slots['primary-button']) {
        this.$refs.primary.$el.focus();
      } else if (this.$slots['secondary-button']) {
        this.$refs.secondary.$el.focus();
      } else {
        this.$refs.close.focus();
      }
      this.$emit('modal-shown');

      this.$el.removeEventListener('transitionend', this.onShown);
    },
    onClick(ev) {
      if (ev.target === this.$el) {
        this.hide();
      }
    },
    show() {
      this.$el.addEventListener('transitionend', this.onShown);
      this.dataVisible = true;
    },
    hide() {
      this.dataVisible = false;
      this.$emit('modal-hidden');
    },
    onPrimaryClick() {
      this.$emit('primary-click');
      if (!this.$listeners['primary-click']) {
        this.hide();
      }
    },
    onSecondaryClick() {
      this.$emit('secondary-click');
      if (!this.$listeners['secondary-click']) {
        this.hide();
      }
    },
  },
};
</script>

<style lang="scss"></style>
