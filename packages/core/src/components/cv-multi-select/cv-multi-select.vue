<template>
  <div
    class="cv-multi-select bx--multi-select__wrapper bx--list-box__wrapper"
    :class="{
      'bx--multi-select__wrapper--inline bx--list-box__wrapper--inline': inline,
      'bx--multi-select__wrapper--inline--invalid bx--list-box__wrapper--inline--invalid': inline && isInvalid,
      'bx--multi-select--filterable': filterable,
    }"
    @focusout="onFocusOut"
  >
    <label v-if="title" :for="uid" class="bx--label" :class="{ 'bx--label--disabled': disabled }">{{ title }}</label>

    <div
      v-if="!inline && isHelper"
      class="bx--form__helper-text"
      :class="{ 'bx--form__helper-text--disabled': disabled }"
    >
      <slot name="helper-text">{{ helperText }}</slot>
    </div>

    <div
      role="listbox"
      tabindex="-1"
      class="bx--multi-select bx--list-box"
      :class="{
        'bx--list-box--light': theme === 'light',
        'bx--list-box--expanded': open,
        'bx--multi-select--invalid': isInvalid,
        'bx--multi-select--disabled bx--list-box--disabled': disabled,
        'bx--multi-select--inline bx--list-box--inline': inline,
        'bx--multi-select--selected': dataValue.length > 0,
        'bx--combo-box': filterable,
      }"
      :data-invalid="isInvalid"
      v-bind="$attrs"
      @keydown.down.prevent="onDown"
      @keydown.up.prevent="onUp"
      @keydown.enter.prevent="onEnter"
      @keydown.esc.prevent="onEsc"
      @click="onClick"
    >
      <WarningFilled16 v-if="isInvalid" class="bx--list-box__invalid-icon" />
      <div
        role="button"
        aria-haspopup="true"
        :aria-expanded="open"
        :aria-owns="uid"
        :aria-controls="uid"
        class="bx--list-box__field"
        tabindex="0"
        type="button"
        :aria-label="open ? 'close menu' : 'open menu'"
        data-toggle="true"
        ref="button"
      >
        <cv-tag
          :class="{ 'bx--list-box__selection--multi': filterable && dataValue.length > 0 }"
          :disabled="disabled"
          v-show="dataValue.length > 0"
          kind="filter"
          :label="`${dataValue.length}`"
          @remove="clearValues"
          ref="tag"
          :style="filterableTagOverride"
        />
        <span v-if="!filterable" class="bx--list-box__label">{{ label }}</span>
        <template v-else>
          <input
            ref="input"
            class="bx--text-input"
            :aria-controls="uid"
            aria-autocomplete="list"
            role="combobox"
            :aria-expanded="open"
            autocomplete="off"
            :placeholder="label"
            v-model="filter"
            @input="onInput"
            @focus="inputFocus"
            @click.stop.prevent="inputClick"
          />
          <div
            v-if="filter.length > 0"
            role="button"
            class="bx--list-box__selection"
            tabindex="0"
            title="Clear filter"
            @click.stop="clearFilter"
            @keydown.enter.stop.prevent="clearFilter"
            @keydown.space.stop.prevent
            @keyup.space.stop.prevent="clearFilter"
          >
            <Close16 />
          </div>
        </template>
        <div class="bx--list-box__menu-icon" :class="{ 'bx--list-box__menu-icon--open': open }" role="button">
          <chevron-down-16 :aria-label="open ? 'Close menu' : 'Open menu'" />
        </div>
      </div>

      <div :id="uid" class="bx--list-box__menu" role="listbox" ref="list">
        <div
          v-for="(item, index) in dataOptions"
          :key="`multi-select-${index}`"
          class="bx--list-box__menu-item"
          :class="{ 'bx--list-box__menu-item--highlighted': highlighted === item.value }"
          ref="option"
          @click.stop.prevent="onItemClick(item.value)"
          @mousemove="onMousemove(item.value)"
          @mousedown.prevent
        >
          <div class="bx--list-box__menu-item__option">
            <cv-checkbox
              tabindex="-1"
              :form-item="false"
              v-model="dataValue"
              :value="item.value"
              :name="item.name"
              :data-test="item.name"
              :label="item.label"
              style="pointer-events: none;"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isInvalid && !inline" class="bx--form-requirement">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import themeMixin from '../../mixins/theme-mixin';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import ChevronDown16 from '@carbon/icons-vue/es/chevron--down/16';
