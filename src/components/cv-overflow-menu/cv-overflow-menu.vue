<template>
  <div
    data-overflow-menu
    tabindex="0"
    @click="doToggle"
    @keydown.enter.prevent="doToggle"
    @keydown.space.prevent
    @keyup.space.prevent="doToggle"
    :aria-label="label"
    aria-role="button"
    class="cv-overflow-menu bx--overflow-menu"
    :class="{ 'bx--overflow-menu--open': open }"
  >
    <svg
      class="bx--overflow-menu__icon"
      width="3"
      height="15"
      viewBox="0 0 3 15"
    >
      <g fill-rule="evenodd">
        <circle cx="1.5" cy="1.5" r="1.5"></circle>
        <circle cx="1.5" cy="7.5" r="1.5"></circle>
        <circle cx="1.5" cy="13.5" r="1.5"></circle>
      </g>
    </svg>
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
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvOverflowMenu',
  mixins: [uidMixin],
  props: {
    label: String,
    flipMenu: Boolean,
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
  created() {
    this.$on('cv:close', this.doClose);
    this.$on('cv:focusout', this.checkFocusOut);
    this.$on('cv:click', this.menuItemclick);
  },
  mounted() {
    // Check for los of focus
    this.$el.addEventListener('focusout', this.checkFocusOut);

    // move popup out to body to ensure it appears above other elements
    document.body.appendChild(this.$refs.popup);
  },
  computed: {
    offsetLeft() {
      return this.offset ? this.offset.left : 0;
    },
    offsetTop() {
      return this.offset ? this.offset.top : 0;
    },
  },
  methods: {
    checkFocusOut(ev) {
      if (this.open) {
        if (
          ev.relatedTarget === null ||
          !(
            this.$el === ev.relatedTarget ||
            this.$refs.popup.contains(ev.relatedTarget)
          )
        ) {
          this.open = false;
          this.positionListen(false);
          setTimeout(() => {
            this.$el.focus();
          }, 1);
        }
      }
    },
    menuItemclick() {
      this.open = false;
      this.positionListen(false);
      setTimeout(() => {
        this.$el.focus();
      }, 1);
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
    positionMenu() {
      if (this.open) {
        const menuPosition = this.$el.getBoundingClientRect();
        setTimeout(() => {
          if (this.flipMenu) {
            this.left =
              menuPosition.left +
              20 +
              this.offsetLeft -
              this.$refs.popup.offsetWidth +
              this.$el.offsetWidth;
            this.top =
              menuPosition.bottom + 2 + this.offsetTop + window.scrollY;
          } else {
            this.left =
              menuPosition.left - 20 + this.offsetLeft + window.scrollX;
            this.top =
              menuPosition.bottom + 2 + this.offsetTop + window.scrollY;
          }

          this.$refs.popup
            .querySelector('.bx--overflow-menu-options__btn')
            .focus();
        }, 1);
      }
    },
    doToggle() {
      this.open = !this.open;

      this.positionMenu();
      this.positionListen(this.open);
    },
  },
};
</script>

<style lang="scss"></style>
