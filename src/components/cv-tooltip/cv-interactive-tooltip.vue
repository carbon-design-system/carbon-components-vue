<template>
  <div class="cv-interactive-tooltip">
    <div class="bx--tooltip__label" :aria-describedby="uid">
      <slot name="label"></slot>

      <div
        tabindex="0"
        data-tooltip-trigger
        :data-tooltip-target="`#${uid}`"
        role="tooltip"
        class="bx--tooltip__trigger"
        ref="trigger"
        @click="toggle"
        @keydown.space.prevent
        @keyup.space.prevent="toggle"
        @keydown.enter.prevent="toggle"
        @keydown.tab="onTriggerTab"
        @focusout="checkFocusOut"
      >
        <slot name="trigger">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="evenodd">
              <path
                d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                fill-rule="nonzero"
              ></path>
              <path fill-rule="nonzero" d="M9 13H7V7h2z"></path>
              <circle cx="8" cy="4" r="1"></circle>
            </g>
          </svg>
        </slot>
      </div>
    </div>
    <div
      :id="uid"
      :data-floating-menu-direction="direction"
      class="bx--tooltip"
      :class="{ 'bx--tooltip--shown': dataVisible }"
      ref="popup"
      @focusout="checkFocusOut"
      :style="{ left: left + 'px', top: top + 'px' }"
      tabindex="-1"
      @mousedown.prevent="preventFocusOut"
    >
      <div
        class="cv-interactive-tooltip__before-content"
        ref="beforeContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusBeforeContent"
      />
      <span class="bx--tooltip__caret"></span>
      <slot name="content"></slot>
      <div
        class="cv-interactive-tooltip__after-content"
        ref="afterContent"
        tabindex="0"
        style="position: absolute; height: 1px; width: 1px; left: -9999px;"
        @focus="focusAfterContent"
      />
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';

export default {
  name: 'CvInteractiveTooltip',
  mixins: [uidMixin],
  props: {
    direction: {
      type: String,
      default: 'top',
      validator(val) {
        const validValues = ['top', 'bottom', 'right', 'left'];
        const valid = validValues.includes(val);
        if (!valid) {
          console.warn(
            `CVInteractiveTooltip.direction must be one of the following: ${validValues}`
          );
        }
        return valid;
      },
    },
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      dataVisible: false,
      left: -9999, // offscreen
      top: 0,
    };
  },
  computed: {
    contentAfter() {
      return this.direction === 'right' || this.direction === 'bottom';
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        this.show();
      } else {
        this.hide();
      }
    },
    direction() {
      if (this.visible) {
        this.position();
      }
    },
  },
  methods: {
    positionListen(on) {
      if (on) {
        window.addEventListener('scroll', this.position);
        window.addEventListener('resize', this.position);
      } else {
        window.removeEventListener('scroll', this.position);
        window.removeEventListener('resize', this.position);
      }
    },
    position() {
      const menuPosition = this.$refs.trigger.getBoundingClientRect();

      if (this.direction === 'top' || this.direction === 'bottom') {
        this.left =
          menuPosition.left +
          0.5 +
          (this.$refs.trigger.offsetWidth - this.$refs.popup.offsetWidth) / 2 +
          window.scrollX;

        if (this.direction === 'bottom') {
          this.top = menuPosition.bottom + 10 + window.scrollY;
        } else {
          this.top =
            menuPosition.top -
            15 -
            this.$refs.popup.offsetHeight +
            window.scrollY;
        }
      } else {
        this.top =
          menuPosition.top +
          (this.$refs.trigger.offsetHeight -
            0.5 -
            this.$refs.popup.offsetHeight) /
            2 +
          window.scrollY;
        if (this.direction === 'left') {
          this.left =
            menuPosition.left -
            10 -
            this.$refs.popup.offsetWidth +
            window.scrollX;
        } else {
          this.left = menuPosition.right + 15 + window.scrollX;
        }
      }
    },
    show() {
      this.dataVisible = true;
      this.positionListen(true);

      this.$nextTick(() => {
        this.position();
        this.$refs.trigger.focus();
      });
    },
    hide() {
      this.dataVisible = false;
      this.positionListen(true);
    },
    toggle() {
      if (this.dataVisible) {
        this.hide();
      } else {
        this.show();
      }
    },
    onTriggerTab(ev) {
      if (!ev.shiftKey) {
        if (this.contentAfter) {
          // move focus before content before tab press
          this.$refs.beforeContent.focus();
        }
      } else {
        if (!this.contentAfter) {
          // move focus after content before tab press
          this.$refs.afterContent.focus();
        }
      }
    },
    checkFocusOut(ev) {
      this.dataVisible =
        ev.relatedTarget === this.$refs.trigger ||
        this.$refs.popup.contains(ev.relatedTarget);
    },
    focusBeforeContent(ev) {
      if (this.contentAfter) {
        if (this.$refs.popup.contains(ev.relatedTarget)) {
          this.$refs.trigger.focus();
        }
      } else {
        this.$refs.trigger.focus();
        this.dataVisible = this.contentAfter;
      }
    },
    focusAfterContent(ev) {
      if (!this.contentAfter) {
        if (this.$refs.popup.contains(ev.relatedTarget)) {
          this.$refs.trigger.focus();
        }
      } else {
        this.$refs.trigger.focus();
        this.dataVisible = !this.contentAfter;
      }
    },
    preventFocusOut() {
      // This is here to prevent focus being lost if the user clicks on the contents of the interactive tool tip
    },
  },
  mounted() {
    // move popup out to body to ensure it appears above other elements
    document.body.appendChild(this.$refs.popup);

    if (this.visible) {
      this.show();
    } else {
      this.hide();
    }
  },
  beforeDestroy() {
    this.positionListen(false);
  },
};
</script>

<style lang="scss"></style>
