<template>
  <div class="cv-combo-box" :class="`${carbonPrefix}--list-box__wrapper`" @focusout="onFocusOut">
    <label
      v-if="title"
      :for="uid"
      :class="[`${carbonPrefix}--label`, { [`${carbonPrefix}--label--disabled`]: disabled }]"
      >{{ title }}</label
    >

    <div
      role="listbox"
      tabindex="-1"
      class=""
      :class="[
        `${carbonPrefix}--combo-box ${carbonPrefix}--list-box`,
        {
          [`${carbonPrefix}--list-box--light`]: isLight,
          [`${carbonPrefix}--combo-box--expanded`]: open,
          [`${carbonPrefix}--list-box--expanded`]: open,
          [`${carbonPrefix}--combo-box--disabled ${carbonPrefix}--list-box--disabled`]: disabled,
        },
      ]"
      :data-invalid="isInvalid"
      v-bind="$attrs"
      @keydown.down.prevent="onDown"
      @keydown.up.prevent="onUp"
      @keydown.enter.prevent="onEnter"
      @keydown.esc.prevent="onEsc"
      @click="onClick"
    >
      <WarningFilled16 v-if="isInvalid" :class="[`${carbonPrefix}--list-box__invalid-icon`]" />
      <div
        role="button"
        aria-haspopup="true"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-owns="uid"
        :aria-controls="uid"
        :class="[`${carbonPrefix}--list-box__field`]"
        tabindex="-1"
        type="button"
        :aria-label="open ? 'close menu' : 'open menu'"
        data-toggle="true"
        ref="button"
      >
        <input
          ref="input"
          :class="[
            `${carbonPrefix}--text-input`,
            { [`${carbonPrefix}--text-input--empty`]: !filter || filter.length === 0 },
          ]"
          :aria-controls="uid"
          aria-autocomplete="list"
          role="combobox"
          :aria-disabled="disabled"
          :aria-expanded="open ? 'true' : 'false'"
          autocomplete="off"
          :disabled="disabled"
          :placeholder="label"
          v-model="filter"
          @input="onInput"
          @focus="inputFocus"
          @click.stop.prevent="inputClick"
        />
        <div
          v-if="filter"
          role="button"
          :class="[`${carbonPrefix}--list-box__selection`]"
          tabindex="0"
          title="Clear filter"
          @click.stop="clearFilter"
          @keydown.enter.stop.prevent="clearFilter"
          @keydown.space.stop.prevent
          @keyup.space.stop.prevent="clearFilter"
        >
          <Close16 />
        </div>

        <div
          :class="[`${carbonPrefix}--list-box__menu-icon`, { [`${carbonPrefix}--list-box__menu-icon--open`]: open }]"
          role="button"
        >
          <chevron-down-16 :aria-label="open ? 'Close menu' : 'Open menu'" />
        </div>
      </div>

      <div v-show="open" :id="uid" :class="[`${carbonPrefix}--list-box__menu`]" role="listbox" ref="list">
        <div
          v-for="(item, index) in dataOptions"
          :key="`combo-box-${index}`"
          :class="[
            `${carbonPrefix}--list-box__menu-item`,
            { [`${carbonPrefix}--list-box__menu-item--highlighted`]: highlighted === item.value },
          ]"
          ref="option"
          @click.stop.prevent="onItemClick(item.value)"
          @mousemove="onMousemove(item.value)"
          @mousedown.prevent
        >
          <div :class="[`${carbonPrefix}--list-box__menu-item__option`]">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div v-if="isInvalid" :class="[`${carbonPrefix}--form-requirement`]">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div
      v-if="!isInvalid && isHelper"
      :class="[`${carbonPrefix}--form__helper-text`, { [`${carbonPrefix}--form__helper-text--disabled`]: disabled }]"
    >
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script>
import { themeMixin, uidMixin, carbonPrefixMixin, methodsMixin } from '../../mixins';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import ChevronDown16 from '@carbon/icons-vue/es/chevron--down/16';
import Close16 from '@carbon/icons-vue/es/close/16';

