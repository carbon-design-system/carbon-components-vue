<template>
  <div data-overflow-menu class="cv-overflow-menu bx--overflow-menu">
    <button
      class="bx--overflow-menu__trigger bx--tooltip__trigger bx--tooltip--a11y"
      :class="[tipClasses, { 'bx--overflow-menu--open': open }]"
      aria-haspopup
      type="button"
      :aria-expanded="open"
      :aria-controls="`${uid}-menu`"
      :id="`${uid}-trigger`"
      ref="trigger"
      @click="doToggle"
      @keydown.space.prevent
      @keyup.space.prevent="doToggle"
      @keydown.enter.prevent="doToggle"
      @keydown.tab="onOverflowMenuTab"
    >
      <span class="bx--assistive-text">{{ label }}</span>

      <slot name="trigger">
        <OverflowMenuVertical16 class="bx--overflow-menu__icon" />
      </slot>
    </button>
    <div
      class="bx--overflow-menu-options"
      :class="{
        'bx--overflow-menu--flip': flipMenu,
        'bx--overflow-menu-options--open': open,
      }"
      tabindex="-1"
      ref="popup"
      :aria-labelledby="`${uid}-trigger`"
      :id="`${uid}-menu`"
      :style="{ left: left + 'px', top: top + 'px' }"
      @focusout="checkFocusOut"
      @mousedown.prevent="preventFocusOut"
    >
      <div
        class="cv-overflow-menu__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusBeforeContent"
      />
      <ul class="bx--overflow-menu-options__content">
        <slot></slot>
      </ul>
      <div
        class="cv-overflow-menu__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusAfterContent"
      />
    </div>
  </div>
</template>

<script>
import OverflowMenuVertical16 from '@carbon/icons-vue/es/overflow-menu--vertical/16';
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvOverflowMenu',
  components: { OverflowMenuVertical16 },
  mixins: [uidMixin],
  props: {
    label: String,
    flipMenu: Boolean,
    up: Boolean,
    offset: {
      type: Object,
      validator(value) {
        return value.hasOwnProperty('left') && value.hasOwnProperty('top');
      },
    },
    tipPosition: {
      type: String,
      default: 'right',
      validator: val => ['top', 'left', 'bottom', 'right'.includes(val)],
    },
    tipAlignment: { type: String, default: 'center', validator: val => ['start', 'center', 'end'].includes(val) },
  },
  watch: {
    flipMenu(val) {
      this.flipMenu = val;
    },
  },
  data() {
    return {
      open: false,
      left: -9999, // offscreen,
      top: 0,
    };
  },
  computed: {
    offsetLeft() {
      return this.offset ? this.offset.left : 0;
    },
    offsetTop() {
      return this.offset ? this.offset.top : 0;
    },
    tipClasses() {
      const tipPosition = this.tipPosition || 'right';
      const tipAlignment = this.tipAlignment || 'center';
      if (this.label) {
        return `bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--${tipPosition} bx--tooltip--align-${tipAlignment}`;
      } else {
        return '';
      }
    },
  },
  created() {
    this.$on('cv:close', this.doClose);
    this.$on('cv:click', this.menuItemclick);
  },
  methods: {
    checkFocusOut(ev) {
      if (this.open) {
        if (
          ev.relatedTarget === null ||
          !(this.$refs.trigger === ev.relatedTarget || this.$refs.popup.contains(ev.relatedTarget))
        ) {
          this.open = false;
          this.positionListen(false);

          // DO NOT FOCUS if relatedTarget is not null, as focus is going somewhere
          if (!ev.relatedTarget) {
            this.$nextTick(() => {
              this.doFocus();
            });
          }
        }
      }
    },
    menuItemclick() {
      this.open = false;
      this.positionListen(false);
      this.$nextTick(() => {
        this.doFocus();
      });
    },
    doClose() {
      this.open = false;
      this.positionListen(false);
    },
    positionListen(on) {
      if (on) {
        window.addEventListener('scroll', this.positionMenu);
        window.addEventListener('resize', this.positionMenu);
      } else {
        window.removeEventListener('scroll', this.positionMenu);
        window.removeEventListener('resize', this.positionMenu);
      }
    },
    async positionMenu() {
      if (this.open) {
        const menuPosition = this.$el.getBoundingClientRect();
        return this.$nextTick(() => {
          const pixelsScrolledX = window.scrollX || window.pageXOffset;
          const pixelsScrolledY = window.scrollY || window.pageYOffset;
          if (this.flipMenu) {
            this.left =
              menuPosition.left +
              this.offsetLeft -
              this.$refs.popup.offsetWidth +
              this.$el.offsetWidth +
              pixelsScrolledX;
          } else {
            this.left = menuPosition.left + this.offsetLeft + pixelsScrolledX;
          }
          if (this.up) {
            this.top = menuPosition.top + this.offsetTop - this.$refs.popup.offsetHeight + pixelsScrolledY;
          } else {
            this.top = menuPosition.bottom + this.offsetTop + pixelsScrolledY;
          }
        });
      }
    },
    doFocus() {
      let focusOn;
      if (this.open) {
        // set focus somewhere sensible, first focusable item or leave on over flow
        let focusOnList = this.$refs.popup.querySelectorAll(
          '.bx--overflow-menu-options__btn, button, link, input, textarea, [contentEditable="true"], [tabindex]'
        );
        for (let tryOn of focusOnList) {
          if (
            // don't focus on before after or something that can't be tabbed to
            !(
              tryOn.classList.contains('cv-overflow-menu__before-content') ||
              tryOn.classList.contains('cv-overflow-menu__after-content') ||
              tryOn.tabindex < 0
            )
          ) {
            focusOn = tryOn;
            break;
          }
        }
        if (!focusOn) {
          focusOn = this.$el;
        }
      } else {
        focusOn = this.$el;
      }
      focusOn.focus();
    },
    async doToggle() {
      this.open = !this.open;

      // await positionMenu otherwise it can race doFocus.
      // On initial open the menu is positioned 0,0 causing a jump
      await this.positionMenu();
      this.positionListen(this.open);
      this.$nextTick(() => {
        this.doFocus();
      });
    },
    onOverflowMenuTab(ev) {
      if (!ev.shiftKey) {
        // move focus before content before tab press
        this.$refs.beforeContent.focus();
      }
    },
    focusBeforeContent(ev) {
      if (this.$refs.popup.contains(ev.relatedTarget)) {
        this.$refs.trigger.focus();
        this.open = false;
      }
    },
    focusAfterContent() {
      this.$refs.trigger.focus();
      this.open = false;
    },
    preventFocusOut() {
      // This is here to prevent focus being lost if the user clicks on the contents of the interactive tool tip
    },
  },
  mounted() {
    // Check for los of focus
    this.$el.addEventListener('focusout', this.checkFocusOut);

    // move popup out to body to ensure it appears above other elements
    this.popupEl = document.body.appendChild(this.$refs.popup);
  },
  beforeDestroy() {
    this.positionListen(false);
    if (this.popupEl) {
      // move back to where it came from
      this.$el.appendChild(this.popupEl);
    }
  },
};
</script>
