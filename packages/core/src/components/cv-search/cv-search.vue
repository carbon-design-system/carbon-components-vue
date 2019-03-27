<template>
  <cv-wrapper :tag-type="formItem ? 'div' : ''" class="cv-search bx--form-item">
    <div class="bx--search" :class="[searchClasses, { 'cv-search': !formItem }]" role="search" ref="search">
      <label :for="uid" class="bx--label">{{ label }}</label>

      <input
        :id="uid"
        class="bx--search-input"
        v-bind="$attrs"
        v-model="internalValue"
        v-on="inputListeners"
        type="text"
        role="search"
        ref="input"
        :placeholder="placeholder"
        :aria-labelledby="uid"
        @focusout="checkFocus"
      />

      <button
        type="button"
        v-if="isToolbarKind"
        class="bx--toolbar-search__btn"
        aria-label="Toolbar search"
        @click="toggleActive(true)"
        @focusout="checkFocus"
      >
        <Search16 v-if="componentsX" class="bx--search-magnifier" />
        <svg v-else class="bx--search-magnifier" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm4.936-1.27l4.563 4.557-.707.708-4.563-4.558a6.5 6.5 0 1 1 .707-.707z"
            fill-rule="nonzero"
          ></path>
        </svg>
      </button>
      <Search16 v-if="componentsX" class="bx--search-magnifier" />
      <svg
        v-if="!componentsX && !isToolbarKind"
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
        type="button"
        class="bx--search-close"
        :class="{ 'bx--search-close--hidden': !clearVisible }"
        title="Clear search input"
        aria-label="Clear search input"
        @click="onClearClick"
      >
        <Close16 v-if="componentsX" />
        <svg v-else width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </cv-wrapper>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import { componentsX } from '../../_internal/_feature-flags';
import Search16 from '@carbon/icons-vue/lib/search/16';
import Close16 from '@carbon/icons-vue/lib/close/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvSearch',
  mixins: [uidMixin, themeMixin],
  components: { Close16, Search16, CvWrapper },
  inheritAttrs: false,
  props: {
    formItem: { type: Boolean, default: true },
    kind: { type: String, default: null },
    label: String,
    large: Boolean,
    value: String,
    placeholder: { type: String, default: 'Search' },
  },
  data() {
    return {
      componentsX,
      clearVisible: this.value ? this.value.length : false,
      internalValue: this.value,
      toolbarActive: false,
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
      let toolbarClasses = '';
      if (this.isToolbarKind) {
        toolbarClasses = this.toolbarActive ? 'bx--toolbar-search bx--toolbar-search--active' : 'bx--toolbar-search';
      }
      return `${themeClass} ${sizeClass} ${toolbarClasses}`;
    },
    closeHiddenClass() {
      return this.clearVisible ? '' : 'bx--search-close--hidden';
    },
    isToolbarKind() {
      return this.kind === 'toolbar';
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
      return this.$emit('input', this.internalValue);
    },
    toggleActive(force) {
      if (typeof force === 'boolean') {
        this.toolbarActive = force;
      } else {
        this.toolbarActive = !this.toolbarActive;
      }
      if (this.toolbarActive) {
        this.$refs.input.focus();
      }
    },
    checkFocus(ev) {
      if (this.isToolbarKind) {
        if (!this.$el.contains(ev.relatedTarget)) {
          this.toolbarActive = false;
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