export default {
  name: 'CvComboBox',
  inheritAttrs: false,
  mixins: [themeMixin, uidMixin, carbonPrefixMixin, methodsMixin({ input: ['focus', 'blur'] })],
  components: { WarningFilled16, ChevronDown16, Close16 },
  props: {
    autoFilter: Boolean,
    autoHighlight: Boolean,
    disabled: Boolean,
    invalidMessage: { type: String, default: undefined },
    helperText: { type: String, default: undefined },
    title: String,
    label: {
      type: String,
      default: 'Choose options',
    },
    highlight: String,
    value: String,
    options: {
      type: Array,
      required: true,
      validator(list) {
        const result = list.every(
          item => typeof item.name === 'string' && typeof item.label === 'string' && typeof item.value === 'string'
        );
        if (!result) {
          console.warn('CvComboBox - all options must have name, label and value');
        }
        return result;
      },
    },
  },
  data() {
    return {
      open: false,
      dataOptions: null,
      dataValue: this.value,
      dataHighlighted: null,
      dataFilter: null,
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
      this.dataValue = this.value;
      this.highlighted = this.value;
      this.internalUpdateValue(this.value);
    },
    options() {
      this.updateOptions();
    },
  },
  created() {
    this.updateOptions();
  },
  mounted() {
    this.filter = this.value;
    this.highlighted = this.value ? this.value : this.highlight; // override highlight with value if provided
    this.checkSlots();
  },
  updated() {
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
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on updated
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
    clearFilter() {
      if (this.disabled) return;
      this.internalUpdateValue('');
      this.filter = '';
      this.$refs.input.focus();
      this.doOpen(true);
      this.updateOptions();
      this.$emit('change', this.dataValue);
    },
    checkHighlightPosition(newHiglight) {
      if (this.$refs.list && this.$refs.option && this.$refs.option[newHiglight]) {
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
      if (this.autoFilter && this.filter) {
        const escFilter = this.filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pat = new RegExp(escFilter, 'iu');
        this.dataOptions = this.options.filter(opt => pat.test(opt.label)).slice(0);
      } else {
        this.dataOptions = this.options.slice(0);
      }
      if (this.highlight !== this.highlighted) {
        this.highlighted = this.highlight;
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
      if (this.disabled) return;
      this.doOpen(true);

      this.updateOptions();
      this.updateHighlight();
    },
    doOpen(newVal) {
      this.open = newVal;
    },
    onDown() {
      if (this.disabled) return;
      if (!this.open) {
        this.doOpen(true);
      } else {
        this.doMove(false);
      }
    },
    onUp() {
      if (this.disabled) return;
      if (this.open) {
        this.doMove(true);
      }
    },
    onEsc() {
      if (this.disabled) return;
      this.doOpen(false);
      this.$el.focus();
    },
    onEnter() {
      if (this.disabled) return;
      this.doOpen(!this.open);
      if (!this.open) {
        this.onItemClick(this.highlighted);
        this.$refs.input.focus();
      }
    },
    onClick() {
      if (this.disabled) return;
      this.doOpen(!this.open);
      if (this.open) {
        this.$refs.input.focus();
      } else {
        this.$refs.button.focus();
      }
    },
    clearValues() {
      this.dataValue = '';
      this.$refs.input.focus();
      this.$emit('change', this.dataValue);
    },
    onFocusOut(ev) {
      if (!this.$el.contains(ev.relatedTarget)) {
        this.doOpen(false);
      }
    },
    onMousemove(val) {
      this.highlighted = val;
    },
    internalUpdateValue(val) {
      this.dataValue = val;
      const filterOption = this.dataOptions.find(item => item.value === val);
      if (filterOption) {
        this.filter = filterOption.label;
      }
    },
    onItemClick(val) {
      if (this.disabled) return;
      this.internalUpdateValue(val);
      this.$refs.input.focus();
      this.open = false; // close after user makes a selection
      this.$emit('change', this.dataValue);
    },
    inputClick() {
      if (this.disabled) return;
      if (!this.open) {
        this.doOpen(true);
      }
    },
    inputFocus() {
      if (this.disabled) return;
      this.doOpen(true);
    },
  },
};
</script>
