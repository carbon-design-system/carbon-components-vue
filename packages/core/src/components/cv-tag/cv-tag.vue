<template>
  <span class="cv-tag bx--tag" :class="`bx--tag--${kind}`">{{ label }}</span>
</template>

<script>
import { componentsX } from '../../internal/feature-flags';

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
const componentsXTags = ['red', 'magenta', 'purple', 'blue', 'cyan', 'teal', 'green', 'gray', 'cool-gray', 'warm-gray'];

export default {
  name: 'CvTag',
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
};
</script>
