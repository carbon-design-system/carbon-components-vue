<template>
  <div
    ref="el"
    :class="[
      `cv-multi-select ${carbonPrefix}--multi-select__wrapper ${carbonPrefix}--list-box__wrapper`,
      {
        [`${carbonPrefix}--multi-select__wrapper--inline`]: inline,
        [`${carbonPrefix}--list-box__wrapper--inline`]: inline,
        [`${carbonPrefix}--multi-select__wrapper--inline--invalid]`]:
          inlineInvalid,
        [`${carbonPrefix}--list-box__wrapper--inline--invalid`]: inlineInvalid,
        [`${carbonPrefix}--multi-select--filterable`]: isFilterable,
      },
    ]"
    @focusout="onFocusOut"
  >
    <label
      v-if="title"
      :id="`${uid}-label`"
      :class="[
        `${carbonPrefix}--label`,
        { [`${carbonPrefix}--label--disabled`]: disabled },
      ]"
      >{{ title }}</label
    >
    <div
      :aria-labelledby="`${uid}-label`"
      role="listbox"
      tabindex="-1"
      :class="[
        `${carbonPrefix}--multi-select ${carbonPrefix}--list-box`,
        {
          [`${carbonPrefix}--list-box--up`]: isDirectionUp,
          [`${carbonPrefix}--list-box--light`]: isLight,
          [`${carbonPrefix}--list-box--expanded`]: data.open,
          [`${carbonPrefix}--multi-select--warning`]: isWarning,
          [`${carbonPrefix}--list-box--warning`]: isWarning,
          [`${carbonPrefix}--multi-select--invalid`]: data.isInvalid,
          [`${carbonPrefix}--multi-select--disabled`]: disabled,
          [`${carbonPrefix}--list-box--disabled`]: disabled,
          [`${carbonPrefix}--multi-select--inline`]: inline,
          [`${carbonPrefix}--list-box--inline`]: inline,
          [`${carbonPrefix}--multi-select--selected`]:
            data.selectedItems.length > 0,
          [`${carbonPrefix}--combo-box`]: isFilterable,
        },
      ]"
      :data-invalid="data.isInvalid || null"
      v-bind="$attrs"
      @keydown.down.prevent="onDown"
      @keydown.up.prevent="onUp"
      @keydown.enter.prevent="onEnter"
      @keydown.esc.prevent="onEsc"
      @click="onClick"
    >
      <warning-alt-filled
        v-if="isWarning"
        :class="`${carbonPrefix}--list-box__invalid-icon ${carbonPrefix}--list-box__invalid-icon--warning`"
      />
      <warning-filled
        v-if="data.isInvalid"
        :class="`${carbonPrefix}--list-box__invalid-icon`"
      />
      <button
        ref="elButton"
        type="button"
        :class="`${carbonPrefix}--list-box__field`"
        :aria-disabled="disabled || null"
        aria-haspopup="listbox"
        :aria-expanded="data.open ? 'true' : 'false'"
        :aria-owns="uid"
        :aria-controls="uid"
        tabindex="0"
        :aria-label="data.open ? 'close menu' : 'open menu'"
        data-toggle="true"
      >
        <span ref="elTag">
          <cv-tag
            v-if="data.selectedItems.length > 0"
            :class="{
              [`${carbonPrefix}--list-box__selection--multi`]:
                isFilterable && data.selectedItems.length > 0,
            }"
            :disabled="disabled"
            :kind="filterTagKind"
            :filter="true"
            :label="`${data.selectedItems.length}`"
            :style="filterableTagOverride"
            @remove="clearValues"
          />
        </span>
        <span
          v-if="!isFilterable"
          :class="`${carbonPrefix}--list-box__label`"
          >{{ label }}</span
        >
        <template v-else>
          <input
            ref="elInput"
            v-model="internalFilter"
            :class="[
              `${carbonPrefix}--text-input`,
              {
                [`${carbonPrefix}--text-input--empty`]:
                  !internalFilter || internalFilter.length === 0,
              },
            ]"
            :aria-controls="uid"
            aria-autocomplete="list"
            role="combobox"
            :aria-expanded="data.open ? 'true' : 'false'"
            autocomplete="off"
            :placeholder="label"
            @input="onInput"
            @focus="inputFocus"
            @click.stop.prevent="inputClick"
          />
          <div
            v-if="internalFilter.length > 0"
            role="button"
            :class="`${carbonPrefix}--list-box__selection`"
            tabindex="0"
            title="Clear filter"
            @click.stop="clearFilter"
            @keydown.enter.stop.prevent="clearFilter"
            @keydown.space.stop.prevent
            @keyup.space.stop.prevent="clearFilter"
          >
            <close-icon :style="moveCloseIcon" />
          </div>
        </template>
        <div
          :class="[
            `${carbonPrefix}--list-box__menu-icon`,
            { [`${carbonPrefix}--list-box__menu-icon--open`]: data.open },
          ]"
          role="button"
        >
          <chevron-down :aria-label="data.open ? 'Close menu' : 'Open menu'" />
        </div>
      </button>

      <div
        :id="uid"
        ref="elList"
        :aria-labelledby="`${uid}-label`"
        :class="`${carbonPrefix}--list-box__menu`"
        role="listbox"
      >
        <div
          v-for="(item, index) in data.options"
          ref="elOption"
          :key="`multi-select-${index}`"
          role="menuitem"
          :class="[
            `${carbonPrefix}--list-box__menu-item`,
            {
              [`${carbonPrefix}--list-box__menu-item--highlighted`]:
                highlighted === item.value,
            },
          ]"
          @click.stop.prevent="onItemClick(item.value)"
          @mousemove="onMousemove(item.value)"
          @mousedown.prevent
        >
          <div :class="`${carbonPrefix}--list-box__menu-item__option`">
            <cv-checkbox
              v-model="data.selectedItems"
              tabindex="-1"
              :form-item="false"
              :value="item.value"
              :name="item.name"
              :label="item.label"
              :disabled="item.disabled"
              style="pointer-events: none"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.isInvalid" :class="`${carbonPrefix}--form-requirement`">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div v-else-if="isWarning" :class="`${carbonPrefix}--form-requirement`">
      <slot name="warning-message">{{ warningMessage }}</slot>
    </div>
    <div
      v-if="isHelper"
      :class="[
        `${carbonPrefix}--form__helper-text`,
        { [`${carbonPrefix}--form__helper-text--disabled`]: disabled },
      ]"
    >
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
  </div>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import { props as propsTheme, useIsLight } from '../../use/cvTheme';