import Close16 from '@carbon/icons-vue/es/close/16';
import uidMixin from '../../mixins/uid-mixin';
import CvCheckbox from '../cv-checkbox/cv-checkbox';
import CvTag from '../cv-tag/cv-tag';

const TOP_AFTER_REOPEN = 0;
const TOP = 1;
const FIXED = 2;
const selectionFeedbackOptions = ['top-after-reopen', 'top', 'fixed'];

export default {
  name: 'CvMultiSelect',
  inheritAttrs: false,
  mixins: [themeMixin, uidMixin],
  components: { WarningFilled16, ChevronDown16, CvCheckbox, CvTag, Close16 },
  props: {
    autoFilter: Boolean,
    autoHighlight: Boolean,
    disabled: Boolean,
    inline: Boolean,
    invalidMessage: { type: String, default: undefined },
    helperText: { type: String, default: undefined },
    title: String,
    label: {
      type: String,
      default: 'Choose options',
    },
    highlight: String,
    value: { type: Array, default: () => [] },
    // initial value of the multi-select,
    // options in the form
    // [{ label: '', value: '', name: ''}]
    options: {
      type: Array,
      required: true,
      validator(list) {
        const result = list.every(
          item => typeof item.name === 'string' && typeof item.label === 'string' && typeof item.value === 'string'
        );
        if (!result) {
          console.warn('CvMultiSelect - all options must have name, label and value');
        }
        return result;
      },
    },
    selectionFeedback: {
      type: String,
      default: selectionFeedbackOptions[TOP_AFTER_REOPEN],
      validator(val) {
        if (!selectionFeedbackOptions.includes(val)) {
          console.warn(`CvMultiSelect: invalid selectionFeedback "${val}", use one of ${selectionFeedbackOptions}`);
          return false;
        }
        return true;
      },
    },
    filterable: Boolean,
  },
  data() {
    return {
      open: false,
      dataOptions: null,
      dataValue: '',
      dataHighlighted: null,
      dataFilter: '',
      isHelper: false,
      isInvalid: false,
    };
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  watch: {
    highlight() {
      this.highlighted = this.highlight;
    },
    value() {
      this.dataValue = this.value.filter(item => this.dataOptions.some(opt => opt.value === item.trim()));
    },
    options() {
      this.updateOptions();
    },
    selectionFeedback() {
      this.updateOptions();
    },
  },
  created() {
    this.updateOptions();
    this.dataValue = this.value.filter(item => this.dataOptions.some(opt => opt.value === item.trim()));
  },
  mounted() {
    this.highlighted = this.value ? this.value : this.highlight; // override highlight with value if provided
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
  },
  computed: {
    highlighted: {
      get() {
        return this.dataHighlighted;
      },
      set(val) {
        let firstMatchIndex = this.dataOptions.findIndex(item => item.value === val);
        if (firstMatchIndex < 0) {
          firstMatchIndex = this.dataOptions.length ? 0 : -1;
          this.dataHighlighted = firstMatchIndex >= 0 ? this.dataOptions[0].value : '';
        } else {
          this.dataHighlighted = val;
        }
        if (firstMatchIndex >= 0) {
          this.$nextTick(() => {
            // $nextTick to prevent highlight check ahead of list update on filter
            this.checkHighlightPosition(firstMatchIndex);
          });
        }
      },
    },
    filter: {
      get() {
        return this.dataFilter;
      },
      set(val) {
        this.dataFilter = val ? val : '';
        this.$emit('filter', val);
      },
    },
    filterableTagOverride() {
      // <style carbon tweaks - DO NOT USE STYLE TAG as it causes SSR issues
      return this.filterable ? { marginTop: 0, marginBottom: 0 } : {};
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    clearFilter() {
      this.filter = '';
      this.$refs.input.focus();
      this.doOpen(true);
      this.updateOptions();
    },
    checkHighlightPosition(newHiglight) {
      if (this.$refs.list && this.$refs.option) {
        if (this.$refs.list.scrollTop > this.$refs.option[newHiglight].offsetTop) {
          this.$refs.list.scrollTop = this.$refs.option[newHiglight].offsetTop;
        } else if (
          this.$refs.list.scrollTop + this.$refs.list.clientHeight <
          this.$refs.option[newHiglight].offsetTop + this.$refs.option[newHiglight].offsetHeight
        ) {
          this.$refs.list.scrollTop =
            this.$refs.option[newHiglight].offsetTop +
            this.$refs.option[newHiglight].offsetHeight -
            this.$refs.list.clientHeight;
        }
      }
    },
    doMove(up) {
      if (this.dataOptions.length > 0) {
        // requery could have changed
        const currentHighlight = this.dataOptions.findIndex(item => item.value === this.highlighted);
        let newHiglight;

        if (up) {
          if (currentHighlight <= 0) {
            newHiglight = this.dataOptions.length - 1;
          } else {
            newHiglight = currentHighlight - 1;
          }
        } else {
          if (currentHighlight >= this.dataOptions.length - 1) {
            newHiglight = 0;
          } else {
            newHiglight = currentHighlight + 1;
          }
        }
        this.highlighted = this.dataOptions[newHiglight].value;
        // this.checkHighlightPosition(newHiglight);
      }
    },
    updateOptions() {
      if (this.autoFilter) {
        const escFilter = this.filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pat = new RegExp(escFilter, 'iu');
        this.dataOptions = this.options.filter(opt => pat.test(opt.label)).slice(0);
      } else {
        this.dataOptions = this.options.slice(0);
      }
      if (this.highlight !== this.highlighted) {
        this.highlighted = this.highlight;
      }

      // multi select unique part
      if (!this.sorting && this.selectionFeedback !== selectionFeedbackOptions[FIXED]) {
        // if included in data value move to top
        this.dataOptions.sort(
          (a, b) => (this.dataValue.includes(a.value) ? -1 : 1) - (this.dataValue.includes(b.value) ? -1 : 1)
        );
      }
    },
    updateHighlight() {
      let firstMatchIndex;
      if (this.autoHighlight && this.dataOptions.length > 0) {
        // then highlight first match
        const filterRegex = new RegExp(this.filter, 'iu');
        firstMatchIndex = this.dataOptions.findIndex(item => filterRegex.test(item.label));
        if (firstMatchIndex < 0) {
          firstMatchIndex = 0;
        }
        this.highlighted = this.dataOptions[firstMatchIndex].value;
        // this.checkHighlightPosition(firstMatchIndex);
      }
    },
    onInput() {
      this.doOpen(true);

      this.updateOptions();
      this.updateHighlight();
    },
    doOpen(newVal) {
      if (newVal && !this.open && this.selectionFeedback === selectionFeedbackOptions[TOP_AFTER_REOPEN]) {
        this.updateOptions();
      }
      this.open = newVal;
    },
    onDown() {
      if (!this.open) {
        this.doOpen(true);
      } else {
        this.doMove(false);
      }
    },
    onUp() {
      if (this.open) {
        this.doMove(true);
      }
    },
    inputOrButtonFocus() {
      if (this.filterable) {
        this.$refs.input.focus();
      } else {
        this.$refs.button.focus();
      }
    },
    onEsc() {
      this.doOpen(false);
      this.inputOrButtonFocus();
    },
    onEnter() {
      if (this.open) {
        this.onItemClick(this.highlighted);
        this.$refs.input.focus();
        this.filter = '';

        this.doOpen(false);
        this.updateOptions();
      } else {
        this.doOpen(true);
      }
    },
    onClick(ev) {
      if (this.disabled) {
        ev.preventDefault();
      } else {
        if (this.open) {
          this.inputOrButtonFocus();
          // done this way round otherwise will auto open on focus.
          this.$nextTick(() => {
            this.doOpen(false);
          });
        } else {
          this.doOpen(true);
          this.inputOrButtonFocus();
        }
      }
    },
    clearValues() {
      this.dataValue = [];
      this.inputOrButtonFocus();
      this.$emit('change', this.dataValue);
    },
    onFocusOut(ev) {
      if (!this.$el.contains(ev.relatedTarget) && !this.$refs.tag.$el.contains(ev.target)) {
        this.doOpen(false);
      }
    },
    onMousemove(val) {
      this.highlighted = val;
    },
    onItemClick(val) {
      const index = this.dataValue.findIndex(item => val === item);
      if (index > -1) {
        this.dataValue.splice(index, 1);
      } else {
        this.dataValue.push(val);
      }
      if (this.selectionFeedback === selectionFeedbackOptions[TOP]) {
        this.updateOptions();
      }
      this.$refs.button.focus();
      this.$emit('change', this.dataValue);
    },
    inputClick() {
      if (!this.open) {
        this.doOpen(true);
      }
    },
    inputFocus() {
      this.doOpen(true);
    },
  },
};
</script>
