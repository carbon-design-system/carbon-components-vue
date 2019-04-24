<template>
  <span class="cv-tag bx--tag" :class="[`bx--tag--${kind}`, { 'bx--tag--filter': isFilter }]" :title="title">
    {{ label }}
    <Close16 v-if="isFilter" aria-label="Clear filter" @click="$emit('click')" />
  </span>
</template>

<script>
import { componentsX } from '../../internal/feature-flags';
import Close16 from '@carbon/icons-vue/lib/close/16';

const components9Tags = [
  'ibm',
  'beta',
  'third-party',
  'local',
  'dedicated',
  'custom',
  'experimental',
  'community',
  'private',
  'deprecated',
];
const componentsXTags = [
  'filter',
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'gray',
  'cool-gray',
  'warm-gray',
];

export default {
  name: 'CvTag',
  components: { Close16 },
  data: () => ({ componentsX }),
  props: {
    label: { type: String, required: true },
    kind: {
      type: String,
      default: componentsX ? componentsXTags[0] : components9Tags[0],
      validator(val) {
        if (componentsX) {
          return componentsXTags.includes(val);
        } else {
          return components9Tags.includes(val);
        }
      },
    },
  },
  computed: {
    isFilter() {
      return this.kind === 'filter';
    },
    title() {
      return this.isFilter ? 'Close filter' : null;
    },
  },
};
</script>