import WarningFilled from '@carbon/icons-vue/es/warning--filled/16';
import WarningAltFilled from '@carbon/icons-vue/es/warning--alt--filled/16';
import ChevronDown from '@carbon/icons-vue/es/chevron--down/16';
import CloseIcon from '@carbon/icons-vue/es/close/16';
import CvCheckbox from '../CvCheckbox/CvCheckbox.vue';
import CvTag from '../CvTag/CvTag.vue';
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';
import {
  DIRECTION_BOTTOM,
  DIRECTION_TOP,
  DIRECTIONS,
  FIXED,
  selectionFeedbackOptions,
  TOP,
  TOP_AFTER_REOPEN,
} from './consts';
import { tagKinds } from '../CvTag/consts';

defineOptions({
  inheritAttrs: false,
});

/**
 * Select options shape
 * @typedef {Object} MultiSelectOption
 * @property {string} name
 * @property {string} label
 * @property {string} value
 * @property {boolean|undefined} disabled
 */

const props = defineProps({
  /**
   * Automatically filter items based on label
   */
  autoFilter: { type: Boolean, default: false },
  /**
   * Highlight the first filtered item match. Requires either `autoFilter`
   * or `filterable` to be `true`.
   */
  autoHighlight: { type: Boolean, default: false },
  /**
   * Specify the direction of the multiselect dropdown. Can be either `top` or `bottom`.
   */
  direction: {
    type: String,
    default: DIRECTION_BOTTOM,
    validator: val => DIRECTIONS.includes(val),
  },
  /**
   * Disable the control
   */
  disabled: { type: Boolean, default: false },
  /**
   * enable filterable multi-select. User must manually update the options in response to the `filter` event.
   */
  filterable: { type: Boolean, default: false },
  /**
   * A CvTag is displayed for sections and this property controls the color/kind on tag shown.
   */
  filterTagKind: {
    type: String,
    default: 'high-contrast',
    validator: val => tagKinds.includes(val),
  },
  /**
   * Provide helper text that is used alongside the control label for additional help
   */
  helperText: { type: String, default: undefined },
  /**
   * The value of an option to initially highlight
   */
  highlight: { type: String, default: undefined },
  /**
   * Specify 'true' to create an inline multi-select.
   */
  inline: { type: Boolean, default: false },
  /**
   * Message which is displayed if the value is invalid.
   */
  invalidMessage: { type: String, default: undefined },
  /**
   * Generic label that will be used as the textual representation of what this field is for
   */
  label: {
    type: String,
    default: 'Choose options',
  },
  /***
   * options in the form [{ label: '', value: '', name: '', disabled: false}]
   * Array<MultiSelectOption>
   */
  options: {
    type: Array,
    required: true,
    validator(list) {
      const result = list.every(
        item =>
          typeof item.name === 'string' &&
          typeof item.label === 'string' &&
          typeof item.value === 'string'
      );
      if (!result) {
        console.warn(
          'CvMultiSelect - all options must have name, label and value'
        );
      }
      return result;
    },
  },
  /**
   * Specify feedback (mode) of the selection.
   * - top: selected item jumps to top
   * - fixed: selected item stays at its position
   * - top-after-reopen: selected items jump to top after reopening dropdown
   */
  selectionFeedback: {
    type: String,
    default: selectionFeedbackOptions[TOP_AFTER_REOPEN],
    validator(val) {
      if (!selectionFeedbackOptions.includes(val)) {
        console.warn(
          `CvMultiSelect: invalid selectionFeedback "${val}", use one of ${selectionFeedbackOptions}`
        );
        return false;
      }
      return true;
    },
  },
  /**
   * Provide text to be used in a <label> element that is tied to the multiselect via ARIA attributes.
   */
  title: { type: String, default: undefined },
  /***
   * Allow users to pass in arbitrary items from their collection that are pre-selected
   */
  value: { type: Array, default: () => [] },
  /**
   * Provide the text that is displayed and put the control in warning state
   */
  warningMessage: { type: String, default: undefined },
  modelValue: {
    type: Array,
    validator: val => {
      console.error(
        `v-model for cv-multi-select is deprecated. Specify "v-model:value" instead [${val}]`
      );
      return true;
    },
    default: undefined,
  },
  ...propsCvId,
  ...propsTheme,
});
const uid = useCvId(props, true);
const isLight = useIsLight(props);

