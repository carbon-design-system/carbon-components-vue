<template>
  <cv-wrapper
    :tag-type="formItem ? 'div' : ''"
    :class="`cv-date-picker ${carbonPrefix}--form-item`"
    :id="cvId"
  >
    <div
      :data-date-picker="['single', 'range'].includes(getKind)"
      :data-date-picker-type="getKind"
      :class="[
        `${carbonPrefix}--date-picker ${carbonPrefix}--date-picker--${getKind}`,
        {
          [`${carbonPrefix}--date-picker--simple`]: getKind === 'short',
          [`${carbonPrefix}--date-picker--light`]: isLight,
          'cv-date-pciker': !formItem,
        },
      ]"
      ref="date-picker"
      :id="formItem ? undefined : cvId"
    >
      <div
        :class="{
          [`${carbonPrefix}--date-picker-container`]: [
            'single',
            'range',
          ].includes(getKind),
          [`${carbonPrefix}--date-picker--nolabel`]: getDateLabel !== undefined,
        }"
        @change="onChange"
      >
        <label
          v-if="getDateLabel.length > 0"
          :for="`${cvId}-input-1`"
          :class="`${carbonPrefix}--label`"
        >
          {{ getDateLabel }}
        </label>
        <div :class="`${carbonPrefix}--date-picker-input__wrapper`">
          <input
            ref="date"
            type="text"
            data-date-picker-input
            :data-date-picker-input-from="getKind === 'range'"
            :id="`${cvId}-input-1`"
            :class="`${carbonPrefix}--date-picker__input`"
            :pattern="pattern"
            :placeholder="placeholder"
            :value="modelValue"
            @change="handleUpdateEvent"
          />
          <Calendar16
            v-if="['single', 'range'].includes(getKind)"
            :class="`${carbonPrefix}--date-picker__icon`"
            data-date-picker-icon
            @click="console.log($event.target)"
          />
        </div>
      </div>
    </div>
  </cv-wrapper>
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
import { props as propsCvId, useCvId } from '../../use/cvId';
import { Calendar16 } from '@carbon/icons-vue';
import CvWrapper from '../CvWrapper/CvWrapper';
import { props as propsCvTheme, useIsLight } from '../../use/cvTheme';

const props = defineProps({
  modelValue: String,
  dateLabel: { type: String, default: undefined },
  invalidText: { type: String },
  dateEndLabel: { type: String, default: 'End date' },
  pattern: { type: String, default: '\\d{1,2}/\\d{1,2}/\\d{4}' },
  placeholder: { type: String, default: 'mm/dd/yyyy' },
  formItem: { type: Boolean, default: true },
  kind: {
    type: String,
    default: 'simple',
    validator: val => ['short', 'simple', 'single', 'range'].includes(val),
  },
  ...propsCvId,
  ...propsCvTheme,
});

const getDateLabel = computed({
  get() {
    if (props.getKind === 'range' && !props.dateLabel) {
      return 'Start date';
    }

    if (!props.dateLabel) {
      return 'Date Label';
    }

    return props.dateLabel;
  },
});

const getKind = computed({
  get() {
    if (['short', 'simple', 'single', 'range'].includes(props.kind)) {
      return props.kind;
    }

    return 'simple';
  },
});

const cvId = useCvId(props, true, 'date-picker-');
const isLight = useIsLight(props);

const emit = defineEmits(['update:modelValue']);

const handleUpdateEvent = event => {
  // if (['range'].includes(props.kind)) {
  //   emit('update:modelValue', event.target.value);
  // } else if (['short', 'simple', 'single'].includes(props.kind)) {
  //   emit('update:modelValue', event.target.value);
  // }

  emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss"></style>
