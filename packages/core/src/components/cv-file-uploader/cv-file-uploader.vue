<template>
  <cv-form-item class="cv-file-uploader">
    <strong class="bx--file--label">{{ label }}</strong>
    <p class="bx--label-description">{{ helperText }}</p>
    <div class="bx--file" data-file>
      <label
        :for="uid"
        class="bx--file-browse-btn"
        role="button"
        tabindex="0"
        @keydown.enter.prevent="onShow()"
        @keydown.space.prevent
        @keyup.space.prevent="onShow()"
      >
        <div
          data-file-drop-container
          class="bx--file__drop-container"
          :class="{ 'bx--file__drop-container--drag-over': allowDrop }"
          @dragover="onDragEvent"
          @dragleave="onDragEvent"
          @drop="onDragEvent"
        >
          <slot name="drop-target">{{ internalDropTargetLabel }}</slot>
          <input
            v-bind="$attrs"
            type="file"
            class="bx--file-input"
            :id="uid"
            data-file-uploader
            data-target="[data-file-container]"
            v-on="inputListeners"
            ref="file-input"
          />
        </div>
      </label>

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

            <span :data-for="uid" class="bx--file__state-container" :data-test="file.state" :style="stateStyleOverides">
              <div v-if="file.state === 'uploading'" class="bx--inline-loading__animation">
                <div data-inline-loading-spinner class="bx--loading bx--loading--small">
                  <svg class="bx--loading__svg" viewBox="-75 -75 150 150">
                    <circle class="bx--loading__background" cx="0" cy="0" r="37.5" />
                    <circle class="bx--loading__stroke" cx="0" cy="0" r="37.5" />
                  </svg>
                </div>
              </div>
              <CheckmarkFilled16 v-if="file.state === 'complete'" class="bx--file-complete" />
              <WarningFilled16 v-if="isInvalid(index)" class="bx--file--invalid" />
              <button
                type="button"
                class="bx--file-close"
                v-if="removable"
                :alt="removeAriaLabel"
                :arial-label="removeAriaLabel"
                @click="remove(index)"
              >
                <Close16 />
              </button>
            </span>
            <div v-if="isInvalid(index)" class="bx--form-requirement">
              <div class="bx--form-requirement__title">{{ file.invalidMessageTitle || 'Invalid file' }}</div>
              <p class="bx--form-requirement__supplement">{{ file.invalidMessage }}</p>
            </div>
          </cv-wrapper>
        </div>
      </div>
    </div>
  </cv-form-item>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import CvFormItem from '../cv-form/cv-form-item';
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
  components: { CvFormItem, CheckmarkFilled16, WarningFilled16, Close16, CvWrapper },
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    clearOnReselect: Boolean,
    files: Array,
    label: String,
    helperText: String,
    initialStateUploading: Boolean,
    removable: Boolean,
    buttonLabel: {
      type: String,
      default: undefined,
      validator: val => {
        if (val !== undefined && process.env.NODE_ENV === 'development') {
          console.warn('CvFileUploader: button-label prop deprecated in favour of drop-target-label');
        }
        return true;
      },
    },
    dropTargetLabel: { type: String, default: undefined },
    removeAriaLabel: { type: String, default: 'Remove selected file' },
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
      allowDrop: false,
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
    internalDropTargetLabel() {
      return this.dropTargetLabel || this.buttonLabel || 'Drag and drop files here or upload';
    },
    stateStyleOverides() {
      // <style carbon tweaks - DO NOT USE STYLE TAG as it causes SSR issues
      return { display: 'inline-flex', alignItems: 'center' };
    },
  },
  methods: {
    remove(index) {
      this.internalFiles.splice(index, 1);
      this.$emit('change', this.internalFiles);
    },
    addFiles(files) {
      for (const file of files) {
        this.internalFiles.push({
          state: this.initialStateUploading ? CONSTS.STATES.UPLOADING : CONSTS.STATES.NONE,
          file,
          invalidMessageTitle: '',
          invalidMessage: '',
        });
      }
      this.$emit('change', this.internalFiles);
    },
    onChange(ev) {
      if (ev.target.files.length !== 0 && this.clearOnReselect) {
        this.internalFiles = [];
      }
      this.addFiles(ev.target.files);
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
    onDragEvent(evt) {
      // NOTE: Validation of dragged files is not currently done.
      // It may be possible to do this here or defer to the caller.
      // It is certainly possible for the user to remove files after they are dropped.

      if (Array.prototype.indexOf.call(evt.dataTransfer.types, 'Files') >= 0) {
        if (evt.type === 'dragover') {
          evt.preventDefault();
          const dropEffect = 'copy';
          if (Array.isArray(evt.dataTransfer.types)) {
            try {
              // IE11 throws a "permission denied" error accessing `.effectAllowed`
              evt.dataTransfer.effectAllowed = dropEffect;
            } catch (e) {
              // ignore
            }
          }
          evt.dataTransfer.dropEffect = dropEffect;
          this.allowDrop = true;
        }
        if (evt.type === 'dragleave') {
          this.allowDrop = false;
        }
        if (evt.type === 'drop') {
          evt.preventDefault();
          this.addFiles(evt.dataTransfer.files);
          this.allowDrop = false;
        }
      }
    },
  },
};
</script>
