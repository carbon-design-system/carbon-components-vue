<template>
  <cv-wrapper
    ref="el"
    :tag-type="formItem ? 'div' : ''"
    :class="`cv-select ${carbonPrefix}--form-item`"
  >
    <div
      :data-test="value"
      :class="[
        `${carbonPrefix}--select`,
        `${carbonClasses}`,
        {
          'cv-select': !formItem,
          [`${carbonPrefix}--select--inline`]: inline,
          [`${carbonPrefix}--select--light`]: isLight,
          [`${carbonPrefix}--select--invalid`]: isInvalid,
          [`${carbonPrefix}--select--disabled`]: $attrs.disabled,
          [`${carbonPrefix}--select--warning`]: !isInvalid && isWarning,
        },
      ]"
    >
      <label
        :for="cvId"
        :class="[
          `${carbonPrefix}--label`,
          {
            [`${carbonPrefix}--visually-hidden`]: hideLabel,
            [`${carbonPrefix}--label--disabled`]: $attrs.disabled,
          },
        ]"
        >{{ label }}</label
      >

      <cv-wrapper
        :tag-type="inline ? 'div' : ''"
        :class="`${carbonPrefix}--select-input--inline__wrapper`"
      >
        <div
          :class="`${carbonPrefix}--select-input__wrapper`"
          :data-invalid="isInvalid || null"
        >
          <select
            v-bind="$attrs"
            :id="cvId"
            :class="[
              `${carbonPrefix}--select-input`,
              {
                [`${carbonPrefix}--select-input--${size || 'md'}`]:
                  size || 'md',
              },
            ]"
            :value="internalValue"
            @change="onChange"
          >
            <slot></slot>
          </select>
          <chevron-down :class="`${carbonPrefix}--select__arrow`" />
          <warning-filled
            v-if="isInvalid"
            :class="`${carbonPrefix}--select__invalid-icon`"
          />
          <warning-alt-filled
            v-else-if="isWarning"
            :class="`${carbonPrefix}--select__invalid-icon ${carbonPrefix}--select__invalid-icon--warning`"
          />
        </div>

        <div v-if="isInvalid" :class="`${carbonPrefix}--form-requirement`">
          <slot name="invalid-message">{{ invalidMessage }}</slot>
        </div>
        <div v-else-if="isWarning" :class="`${carbonPrefix}--form-requirement`">
          <slot name="warning-message">{{ warningMessage }}</slot>
        </div>
        <div
          v-else-if="!inline && isHelper"
          :class="`${carbonPrefix}--form__helper-text`"
        >
          <slot name="helper-text">{{ helperText }}</slot>
        </div>
        <!-- cv-wrapper div ${carbonPrefix}--select-input--inline__wrapper -->
      </cv-wrapper>
    </div>
    <!-- cv-wrapper div ${carbonPrefix}--form-item -->
  </cv-wrapper>
</template>

<script setup>
import { carbonPrefix } from '../../global/settings';
import {
  computed,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
  useSlots,
  watch,
} from 'vue';
import {
  WarningFilled16 as WarningFilled,
  ChevronDown16 as ChevronDown,
  WarningAltFilled16 as WarningAltFilled,
} from '@carbon/icons-vue';
import { props as propsCvId, useCvId } from '../../use/cvId';
import CvWrapper from '../CvWrapper/CvWrapper';
import { useIsLight, props as propsTheme } from '../../use/cvTheme';

const slots = useSlots();
const props = defineProps({
  inline: { type: Boolean, default: false },
  invalidMessage: { type: String, default: undefined },
  warningMessage: { type: String, default: undefined },
  helperText: { type: String, default: undefined },
  formItem: { type: Boolean, default: true },
  hideLabel: { type: Boolean, default: false },
  label: { type: String, required: true },
  // *********************
  // declare here to prevent the following from being added to the select
  // *********************
  // multiple does not work with styling from carbon-components 9.20
  multiple: {
    type: String,
    default: undefined,
    validator: () => {
      console.warn('property multiple not supported in CvSelect');
      return false;
    },
  },
  value: { type: String, default: undefined },
  size: {
    type: String,
    default: 'md',
    validator: val => ['sm', 'md', 'lg'].includes(val),
  },
  modelValue: { type: String, default: undefined },
  ...propsTheme,
  ...propsCvId,
});
const cvId = useCvId(props, true);
const isLight = useIsLight(props);
const emit = defineEmits(['change', 'update:modelValue']);

const el = ref(null);
const dataValue = ref(props.modelValue || props.value);
onMounted(() => {
  // this is needed to ensure selected for an option when no value is supplied
  // There is a race condition here between the select tag `:value="internalValue"` and the
  // calculation here of the desired value. Therefore, `cv-select-option` sets the `data-initial-selected`
  // value for options that include the selected attribute. By the time we get here the  `selected` has
  // already been unset by internalValue

  dataValue.value = props.modelValue || props.value;
  if (dataValue.value === undefined) {
    const dom = el.value?.$el;
    let options = dom?.querySelectorAll('option');
    for (let i = 0; i < options.length; i++) {
      const initialSelection = Boolean(
        options[i].attributes['data-initial-selected']
      );
      if (options[i].attributes.selected || initialSelection) {
        dataValue.value = options[i].value;
      }
    }
  }
});
watch(
  () => props.value,
  () => {
    // this is needed to ensure selected for an option when no value is supplied
    if (props.value === undefined) {
      const dom = el.value?.$el;
      let options = dom?.querySelectorAll('option');
      for (let i = 0; i < options.length; i++) {
        if (options[i].attributes.selected) {
          dataValue.value = options[i].value;
        }
      }
    }
  }
);
watch(
  () => props.modelValue,
  () => {
    dataValue.value = props.modelValue;
  }
);
watch(
  () => props.value,
  () => {
    dataValue.value = props.value;
  }
);
const internalValue = computed(() => {
  return dataValue.value ? dataValue.value : props.value;
});
function onChange(evt) {
  emit('change', evt?.target?.value);
  emit('update:modelValue', evt?.target?.value);
}

const isHelper = ref(false);
function updateHelper() {
  isHelper.value = !!(
    slots['helper-text'] ||
    (props.helperText && props.helperText.length)
  );
}
onMounted(updateHelper);
onUpdated(updateHelper);

// NOTE: slots are not reactive so needs to be managed on updated.
// It seems like a deep watch on the slots array may work but would still need to set the initial state so
// this pattern seem best.
const isInvalid = ref(false);
function updateInvalid() {
  isInvalid.value = !!(
    slots['invalid-message'] ||
    (props.invalidMessage && props.invalidMessage.length)
  );
}
onMounted(updateInvalid);
onUpdated(updateInvalid);

const isWarning = ref(false);
function updateWarning() {
  isWarning.value = !!(
    slots['warning-message'] ||
    (props.warningMessage && props.warningMessage.length)
  );
}
onMounted(updateWarning);
onUpdated(updateWarning);

// There is an oddity here with Vue2 vs Vue3. The Vue2 component uses CvWrapper to determine if this component
// is wrapped in a div or not. Either way the class attributes are applied in Vue2. In Vue3 the attributes are
// not applied. The CvTimePicker consumes this component and needs to apply styles in both the wrapped and
// unwrapped case. Here we apply any carbon styles to the outer div.
const attrs = useAttrs();
const carbonClasses = computed(() => {
  if (props.formItem || !attrs.class) return '';
  return attrs.class
    ?.split(' ')
    .filter(c => c.startsWith(`${carbonPrefix}--`))
    .join(' ');
});
</script>
