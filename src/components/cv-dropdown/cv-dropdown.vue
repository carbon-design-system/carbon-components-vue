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
  <ul
    data-dropdown
    :data-value="dataValue"
    class="cv-dropdown bx--dropdown"
    tabindex="0"
    :class="{'bx--text-input--light': theme === 'light', 'bx--dropdown--up': up, 'bx--dropdown--open': open}"
    v-bind="$attrs"
    @keypress.down.prevent="onDown"
    @keypress.up.prevent="onDown"
    @keypress.enter.prevent="toggle"
    @keypress.esc.prevent="toggle"
    @click="toggle"
  >
    <li class="bx--dropdown-text" ref="valueContent">{{placeholder}}</li>
    <svg class="bx--dropdown__arrow" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
      <path d="M10 0L5 5 0 0z"></path>
    </svg>
    <li>
      <ul class="bx--dropdown-list">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvDropdown',
  mixins: [themeMixin],
  props: {
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
    up: false,
    value: { type: String }, // initial value of the dropdown
  },
  data() {
    return {
      open: false,
      items: [],
      dataValue: '',
    };
  },
  beforeCreate() {
    console.warn(`${this.$options._componentTag}: public API under review`);
  },
  methods: {
    register(childItem) {
      this.deregister(childItem);
      this.items.push(childItem);

      console.dir(this.$children);
      return this.onChildClick;
    },
    deregister(childItem) {
      let index = this.items.findIndex(
        item => item.itemId === childItem.itemId
      );
      this.items.slice(index, index + 1);
    },
    onChildClick(childItem) {
      // requery could have changed
      const childEls = this.$el.querySelectorAll('.cv-dropdown-item');

      for (let index in this.items) {
        this.items[index].internalSelected =
          childItem.value === this.items[index].value;
      }

      this.dataValue = childItem.value;
      this.$refs.valueContent.innerHTML = childItem.internalContent;
    },
    doMove(up) {
      // requery could have changed
      let nextValue;
      let nextEl;

      if (this.dataValue.length) {
        if (up) {
          nextEl = this.$el
            .querySelector(`.cv-dropdown-item[data-value="${this.dataValue}"]`)
            .previousElementSibling();
        } else {
          nextEl = this.$el
            .querySelector(`.cv-dropdown-item[data-value="${this.dataValue}"]`)
            .nextElementSibling();
        }
      }
      if (!nextEl) {
        if (up) {
          nextValue = this.$el
            .querySelector('.cv-dropdown-item:last-child')
            .getAttribute('data-value');
        } else {
          nextValue = this.$el
            .querySelector('.cv-dropdown-item:first-child')
            .getAttribute('data-value');
        }
      } else {
        nextValue = nextEl.getAttribute('data-value');
      }

      for (let index in this.items) {
        this.items[index].internalSelected =
          nextValue === this.items[index].value;
      }
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
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss">
@import '~carbon-components/scss/components/dropdown/dropdown';
</style>
