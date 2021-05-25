<template>
  <div
    data-modal
    :id="uid"
    :class="[
      `cv-modal ${carbonPrefix}--modal`,
      {
        'is-visible': dataVisible,
        [`${carbonPrefix}--modal--danger`]: kind === 'danger',
      },
    ]"
    tabindex="-1"
    @keydown.esc.prevent="onEsc"
    @click.self="onExternalClick"
  >
    <div
      :class="[
        `${carbonPrefix}--modal-container`,
        { [`${carbonPrefix}--modal-container--${internalSize}`]: internalSize },
      ]"
      v-bind="dialogAttrs"
      ref="modalDialog"
    >
      <div
        class="cv-modal__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusBeforeContent"
      />
      <div :class="`${carbonPrefix}--modal-header`">
        <p :class="`${carbonPrefix}--modal-header__label`">
          <slot name="label"></slot>
        </p>
        <p :class="`${carbonPrefix}--modal-header__heading`">
          <slot name="title">Modal Title</slot>
        </p>
        <button
          :class="`${carbonPrefix}--modal-close`"
          type="button"
          @click="onClose"
          ref="close"
          :aria-label="closeAriaLabel"
        >
          <Close16 :class="`${carbonPrefix}--modal-close__icon`" />
        </button>
      </div>

      <div
        :class="[`${carbonPrefix}--modal-content`, { [`${carbonPrefix}--modal-content--with-form`]: hasFormContent }]"
        ref="content"
        :tabindex="scrollable ? 0 : undefined"
      >
        <slot name="content"></slot>
      </div>

      <cv-button-set
        :class="[
          `${carbonPrefix}--modal-footer`,
          { [`${carbonPrefix}--modal-footer--three-button`]: hasPrimary && hasSecondary && hasOtherBtn },
        ]"
        v-if="hasFooter"
      >
        <cv-button type="button" kind="secondary" @click="onOtherBtnClick" v-if="hasOtherBtn" ref="otherBtn">
          <slot name="other-button">Other button</slot>
        </cv-button>
        <cv-button type="button" kind="secondary" @click="onSecondaryClick" v-if="hasSecondary" ref="secondary">
          <slot name="secondary-button">Secondary button</slot>
        </cv-button>
        <cv-button
          :disabled="primaryButtonDisabled"
          type="button"
          :kind="primaryKind"
          @click="onPrimaryClick"
          v-if="hasPrimary"
          ref="primary"
        >
          <slot name="primary-button">Primary button</slot>
        </cv-button>
      </cv-button-set>
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
import { uidMixin, carbonPrefixMixin } from '../../mixins';
import Close16 from '@carbon/icons-vue/es/close/16';
import CvButtonSet from '../cv-button/cv-button-set.vue';

export default {
  name: 'CvModal',
  mixins: [uidMixin, carbonPrefixMixin],
  components: {
    CvButton,
    Close16,
    CvButtonSet,
  },
  props: {
    alert: Boolean,
    closeAriaLabel: { type: String, default: 'Close modal' },
    kind: {
      type: String,
      default: '',
      validator: val => ['', 'danger'].includes(val),
    },
    autoHideOff: Boolean,
    visible: Boolean,
    primaryButtonDisabled: Boolean,
    size: String,
    hasFormContent: Boolean,
  },
  data() {
    return {
      dataVisible: false,
      scrollable: false,
      hasFooter: false,
      hasHeaderLabel: false,
      hasPrimary: false,
      hasSecondary: false,
      hasOtherBtn: false,
    };
  },
  mounted() {
    if (this.visible) {
      this.show();
    }
    this.checkSlots();
  },
  updated() {
    this.checkSlots();
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
    dialogAttrs() {
      const passive = !this.hasFooter;
      const attrs = { role: 'dialog' };

      if (this.alert) {
        if (passive) {
          attrs.role = 'alert';
        } else {
          attrs.role = 'alertdialog';
          attrs['aria-describedBy'] = this.uid;
        }
      }
      return attrs;
    },
    primaryKind() {
      if (this.kind === 'danger') {
        return 'danger';
      } else {
        return 'primary';
      }
    },
    internalSize() {
      switch (this.size) {
        case 'xs':
          return 'xs';
        case 'small':
          return 'sm';
        case 'large':
          return 'lg';
        default:
          return '';
      }
    },
  },
  model: {
    event: 'modelEvent',
    prop: 'visible',
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.hasFooter = !!(
        this.$slots['primary-button'] ||
        this.$slots['secondary-button'] ||
        this.$slots['other-button']
      );
      this.hasHeaderLabel = !!this.$slots.label;
      this.hasPrimary = !!this.$slots['primary-button'];
      this.hasSecondary = !!this.$slots['secondary-button'];
      this.hasOtherBtn = !!this.$slots['other-button'];
    },
    focusBeforeContent() {
      if (this.$slots['primary-button']) {
        this.$refs.primary.$el.focus();
      } else if (this.$slots['secondary-button']) {
        this.$refs.secondary.$el.focus();
      } else if (this.$slots['other-button']) {
        this.$refs.otherBtn.$el.focus();
      } else {
        this.$refs.close.focus();
      }
    },
    focusAfterContent() {
      this.$refs.close.focus();
    },
    onShown() {
      const focusEl = this.$refs.content.querySelector('[data-modal-primary-focus]');
      if (focusEl) {
        focusEl.focus();
      } else {
        this.focusBeforeContent();
      }
      this.$emit('modal-shown');

      // check to see if content scrollable
      this.scrollable = this.$refs.content.scrollHeight > this.$refs.content.clientHeight;

      this.$el.removeEventListener('transitionend', this.onShown);
    },
    onExternalClick(ev) {
      if (ev.target === this.$el) {
        this._maybeHide(ev, 'external-click');
      }
    },
    onEsc(ev) {
      this._maybeHide(ev, 'escape-press');
    },
    onClose(ev) {
      this._maybeHide(ev, 'close-click');
    },
    show() {
      // prevent body scrolling
      document.body.classList.add(`${this.carbonPrefix}--body--with-modal-open`);

      this.$el.addEventListener('transitionend', this.onShown);
      this.dataVisible = true;
    },
    _maybeHide(event, reason) {
      if (!this.autoHideOff) {
        this.hide();
      } else {
        event['cv:reason'] = reason;
        this.$emit('modal-hide-request', event);
      }
    },
    hide() {
      //restore any previous scrollability
      document.body.classList.remove(`${this.carbonPrefix}--body--with-modal-open`);

      if (this.dataVisible) {
        this.$el.addEventListener('transitionend', this.afterHide);
      }

      this.dataVisible = false;
      this.$emit('modal-hidden');
    },
    afterHide(event) {
      if (event.propertyName === 'opacity') {
        this.$emit('after-modal-hidden');
        this.$el.removeEventListener('transitionend', this.afterHide);
      }
    },
    onFooterButtonClick(buttonId, ev) {
      this.$emit(buttonId);
      if (!this.$listeners[buttonId]) {
        this._maybeHide(ev, buttonId);
      }
    },
    onPrimaryClick(ev) {
      this.onFooterButtonClick('primary-click', ev);
    },
    onSecondaryClick(ev) {
      this.onFooterButtonClick('secondary-click', ev);
    },
    onOtherBtnClick(ev) {
      this.onFooterButtonClick('other-btn-click', ev);
    },
  },
  beforeDestroy() {
    if (this.dataVisible) {
      this.$emit('after-modal-hidden');
    }
  },
};
</script>
