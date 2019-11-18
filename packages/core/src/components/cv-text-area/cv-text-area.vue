<template>
  <div class="cv-text-area bx--form-item">
    <label
      :for="uid"
      :class="[
        'bx--label',
        {
          'bx--label--disabled': $attrs.disabled !== undefined && $attrs.disabled,
        },
      ]"
      >{{ label }}</label
    >
    <div v-if="isHelper" class="bx--form__helper-text" :class="{ 'bx--form__helper-text--disabled': $attrs.disabled }">
      <slot name="helper-text">{{ helperText }}</slot>
    </div>
    <div class="bx--text-area__wrapper" :data-invalid="isInvalid">
      <WarningFilled16 v-if="isInvalid" class="bx--text-area__invalid-icon" />
      <textarea
        :id="uid"
        class="bx--text-area"
        :class="{ 'bx--text-area--light': theme === 'light', 'bx--text-area--invalid': isInvalid }"
        v-bind="$attrs"
        :value="value"
        v-on="inputListeners"
      ></textarea>
    </div>
    <div class="bx--form-requirement" v-if="isInvalid">
      <slot name="invalid-message">{{ invalidMessage }}</slot>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import themeMixin from '../../mixins/theme-mixin';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';

export default {
  name: 'CvTextArea',
  mixins: [uidMixin, themeMixin],
  inheritAttrs: false,
  components: { WarningFilled16 },
  props: {
    helperText: { type: String, default: undefined },
    invalidMessage: { type: String, default: undefined },
    label: String,
    value: String,
  },
  data() {
    return {
      isHelper: false,
      isInvalid: false,
    };
  },
  mounted() {
    this.checkSlots();
  },
  beforeUpdate() {
    this.checkSlots();
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
  },
  methods: {
    checkSlots() {
      // NOTE: this.$slots is not reactive so needs to be managed on beforeUpdate
      this.isInvalid = !!(this.$slots['invalid-message'] || (this.invalidMessage && this.invalidMessage.length));
      this.isHelper = !!(this.$slots['helper-text'] || (this.helperText && this.helperText.length));
    },
  },
};
</script>
