<template>
  <cv-form-item class="cv-file-uploader">
    <strong class="bx--label">{{ label }}</strong>
    <p class="bx--label-description">{{ helperText }}</p>
    <div class="bx--file" data-file>
      <label
        :for="uid"
        class="bx--file-btn bx--btn bx--btn--secondary"
        role="button"
        tabindex="0"
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
      />
      <div data-file-container class="bx--file-container">
        <div
          data-file-container
          class="bx--file-container"
          v-for="(file, index) in internalFiles"
          :key="index"
        >
          <span class="bx--file__selected-file">
            <p class="bx--file-filename">{{ file.file.name }}</p>
            <span
              :data-for="uid"
              class="bx--file__state-container"
              :data-test="file.state"
              wibble="banana"
            >
              <div
                v-if="file.state === 'uploading'"
                class="bx--loading"
                tabindex="0"
                style="width: 1rem; height: 1rem;"
              >
                <svg class="bx--loading__svg" viewBox="-42 -42 84 84">
                  <circle cx="0" cy="0" r="37.5"></circle>
                </svg>
              </div>
              <svg
                v-if="file.state === 'complete'"
                class="bx--file-complete"
                fill-rule="evenodd"
                height="16"
                role="img"
                viewBox="0 0 16 16"
                width="16"
                aria-label="Complete"
                alt="Complete"
              >
                <title>Complete</title>
                <path
                  d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z"
                ></path>
              </svg>
              <svg
                v-if="removable"
                class="bx--file-close"
                fill-rule="evenodd"
                role="button"
                height="16"
                width="16"
                viewBox="0 0 16 16"
                tabindex="0"
                alt="Remove file"
                arial-label="Remove file"
                @click="remove(index)"
                @keydown.enter.prevent="remove(index)"
                @keydown.space.prevent
                @keyup.space.prevent="remove(index)"
              >
                <title>Remove</title>
                <path
                  d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                ></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  </cv-form-item>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
import CvFormItem from '../cv-form/cv-form-item';

const CONSTS = {
  STATES: {
    NONE: '',
    UPLOADING: 'uploading',
    COMPLETE: 'complete',
  },
};

export default {
  name: 'CvFileUploader',
  components: { CvFormItem },
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
          state: this.initialStateUploading
            ? CONSTS.STATES.UPLOADING
            : CONSTS.STATES.NONE,
          file,
        });
      }
      this.$emit('change', this.internalFiles);
    },
  },
};
</script>

<style lang="scss"></style>
