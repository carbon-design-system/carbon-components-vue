<template>
  <div
    ref="root"
    :class="`${carbonPrefix}--list-box__wrapper`"
    @focusout="onFocusOut"
  >
    <label
      v-if="title"
      :for="cvId"
      :class="[
        `${carbonPrefix}--label`,
        { [`${carbonPrefix}--label--disabled`]: disabled },
      ]"
      dir="auto"
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
          [`${carbonPrefix}--list-box--expanded`]: open,
          [`${carbonPrefix}--list-box--disabled`]: disabled,
        },
      ]"
      :data-invalid="isInvalid ? 'true' : undefined"
      v-bind="$attrs"
      @keydown.down.prevent="onDown"
      @keydown.up.prevent="onUp"
      @keydown.enter.prevent="onEnter"
      @keydown.esc.prevent="onEsc"
      @click="onClick"
    >
      <div
        role="button"
        aria-haspopup="true"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-owns="cvId"
        :aria-controls="cvId"
        :class="[`${carbonPrefix}--list-box__field`]"
        tabindex="-1"
        :aria-label="open ? 'close menu' : 'open menu'"
        data-toggle="true"
        ref="button"
      >
        <input
          ref="input"
          :class="[
            `${carbonPrefix}--text-input`,
            {
              [`${carbonPrefix}--text-input--empty`]:
                !filter || filter.length === 0,
            },
          ]"
          :aria-controls="cvId"
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
        <warning-filled16
          v-if="isInvalid"
          :class="[`${carbonPrefix}--list-box__invalid-icon`]"
        />
        <button
          v-if="filter"
          role="button"
          type="button"
          :class="[`${carbonPrefix}--list-box__selection`]"
          tabindex="0"
          aria-label="Clear selected item"
          title="Clear selected item"
          @click.stop="clearFilter"
          @keydown.enter.stop.prevent="clearFilter"
          @keydown.space.stop.prevent
          @keyup.space.stop.prevent="clearFilter"
        >
          <close16 aria-hidden="true" focusable="false" />
        </button>
        <button
          :class="[
            `${carbonPrefix}--list-box__menu-icon`,
            { [`${carbonPrefix}--list-box__menu-icon--open`]: open },
          ]"
          role="button"
          type="button"
          tabindex="-1"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          :title="open ? 'Close menu' : 'Open menu'"
          aria-haspopup="true"
          data-toggle="true"
        >
          <chevron-down16 aria-hidden="true" focusable="false" />
        </button>
      </div>

      <div
        v-show="open"
        :id="cvId"
        :class="[`${carbonPrefix}--list-box__menu`]"
        role="listbox"
        ref="list"
      >
        <div
          v-for="(item, index) in dataOptions"
          :key="`combo-box-${index}`"
          :class="[
            `${carbonPrefix}--list-box__menu-item`,
            {
              [`${carbonPrefix}--list-box__menu-item--highlighted`]:
                highlighted === item.value,
            },
          ]"
          ref="option"
          role="option"
          @click.stop.prevent="onItemClick(item.value)"
          @mousemove="onMousemove(item.value)"
          @mousedown.prevent
        >
          <div :class="[`${carbonPrefix}--list-box__menu-item__option`]">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="isInvalid" :class="[`${carbonPrefix}--form-requirement`]">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
    <div
      v-if="!isInvalid && isHelper"
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
import {
  ref,
  computed,
  onMounted,
  onUpdated,
  watch,
  nextTick,
  useSlots,
} from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '@/use/cvId';
import { WarningFilled16, Close16, ChevronDown16 } from '@carbon/icons-vue';

const props = defineProps({
  title: { type: String, default: '' },
  label: { type: String, default: 'Filter...' },
  disabled: { type: Boolean, default: false },
  invalidMessage: { type: String, default: undefined },
  helperText: { type: String, default: undefined },
  isLight: { type: Boolean, default: false },
  autoFilter: { type: Boolean, default: false },
  autoHighlight: { type: Boolean, default: false },
  value: { type: String },
  highlight: { type: String },
  modelValue: { type: String },
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
          'CvComboBox - all options must have name, label and value'
        );
      }
      return result;
    },
  },
  ...propsCvId,
});

// life cycle
onMounted(() => {
  const initValue = props.modelValue || props.value;
  internalUpdateValue(initValue);
  highlighted.value = initValue ? initValue : props.highlight; // override highlight with value if provided
  checkSlots();
});
onUpdated(() => {
  checkSlots();
});

const cvId = useCvId(props, true, 'combo-box-');

// DOM elements
const root = ref(null);
const list = ref(null);
const option = ref(null);
const input = ref(null);
const button = ref(null);
const slots = useSlots();

const emit = defineEmits({
  change: payload => {
    return 'string';
  },
  filter: payload => {
    return 'string';
  },
  'update:modelValue': payload => {
    return 'string';
  },
});

// data
const open = ref(false);
const dataOptions = ref([]);
const isInvalid = ref(false);
const isHelper = ref(false);
const dataHighlighted = ref(null);
const dataFilter = ref(null);
const dataValue = ref(props.modelValue);
const highlighted = computed({
  get() {
    return dataHighlighted.value;
  },
  set(val) {
    let firstMatchIndex = dataOptions.value.findIndex(
      item => item.value === val
    );
    if (firstMatchIndex < 0) {
      firstMatchIndex = dataOptions.value.length ? 0 : -1;
      dataHighlighted.value =
        firstMatchIndex >= 0 ? dataOptions.value[0].value : '';
    } else {
      dataHighlighted.value = val;
    }
    if (firstMatchIndex >= 0) {
      nextTick(() => {
        // $nextTick to prevent highlight check ahead of list update on filter
        checkHighlightPosition(firstMatchIndex);
      });
    }
  },
});
const filter = computed({
  get() {
    return dataFilter.value;
  },
  set(val) {
    dataFilter.value = val ? val : '';
    emit('filter', val);
  },
});