const data = reactive({
  open: false,
  /***
   * Array<MultiSelectOption>
   */
  options: [],
  selectedItems: [],
  highlighted: null,
  filter: '',
  isHelper: false,
  isWarning: false,
  isInvalid: false,
});
const emit = defineEmits(['update:value', 'change', 'filter']);
watch(
  () => data.selectedItems,
  () => {
    if (JSON.stringify(data.selectedItems) !== JSON.stringify(props.value)) {
      emit('change', data.selectedItems);
      emit('update:value', data.selectedItems);
    }
  },
  {
    deep: true,
  }
);

const isDirectionUp = computed(() => {
  return props.direction === DIRECTION_TOP;
});
const moveCloseIcon = computed(() => {
  if (isWarning.value || data.isInvalid)
    return { left: '-1rem', position: 'relative' };
  else return undefined;
});
const inlineInvalid = computed(() => {
  return props.inline && data.isInvalid;
});
const isFilterable = computed(() => {
  return props.filterable || props.autoFilter;
});

function updateSelectedItems() {
  data.selectedItems = props.value.filter(
    /***
     * @param {string} item
     * @returns {boolean}
     */
    item =>
      data.options.some(
        /***
         * @param {MultiSelectOption} opt
         * @returns {boolean}
         */
        opt => opt.value === item.trim()
      )
  );
}

