<template>
  <div class="cv-search bx--form-item">
    <div
      data-search
      class="bx--search"
      :class="searchClasses"
      role="search"
      ref="search"
    >
      <label :id="uid" class="bx--label" for="search__input-1">{{
        label
      }}</label>

      <input
        :id="uid"
        class="bx--search-input"
        v-bind="$attrs"
        v-model="internalValue"
        v-on="inputListeners"
        type="text"
        role="search"
        :placeholder="placeholder"
        :aria-labelledby="uid"
      />

      <svg
        class="bx--search-magnifier"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm4.936-1.27l4.563 4.557-.707.708-4.563-4.558a6.5 6.5 0 1 1 .707-.707z"
          fill-rule="nonzero"
        ></path>
      </svg>

      <button
        class="bx--search-close"
        title="Clear search input"
        aria-label="Clear search input"
        @click="onClearClick"
        v-show="clearVisible"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';

export default {
  name: 'CvSearch',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  props: {
    label: String,
    large: Boolean,
    value: String,
    placeholder: { type: String, default: 'Search' },
  },
  data() {
    return {
      clearVisible: this.value ? this.value.length : false,
      internalValue: this.value,
    };
  },
  watch: {
    value() {
      this.clearVisible = this.value ? this.value.length : false;
      this.internalValue = this.value;
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },
    searchClasses() {
      const themeClass = this.theme.length ? `bx--search--${this.theme}` : '';
      const sizeClass = `bx--search--${this.large ? 'lg' : 'sm'}`;

      return `${themeClass} ${sizeClass}`;
    },
    closeHiddenClass() {
      return this.clearVisible ? '' : 'bx--search-close--hidden';
    },
  },
  methods: {
    onClearClick() {
      this.internalValue = '';
      this.clearVisible = false;
      this.$emit('input', this.internalValue);
    },
    onInput() {
      this.clearVisible = this.internalValue.length > 0;
      this.$emit('input', this.internalValue);
    },
  },
};
</script>

<style lang="scss"></style>
