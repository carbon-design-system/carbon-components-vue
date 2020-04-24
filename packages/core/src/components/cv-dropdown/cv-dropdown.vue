<!--
  Carbon Style Dropdown

  Attributes:
    placeholder: Placeholder text displayed before any  selection is made.

  Usage:
    <cv-dropdown placeholder="Choose an option">
      <cv-dropdown-item value="10">Option 1</cv-dropdown-item>
      <cv-dropdown-item value="20">Option 2</cv-dropdown-item>
      <cv-dropdown-item value="30">Option 3</cv-dropdown-item>
      <cv-dropdown-item value="40">Option 4</cv-dropdown-item>
      <cv-dropdown-item value="50">Option 5</cv-dropdown-item>
    </cv-dropdown>

-->

<template>
  <div :class="{ 'bx--form-item': formItem }">
    <div
      class="bx--dropdown__wrapper"
      :class="{ 'bx--dropdown__wrapper--inline': inline, 'cv-dropdown': !formItem }"
      :style="wrapperStyleOverride"
    >
      <span v-if="label" :id="`${uid}-label`" class="bx--label" :class="{ 'bx--label--disabled': disabled }">
        {{ label }}
      </span>

      <div
        v-if="!inline && isHelper"
        class="bx--form__helper-text"
        :class="{ 'bx--form__helper-text--disabled': disabled }"
        :aria-disabled="disabled"
      >
        <slot name="helper-text">{{ helperText }}</slot>
      </div>

      <div
        data-dropdown
        :data-value="internalValue"
        :data-invalid="isInvalid"
        class="bx--dropdown"
        :class="{
          'bx--dropdown--light': theme === 'light',
          'bx--dropdown--up': up,
          'bx--dropdown--open': open,
          'bx--dropdown--invalid': isInvalid,
          'bx--dropdown--disabled': disabled,
          'bx--dropdown--inline': inline,
          'bx--dropdown--show-selected': !hideSelected,
        }"
        v-bind="$attrs"
        @keydown.down.prevent="onDown"
        @keydown.up.prevent="onUp"
        @keydown.enter.prevent="onClick"
        @keydown.esc.prevent="onEsc"
        @click="onClick"
      >
        <button
          class="bx--dropdown-text"
          aria-haspopup="true"
          :aria-expanded="open"
          :aria-controls="`${uid}-menu`"
          :aria-labelledby="`${uid}-label ${uid}-value`"
          type="button"
        >
          <WarningFilled16 v-if="isInvalid && inline" class="bx--dropdown__invalid-icon" />
          <span
            class="bx--dropdown-text__inner"
            :id="`${uid}-value`"
            data-test="internalCaption"
            v-html="internalCaption"
          />
          <span class="bx--dropdown__arrow-container">
            <span class="bx--dropdown__arrow" :style="chevronStyleOveride">
              <chevron-down-glyph />
            </span>
          </span>
        </button>
        <ul
          class="bx--dropdown-list"
          :id="`${uid}-menu`"
          role="menu"
          :aria-hidden="!open"
          wh-menu-anchor="left"
          :aria-labelledby="`${uid}-label`"
          ref="droplist"
        >
          <slot></slot>
        </ul>
      </div>
      <div v-if="isInvalid && inline" class="bx--form-requirement">
        <slot name="invalid-message">{{ invalidMessage }}</slot>
      </div>
    </div>
    <div v-if="isInvalid && !inline" class="bx--form-requirement">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import themeMixin from '../../mixins/theme-mixin';
import uidMixin from '../../mixins/uid-mixin';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import ChevronDownGlyph from '@carbon/icons-vue/es/chevron--down';

