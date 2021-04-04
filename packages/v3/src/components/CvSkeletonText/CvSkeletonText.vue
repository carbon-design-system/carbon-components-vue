<template>
  <p
    v-if="lineCount === 1"
    :class="[
      `${carbonPrefix}--skeleton__text`,
      { [`${carbonPrefix}--skeleton__heading`]: heading },
    ]"
    :style="{ width }"
  />
  <div v-else>
    <p
      v-for="i in lineCount"
      :key="i"
      :class="[
        `${carbonPrefix}--skeleton__text`,
        { [`${carbonPrefix}--skeleton__heading`]: heading },
      ]"
      :style="{ width: widths[i - 1] }"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { carbonPrefix } from '../../global/settings';

const LENGTH_MODIFIERS = [`64px`, `2px`, `32px`];

export default {
  name: 'CvSkeletonText',
  props: {
    /** Make skeleton text larger (like heading) */
    heading: {
      type: Boolean,
      default: false,
    },
    /** Number of skeleton text lines shown */
    lineCount: {
      type: Number,
      default: 1,
      validator: value => value > 0,
    },
    /** Width (with CSS unit, e.g. px or %) of single line of text, or max-width of paragraph lines */
    width: {
      type: String,
      default: '100%',
    },
  },
  setup(props) {
    const widths = computed(() => {
      if (props.lineCount === 1) {
        return [];
      }

      return Array.from(
        { length: props.lineCount },
        (_, i) =>
          `calc(${props.width} - ${
            LENGTH_MODIFIERS[i % LENGTH_MODIFIERS.length]
          })`
      );
    });

    return { carbonPrefix, widths };
  },
};
</script>