watch(
  () => props.highlight,
  () => {
    highlighted.value = props.highlight;
  }
);
watch(
  () => props.modelValue,
  () => {
    dataValue.value = props.modelValue;
    highlighted.value = props.modelValue;
    internalUpdateValue(props.modelValue);
  }
);
watch(
  () => props.options,
  () => {
    updateOptions();
  }
);

// methods
function checkSlots() {
  // NOTE: slots is not reactive so needs to be managed on updated
  isInvalid.value = !!(
    slots['invalid-message'] ||
    (props.invalidMessage && props.invalidMessage.length)
  );
  isHelper.value = !!(
    slots['helper-text'] ||
    (props.helperText && props.helperText.length)
  );
}
function clearFilter() {
  if (props.disabled) return;
  internalUpdateValue('');
  filter.value = '';
  input.value.focus();
  doOpen(true);
  updateOptions();
  emit('change', dataValue.value);
  emit('update:modelValue', dataValue.value);
}
function checkHighlightPosition(newHighlight) {
  const domList = list.value;
  const domOption = option.value;
  if (domList && domOption && domOption[newHighlight]) {
    if (domList.scrollTop > domOption[newHighlight].offsetTop) {
      domList.scrollTop = domOption[newHighlight].offsetTop;
    } else if (
      domList.scrollTop + domList.clientHeight <
      domOption[newHighlight].offsetTop + domOption[newHighlight].offsetHeight
    ) {
      domList.scrollTop =
        domOption[newHighlight].offsetTop +
        domOption[newHighlight].offsetHeight -
        domList.clientHeight;
    }
  }
}
function doMove(up) {
  if (dataOptions.value?.length > 0) {
    // re-query could have changed
    const currentHighlight = dataOptions.value.findIndex(
      item => item.value === highlighted.value
    );
    let newHighlight;

    if (up) {
      if (currentHighlight <= 0) {
        newHighlight = dataOptions.value.length - 1;
      } else {
        newHighlight = currentHighlight - 1;
      }
    } else {
      if (currentHighlight >= dataOptions.value.length - 1) {
        newHighlight = 0;
      } else {
        newHighlight = currentHighlight + 1;
      }
    }
    highlighted.value = dataOptions[newHighlight].value;
  }
}
function updateOptions() {
  if (props.autoFilter && filter.value) {
    const escFilter = filter.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pat = new RegExp(escFilter, 'iu');

    dataOptions.value = props.options
      .filter(opt => pat.test(opt.label))
      .slice(0);
  } else {
    dataOptions.value = props.options.slice(0);
  }
  if (props.highlight !== highlighted?.value) {
    highlighted.value = props.highlight;
  }
}
function updateHighlight() {
  let firstMatchIndex;
  if (props.autoHighlight && dataOptions.value.length > 0) {
    // then highlight first match
    const filterRegex = new RegExp(filter.value, 'iu');
    firstMatchIndex = dataOptions.value.findIndex(item =>
      filterRegex.test(item.label)
    );
    if (firstMatchIndex < 0) {
      firstMatchIndex = 0;
    }
    highlighted.value = dataOptions.value[firstMatchIndex].value;
  }
}
function onInput(val) {
  if (props.disabled) return;
  doOpen(true);

  updateOptions();
  updateHighlight();
}
function doOpen(newVal) {
  open.value = newVal;
}
function onDown() {
  if (props.disabled) return;
  if (!open.value) {
    doOpen(true);
  } else {
    doMove(false);
  }
}
function onUp() {
  if (props.disabled) return;
  if (open.value) {
    doMove(true);
  }
}
function onEsc() {
  if (props.disabled) return;
  doOpen(false);
  root.value.focus();
}
function onEnter() {
  if (props.disabled) return;
  doOpen(!open.value);
  if (!open.value) {
    onItemClick(highlighted.value);
    input.value.focus();
  }
}
function onClick() {
  if (props.disabled) return;
  doOpen(!open.value);
  if (open.value) {
    input.value.focus();
  } else {
    button.value.focus();
  }
}
function onFocusOut(ev) {
  if (!root.value.contains(ev.relatedTarget)) {
    doOpen(false);
  }
}
function onMousemove(val) {
  highlighted.value = val;
}
function internalUpdateValue(val) {
  dataValue.value = val;
  const filterOption = dataOptions.value.find(item => item.value === val);
  if (filterOption) {
    filter.value = filterOption.label;
  }
}
function onItemClick(val) {
  if (props.disabled) return;
  internalUpdateValue(val);
  input.value.focus();
  open.value = false; // close after user makes a selection
  emit('change', dataValue.value);
  emit('update:modelValue', dataValue.value);
}
function inputClick() {
  if (props.disabled) return;
  if (!open.value) {
    doOpen(true);
  }
}
function inputFocus() {
  if (props.disabled) return;
  doOpen(true);
}

updateOptions();
internalUpdateValue(props.modelValue);
</script>

<style lang="scss"></style>
