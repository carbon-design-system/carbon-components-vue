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
          'cv-date-picker': !formItem,
        },
      ]"
      ref="dateWrapper"
      :id="formItem ? undefined : cvId"
    >
      <div
        class="inputWrapper"
        :class="{
          [`${carbonPrefix}--date-picker-container`]: [
            'single',
            'range',
          ].includes(getKind),
          [`${carbonPrefix}--date-picker--nolabel`]: label === false,
        }"
      >
        <CvSkeletonText width="50%" class="label"></CvSkeletonText>
        <CvSkeletonText :heading="true" class="input"></CvSkeletonText>
        <div
          :style="`display: block; width: ${
            getKind === 'single' ? '240px' : '120px'
          };`"
          :class="`${carbonPrefix}--date-picker-input__wrapper`"
        ></div>
      </div>

      <div
        v-if="getKind === 'range'"
        :class="{
          [`${carbonPrefix}--date-picker-container`]: [
            'single',
            'range',
          ].includes(getKind),
          [`${carbonPrefix}--date-picker--nolabel`]: label === false,
        }"
      >
        <CvSkeletonText width="50%" class="label"></CvSkeletonText>
        <CvSkeletonText :heading="true" class="input"></CvSkeletonText>
        <div
          style="display: block; width: 120px"
          :class="`${carbonPrefix}--date-picker-input__wrapper`"
        ></div>
      </div>
    </div>
  </cv-wrapper>
</template>

<script setup>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import CvWrapper from '../CvWrapper/CvWrapper';
import CvSkeletonText from '../CvSkeletonText';

const cvId = useCvId(props, true, 'date-picker-skeleton-');

const props = defineProps({
  formItem: { type: Boolean, default: true },
  label: { type: Boolean, default: true },
  kind: {
    type: String,
    default: 'simple',
    validator: val => ['short', 'simple', 'single', 'range'].includes(val),
  },
  ...propsCvId,
});

const getKind = computed({
  get() {
    if (['short', 'simple', 'single', 'range'].includes(props.kind)) {
      return props.kind;
    }

    return 'simple';
  },
});
</script>

<style scoped>
.inputWrapper {
  width: 8.96875rem;
}

.label {
  width: 4.6875rem;
  height: 0.875rem;
  margin-bottom: 0.5rem;
}
.input {
  height: 2.5rem;
  margin-bottom: 0;
}
</style>