const slots = useSlots();
onMounted(checkSlots);
onUpdated(checkSlots);
onMounted(updateOptions);
onMounted(updateSelectedItems);

watch(() => props.value, updateSelectedItems);
watch(() => props.options, updateOptions);
watch(() => props.selectionFeedback, updateOptions);

const highlighted = computed({
  get() {
    return data.highlighted;
  },
  set(val) {
    let firstMatchIndex = data.options.findIndex(
      /***
       * @param {MultiSelectOption} item
       * @returns {boolean}
       */
      item => item.value === val
    );
    if (firstMatchIndex < 0) {
      firstMatchIndex = data.options.length ? 0 : -1;
      data.highlighted = firstMatchIndex >= 0 ? data.options[0].value : '';
    } else {
      data.highlighted = val;
    }
    if (firstMatchIndex >= 0) {
      nextTick(() => {
        // $nextTick to prevent highlight check ahead of list update on filter
        checkHighlightPosition(firstMatchIndex);
      });
    }
  },
});
onMounted(() => {
  highlighted.value = props.value ? props.value : props.highlight; // override highlight with value if provided
});

const internalFilter = computed({
  get() {
    return data.filter;
  },
  set(val) {
    data.filter = val ? val : '';
    emit('filter', val);
  },
});
const filterableTagOverride = computed(() => {
  // <style carbon tweaks - DO NOT USE STYLE TAG as it causes SSR issues
  return props.filterable ? { marginTop: 0, marginBottom: 0 } : {};
});

const elInput = ref(null);
const elList = ref(null);
const elOption = ref(null);
const elButton = ref(null);
const el = ref(null);
const elTag = ref(null);

function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  data.isInvalid = !!(slots['invalid-message'] || props.invalidMessage?.length);
  data.isWarning = !!(slots['warning-message'] || props.warningMessage?.length);
  data.isHelper = !!(slots['helper-text'] || props.helperText?.length);
}
const isWarning = computed(() => {
  if (data.isInvalid) return false;
  else return !!data.isWarning;
});
const isHelper = computed(() => {
  if (data.isInvalid || props.inline || isWarning.value) return false;
  else return !!data.isHelper;
});

