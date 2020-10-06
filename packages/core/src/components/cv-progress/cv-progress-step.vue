<template>
  <li
    :class="[
      `cv-progress-step ${carbonPrefix}--progress-step`,
      `${carbonPrefix}--progress-step--${stateString}`,
      {
        [`${carbonPrefix}--progress-step--disabled`]: disabled,
        [`${carbonPrefix}--progress-step--invalid`]: invalid,
      },
    ]"
    :aria-disabled="disabled"
  >
    <svg v-if="isCurrent">
      <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" />
    </svg>
    <Warning16 v-else-if="!isComplete && invalid" :class="`${carbonPrefix}--progress__warning`" />
    <svg v-else-if="!isComplete">
      <path
        d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 13c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
      />
    </svg>
    <CheckmarkOutline16 v-else-if="isComplete" />

    <p
      :class="[`${carbonPrefix}--progress-label`, { [`${carbonPrefix}--progress-label-overflow`]: showOverflow }]"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      ref="label"
    >
      {{ label }}
    </p>

    <div role="tooltip" data-floating-menu-direction="bottom" :class="`${carbonPrefix}--tooltip`">
      <span :class="`${carbonPrefix}--tooltip__caret`"></span>
      <p :class="`${carbonPrefix}--tooltip__text`">{{ tip }}</p>
    </div>

    <p :class="`${carbonPrefix}--progress-optional`" v-if="additionalInfo">{{ additionalInfo }}</p>
    <span :class="`${carbonPrefix}--progress-line`"></span>
  </li>
</template>

<script>
import CheckmarkOutline16 from '@carbon/icons-vue/es/checkmark--outline/16';
import Warning16 from '@carbon/icons-vue/es/warning/16';
import { carbonPrefixMixin } from '../../mixins';

const states = ['incomplete', 'current', 'complete'];

export default {
  name: 'CvProgressStep',
  mixins: [carbonPrefixMixin],
  components: {
    CheckmarkOutline16,
    Warning16,
  },
  props: {
    additionalInfo: String,
    disabled: Boolean,
    invalid: Boolean,
    label: String,
    tipText: String,
    complete: Boolean,
  },
  data() {
    return {
      state: -1,
      showOverflow: false,
      tip: '',
    };
  },
  mounted() {
    this.$_CvProgressStep = true; // for use by parent with $children
    this.$parent.$emit('cv:mounted');
  },
  beforeDestroy() {
    this.$parent.$emit('cv:beforeDestroy');
  },
  watch: {
    complete() {
      this.$parent.$emit('cv:completed');
    },
  },
  computed: {
    internalState: {
      get() {
        return this.state;
      },
      set(val) {
        this.state = Math.sign(val);
      },
    },
    stateString() {
      return states[this.state + 1];
    },
    isComplete() {
      return this.state > 0;
    },
    isCurrent() {
      return this.state === 0;
    },
  },
  methods: {
    onMouseEnter() {
      if (this.tipText) {
        this.tip = this.tipText;
        this.showOverflow = true;
      } else {
        if (this.$refs.label.scrollWidth > this.$refs.label.clientWidth) {
          this.tip = this.label;
          this.showOverflow = true;
        } else {
          this.tip = '';
          this.showOverflow = false;
        }
      }
    },
    onMouseLeave() {
      this.showOverflow = false;
    },
  },
};
</script>
