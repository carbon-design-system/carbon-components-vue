<template>
  <cv-form-item class="cv-file-uploader">
    <strong class="bx--file--label">{{ label }}</strong>
    <p class="bx--label-description">{{ helperText }}</p>
    <div class="bx--file" data-file>
      <label
        :for="uid"
        class="bx--file--btn bx--btn bx--btn--primary"
        role="button"
        tabindex="0"
        @keydown.enter.prevent="onShow()"
        @keydown.space.prevent
        @keyup.space.prevent="onShow()"
        >{{ buttonLabel }}</label
      >
      <input
        v-bind="$attrs"
        type="file"
        class="bx--file-input"
        :id="uid"
        data-file-uploader
        data-target="[data-file-container]"
        v-on="inputListeners"
        ref="file-input"
        tabindex="-1"
      />
      <div data-file-container class="bx--file-container">
        <div
          v-for="(file, index) in internalFiles"
          :key="index"
          :class="isInvalid(index) ? 'bx--file__selected-file--invalid__wrapper' : 'bx--file__selected-file'"
        >
          <cv-wrapper
            :tag-type="isInvalid(index) ? 'div' : ''"
            class="bx--file__selected-file bx--file__selected-file--invalid"
          >
            <p class="bx--file-filename">{{ file.file.name }}</p>
            <span :data-for="uid" class="bx--file__state-container" :data-test="file.state">
              <div v-if="file.state === 'uploading'" class="bx--inline-loading__animation">
                <cv-inline-loading active loading-text loaded-text />
              </div>
              <CheckmarkFilled16 v-if="file.state === 'complete'" class="bx--file-complete" />
              <WarningFilled16 v-if="isInvalid(index)" class="bx--file--invalid" />
              <Close16
                v-if="removable"
                class="bx--file-close"
                :tabindex="'1'"
                role="button"
                alt="Remove file"
                :arial-label="removeAriaLabel"
                @click="remove(index)"
                @keydown.enter.prevent="remove(index)"
                @keydown.space.prevent
                @keyup.space.prevent="remove(index)"
              />
            </span>
          </cv-wrapper>
          <div v-if="isInvalid" class="bx--form-requirement">{{ file.invalidMessage }}</div>
        </div>
      </div>
    </div>
  </cv-form-item>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import CvFormItem from '../cv-form/cv-form-item';
import CvInlineLoading from '../cv-inline-loading/cv-inline-loading';
import CheckmarkFilled16 from '@carbon/icons-vue/es/checkmark--filled/16';
import WarningFilled16 from '@carbon/icons-vue/es/warning--filled/16';
import Close16 from '@carbon/icons-vue/es/close/16';
import CvWrapper from '../cv-wrapper/_cv-wrapper';

const CONSTS = {
  STATES: {
    NONE: '',
    UPLOADING: 'uploading',
    COMPLETE: 'complete',
  },
};

export default {
  name: 'CvFileUploader',
  components: { CvFormItem, CvInlineLoading, CheckmarkFilled16, WarningFilled16, Close16, CvWrapper },
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    clearOnReselect: Boolean,
    files: Array,
    label: String,
    helperText: String,
    initialStateUploading: Boolean,
    removable: Boolean,
    buttonLabel: { type: String, default: 'Select file' },
    removeAriaLabel: { type: String, default: 'Remove file' },
  },
  model: {
    prop: 'files',
    event: 'change',
  },
  created() {
    this.STATES = Object.freeze(CONSTS.STATES);
  },
  data() {
    return {
      internalFiles: [],
    };
  },
  mounted() {
    this.internalFiles = this.files ? this.files : [];
  },
  watch: {
    files() {
      this.internalFiles = this.files ? this.files : [];
    },
  },
  computed: {
    // Bind listeners at the component level to the embedded input element and
    // add our own input listener to service the v-model. See:
    // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
    inputListeners() {
      return {
        ...this.$listeners,
        change: event => this.onChange(event),
      };
    },
    isInvalid() {
      return index => {
        const result = this.internalFiles[index].invalidMessage && this.internalFiles[index].invalidMessage.length;
        return result;
      };
    },
  },
  methods: {
    remove(index) {
      this.internalFiles.splice(index, 1);
      this.$emit('change', this.internalFiles);
    },
    onChange(ev) {
      if (ev.target.files.length !== 0 && this.clearOnReselect) {
        this.internalFiles = [];
      }
      for (const file of ev.target.files) {
        this.internalFiles.push({
          state: this.initialStateUploading ? CONSTS.STATES.UPLOADING : CONSTS.STATES.NONE,
          file,
          invalidMessage: '',
        });
      }
      this.$emit('change', this.internalFiles);
    },
    onShow() {
      this.$refs['file-input'].click();
    },
    setState(index, state) {
      if (['uploading', 'complete', ''].includes(state)) {
        this.internalFiles[index].state = state;
      }
    },
    clear() {
      this.internalFiles = [];
      this.$emit('change', this.internalFiles);
    },
    setInvalidMessage(index, message) {
      this.internalFiles[index].invalidMessage = message;
    },
  },
};
</script>