function clearFilter() {
  internalFilter.value = '';
  elInput.value?.focus();
  doOpen(true);
  updateOptions();
}
function checkHighlightPosition(newHighlight) {
  if (elList.value && elOption.value && elOption.value[newHighlight]) {
    if (elList.value?.scrollTop >= elOption.value[newHighlight].offsetTop) {
      elList.value.scrollTop = elOption.value[newHighlight].offsetTop;
    } else if (
      elList.value.scrollTop + elList.value.clientHeight <
      elOption.value[newHighlight].offsetTop +
        elOption.value[newHighlight].offsetHeight
    ) {
      elList.value.scrollTop =
        elOption.value[newHighlight].offsetTop +
        elOption.value[newHighlight].offsetHeight -
        elList.value.clientHeight;
    }
  }
}
function doMove(up) {
  if (data.options.length > 0) {
    // re-query could have changed
    const currentHighlight = data.options.findIndex(
      /***
       * @param {MultiSelectOption} item
       * @returns {boolean}
       */
      item => item.value === highlighted.value
    );
    let newHighlight;

    if (up) {
      if (currentHighlight <= 0) {
        newHighlight = data.options.length - 1;
      } else {
        newHighlight = currentHighlight - 1;
      }
    } else {
      if (currentHighlight >= data.options.length - 1) {
        newHighlight = 0;
      } else {
        newHighlight = currentHighlight + 1;
      }
    }
    highlighted.value = data.options[newHighlight].value;
  }
}
function updateOptions() {
  if (props.autoFilter) {
    const escFilter = internalFilter.value.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );
    const pat = new RegExp(escFilter, 'iu');
    data.options = props.options.filter(opt => pat.test(opt.label)).slice(0);
  } else {
    data.options = props.options.slice(0);
  }
  highlighted.value = props.highlight;

  // multi select unique part
  if (props.selectionFeedback !== selectionFeedbackOptions[FIXED]) {
    // if included in data value move to top
    data.options.sort(
      /***
       * @param {MultiSelectOption} a
       * @param {MultiSelectOption} b
       * @returns {number}
       */
      (a, b) =>
        (data.selectedItems.includes(a.value) ? -1 : 1) -
        (data.selectedItems.includes(b.value) ? -1 : 1)
    );
  }
}
function updateHighlight() {
  let firstMatchIndex;
  if (props.autoHighlight && data.options.length > 0) {
    // then highlight first match
    const filterRegex = new RegExp(internalFilter.value, 'iu');
    firstMatchIndex = data.options.findIndex(
      /***
       * @param {MultiSelectOption} item
       * @returns {boolean}
       */
      item => filterRegex.test(item.label)
    );
    if (firstMatchIndex < 0) {
      firstMatchIndex = 0;
    }
    highlighted.value = data.options[firstMatchIndex].value;
  }
}
function onInput() {
  doOpen(true);

  updateOptions();
  updateHighlight();
}
function doOpen(newVal) {
  if (
    newVal &&
    !data.open &&
    props.selectionFeedback === selectionFeedbackOptions[TOP_AFTER_REOPEN]
  ) {
    updateOptions();
  }
  data.open = newVal;
}
function onDown() {
  if (!data.open) {
    doOpen(true);
  } else {
    doMove(false);
  }
}
function onUp() {
  if (data.open) {
    doMove(true);
  }
}
function inputOrButtonFocus() {
  if (props.filterable) {
    elInput.value?.focus();
  } else {
    elButton.value?.focus();
  }
}
function onEsc() {
  doOpen(false);
  inputOrButtonFocus();
}
function onEnter() {
  if (data.open) {
    onItemClick(highlighted.value);
    elInput.value?.focus();
    internalFilter.value = '';

    doOpen(false);
    updateOptions();
  } else {
    doOpen(true);
  }
}
function onClick(ev) {
  if (props.disabled) {
    ev.preventDefault();
  } else {
    if (data.open) {
      inputOrButtonFocus();
      // done this way round otherwise will auto open on focus.
      nextTick(() => {
        doOpen(false);
      });
    } else {
      doOpen(true);
      inputOrButtonFocus();
    }
  }
}
function clearValues() {
  data.selectedItems = [];
  inputOrButtonFocus();
}
function onFocusOut(ev) {
  if (
    !el.value?.contains(ev.relatedTarget) &&
    !elTag.value?.contains(ev.target)
  ) {
    doOpen(false);
  }
}
function onMousemove(val) {
  highlighted.value = val;
}
function onItemClick(val) {
  const option = props.options.find(item => item.value === val);
  if (option && !option.disabled) {
    const index = data.selectedItems.findIndex(item => val === item);
    if (index > -1) {
      data.selectedItems.splice(index, 1);
    } else {
      data.selectedItems.push(val);
    }
    if (props.selectionFeedback === selectionFeedbackOptions[TOP]) {
      updateOptions();
    }
    elButton.value?.focus();
  }
}
function inputClick() {
  if (!data.open) {
    doOpen(true);
  }
}
function inputFocus() {
  doOpen(true);
}
</script>
