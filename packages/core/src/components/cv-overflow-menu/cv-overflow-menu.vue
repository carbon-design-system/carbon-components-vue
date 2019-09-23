<template>
  <div
    data-overflow-menu
    tabindex="0"
    @click="doToggle"
    @keydown.space.prevent
    @keyup.space.prevent="doToggle"
    @keydown.enter.prevent="doToggle"
    @keydown.tab="onOverflowMenuTab"
    :aria-label="label"
    role="button"
    class="cv-overflow-menu bx--overflow-menu"
    :class="{ 'bx--overflow-menu--open': open }"
  >
    <slot name="trigger">
      <OverflowMenuVertical16 class="bx--overflow-menu__icon" />
    </slot>
    <ul
      class="bx--overflow-menu-options"
      :class="{
        'bx--overflow-menu--flip': flipMenu,
        'bx--overflow-menu-options--open': open,
      }"
      tabindex="-1"
      ref="popup"
      :id="uid"
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
      <slot></slot>
      <div
        class="cv-overflow-menu__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusAfterContent"
      />
    </ul>
  </div>
</template>

<script>
import OverflowMenuVertical16 from '@rocketsoftware/icons-vue/es/overflow-menu--vertical/16';
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
          !(this.$el === ev.relatedTarget || this.$refs.popup.contains(ev.relatedTarget))
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
          if (this.flipMenu) {
            this.left =
              menuPosition.left +
              this.offsetLeft -
              this.$refs.popup.offsetWidth +
              this.$el.offsetWidth +
              window.scrollX;
          } else {
            this.left = menuPosition.left + this.offsetLeft + window.scrollX;
          }
          if (this.up) {
            this.top = menuPosition.top + this.offsetTop - this.$refs.popup.offsetHeight + window.scrollY;
          } else {
            this.top = menuPosition.bottom + this.offsetTop + window.scrollY;
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
            !// don't focus on before after or something that can't be tabbed to
            (
              tryOn.classList.contains('cv-overflow-menu__before-content') ||
              tryOn.classList.contains('cv-overflow-menu__after-content') ||
              tryOn.tabindex < 0
            )
          ) {
            focusOn = tryOn;
            break;
          }
        }
        if (focusOn === null) {
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
        this.$el.focus();
        this.open = false;
      }
    },
    focusAfterContent() {
      this.$el.focus();
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
