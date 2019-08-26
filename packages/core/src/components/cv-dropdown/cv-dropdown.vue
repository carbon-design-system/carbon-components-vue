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
    <div class="bx--dropdown__wrapper" :class="{ 'bx--dropdown__wrapper--inline': inline, 'cv-dropdown': !formItem }">
      <label v-if="label" class="bx--label" :class="{ 'bx--label--disabled': $attrs.disabled }">{{ label }}</label>

      <div
        v-if="!inline && isHelper"
        class="bx--form__helper-text"
        :class="{ 'bx--form__helper-text--disabled': $attrs.disabled }"
      >
        <slot name="helper-text">{{ helperText }}</slot>
      </div>

      <ul
        data-dropdown
        :data-value="internalValue"
        :data-invalid="isInvalid"
        class="bx--dropdown"
        tabindex="0"
        :class="{
          'bx--dropdown--light': theme === 'light',
          'bx--dropdown--up': up,
          'bx--dropdown--open': open,
          'bx--dropdown--invalid': isInvalid,
          'bx--dropdown--disabled': $attrs.disabled,
          'bx--dropdown--inline': inline,
        }"
        v-bind="$attrs"
        @keydown.down.prevent="onDown"
        @keydown.up.prevent="onUp"
        @keydown.enter.prevent="onClick"
        @keydown.esc.prevent="onEsc"
        @click="onClick"
      >
        <WarningFilled16 v-if="isInvalid" class="bx--dropdown__invalid-icon" />
        <li v-if="inline" class="bx--dropdown-text" ref="valueContent">
          <span class="bx--dropdown-text__inner">{{ placeholder }}</span>
          <chevron-down-16 class="cv-dropdown__arrow bx--dropdown__arrow" />
        </li>
        <template v-else>
          <li class="bx--dropdown-text" ref="valueContent">{{ placeholder }}</li>
          <li class="bx--dropdown__arrow-container">
            <chevron-down-16 class="cv-dropdown__arrow bx--dropdown__arrow" />
          </li>
        </template>

        <li>
          <ul class="bx--dropdown-list">
            <slot></slot>
          </ul>
        </li>
      </ul>
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
import WarningFilled16 from '@rocketsoftware/icons-vue/es/warning--filled/16';
import ChevronDown16 from '@rocketsoftware/icons-vue/es/chevron--down/16';

export default {
  name: 'CvDropdown',
  inheritAttrs: false,
  mixins: [themeMixin],
  components: { WarningFilled16, ChevronDown16 },
  props: {
    formItem: { type: Boolean, default: true },
    inline: Boolean,
    invalidMessage: { type: String, default: null },
    helperText: { type: String, default: null },
    label: String,
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
    up: Boolean,
    value: String, // initial value of the dropdown,
  },
  data() {
    return {
      open: false,
      dataValue: this.value,
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
    isInvalid() {
      return this.$slots['invalid-message'] !== undefined || (this.invalidMessage && this.invalidMessage.length);
    },
    isHelper() {
      return this.$slots['helper-text'] !== undefined || (this.helperText && this.helperText.length);
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
            this.$refs.valueContent.innerHTML = child.internalContent;
          }
        }
        if (this.dataValue !== val) {
          // only raise event on change
          this.dataValue = val;
          this.$emit('change', this.dataValue);
        }
      },
    },
  },
  methods: {
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
        this.internalValue = null;
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
      this.open = !this.open;
      if (!this.open) {
        this.$el.focus();
      }

      if (ev.target.classList.contains('bx--dropdown-link')) {
        const targetItemEl = ev.target.parentNode;
        const newValue = targetItemEl.getAttribute('data-value');

        this.internalValue = newValue;
      }
    },
  },
};
</script>