export default {
  name: 'CvDropdown',
  inheritAttrs: false,
  mixins: [themeMixin, uidMixin],
  components: { WarningFilled16, ChevronDownGlyph },
  props: {
    disabled: Boolean,
    formItem: { type: Boolean, default: true },
    inline: Boolean,
    invalidMessage: { type: String, default: undefined },
    helperText: { type: String, default: undefined },
    label: String,
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
    up: Boolean,
    value: String, // initial value of the dropdown,
    hideSelected: Boolean,
  },
  data() {
    return {
      open: false,
      dataValue: this.value,
      isHelper: false,
      isInvalid: false,
      selectedChild: null,
    };
  },
  created() {
    // add these on created otherwise cv:mounted is too late.
    this.$on('cv:mounted', srcComponent => this.onCvMount(srcComponent));
    this.$on('cv:beforeDestroy', srcComponent => this.onCvBeforeDestroy(srcComponent));
  },
  mounted() {
    this.$el.addEventListener('focusout', ev => {
      if (ev.relatedTarget === null || !this.$el.contains(ev.relatedTarget)) {
        this.open = false;
      }
    });
    this.internalValue = this.internalValue; // forces update of value
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  watch: {
    value(val) {
      this.internalValue = val;
    },
  },
  computed: {
    internalCaption() {
      if (this.selectedChild) {
        return this.selectedChild.internalContent;
      } else {
        return this.placeholder;
      }
    },
    internalValue: {
      get() {
        return this.dataValue;
      },
      set(val) {
        const childItems = this.dropdownItems();

        for (let index in childItems) {
          let child = childItems[index];
          let selected = child.value === val;
          child.internalSelected = selected;

          if (selected) {
            this.selectedChild = child;
          }
        }

        if (this.dataValue !== val) {
          // only raise event on change
          this.dataValue = val;
          this.$emit('change', this.dataValue);
        }
      },
    },
    chevronStyleOveride() {
      // This allows the same chevron to be used in dropdown and tabs
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '16px',
        width: '16px',
      };
    },
    wrapperStyleOverride() {
      // ensures correct width when used inside tabs component
      return { width: '100%' };
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    onCvMount(srcComponent) {
      if (srcComponent.internalSelected) {
        this.internalValue = srcComponent.value;
      } else {
        if (this.internalValue === srcComponent.value) {
          srcComponent.internalSelected = true;
          this.internalValue = srcComponent.value;
        }
      }
    },
    onCvBeforeDestroy(srcComponent) {
      if (srcComponent.value === this.internalValue) {
        this.dataValue = null;
      }
    },
    dropdownItems() {
      return this.$children.filter(item => item.$_CvDropdownItem);
    },
    doMove(up) {
      // requery could have changed
      let currentFocusEl = this.$el.querySelector('.cv-dropdown-item :focus');
      let currentFocusValue;
      let childItems = this.dropdownItems();
      let last = childItems.length - 1;
      let currentFocusIndex = up ? 0 : last;
      let nextFocusIndex;

      if (currentFocusEl) {
        currentFocusValue = currentFocusEl.parentNode.getAttribute('data-value');
      }

      if (currentFocusValue !== undefined) {
        currentFocusIndex = childItems.findIndex(child => child.value === currentFocusValue);
      }

      if (up) {
        nextFocusIndex = currentFocusIndex > 0 ? currentFocusIndex - 1 : last;
        if (childItems[nextFocusIndex].internalSelected) {
          nextFocusIndex = nextFocusIndex > 0 ? nextFocusIndex - 1 : last;
        }
      } else {
        nextFocusIndex = currentFocusIndex < last ? currentFocusIndex + 1 : 0;
        if (childItems[nextFocusIndex].internalSelected) {
          nextFocusIndex = nextFocusIndex < last ? nextFocusIndex + 1 : 0;
        }
      }

      childItems[nextFocusIndex].setFocus();
    },
    onDown() {
      if (!this.open) {
        this.open = true;
      } else {
        this.doMove(false);
      }
    },
    onUp() {
      if (this.open) {
        this.doMove(true);
      }
    },
    onEsc() {
      this.open = false;
      this.$el.focus();
    },
    onClick(ev) {
      if (this.disabled) {
        ev.preventDefault();
      } else {
        this.open = !this.open;
        if (!this.open) {
          this.$el.focus();
        }

        let target = ev.target;
        while (!target.classList.contains('bx--dropdown-link') && this.$refs.droplist.contains(target)) {
          target = target.parentNode; // try next one up
        }

        if (target.classList.contains('bx--dropdown-link')) {
          const targetItemEl = target.parentNode;
          const newValue = targetItemEl.getAttribute('data-value');

          this.internalValue = newValue;
        }
      }
    },
  },
};
</script>
