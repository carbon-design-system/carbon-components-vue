<template>
  <div class="cv-file-uploader bx--file" data-file>
    <label
      :for="uid"
      class="bx--file-btn bx--btn bx--btn--secondary"
      role="button"
      tabindex="0"
      >{{ label }}</label
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
        v-for="(file, index) in files"
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
              tabindex="0"
              aria-label="Complete"
              alt="Complete"
            >
              <title>Complete</title>
              <path
                d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm3.293-11.332L6.75 9.21 4.707 7.168 3.293 8.582 6.75 12.04l5.957-5.957-1.414-1.414z"
              ></path>
            </svg>
            <button
              v-if="removable"
              class="cv-file-uploader__close"
              @click="remove(index)"
              aria-label="Remove"
            >
              <svg
                class="bx--file-close"
                fill-rule="evenodd"
                role="img"
                height="100%"
                width="100%"
                viewBox="0 0 16 16"
                tabindex="0"
                alt="Remove"
              >
                <title>Remove</title>
                <path
                  d="M8 6.586L5.879 4.464 4.464 5.88 6.586 8l-2.122 2.121 1.415 1.415L8 9.414l2.121 2.122 1.415-1.415L9.414 8l2.122-2.121-1.415-1.415L8 6.586zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                ></path>
              </svg>
            </button>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import uidMixin from '../../mixins/uid-mixin';
// import { FileUploader } from 'carbon-components';

const CONSTS = {
  STATES: {
    NONE: '',
    UPLOADING: 'uploading',
    COMPLETE: 'complete',
  },
};

export default {
  name: 'CvFileUploader',
  mixins: [uidMixin],
  inheritAttrs: false,
  props: {
    clearOnReselect: Boolean,
    initialStateUploading: Boolean,
    removable: Boolean,
    label: String,
  },
  created() {
    this.CONSTS = Object.freeze(CONSTS);
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
  data() {
    return {
      files: [],
      initialFilelist: {},
    };
  },
  mounted() {
    this.initialFilelist = this.$el.querySelector('.bx--file-input').files;
  },
  methods: {
    getIndex(item) {
      if (typeof item === 'object') {
        return this.files.indexOf(item);
      } else {
        return item;
      }
    },
    remove(item) {
      // debugger; // eslint-disable-line
      const index = this.getIndex(item);
      if (this.files[index]) {
        this.files.splice(index, 1);
        this.$emit('change', this.files);
      }
    },
    setState(item, state) {
      // debugger; // eslint-disable-line
      const index = this.getIndex(item);
      if (this.files[index] && state !== this.files[index].STATES) {
        if (
          state === CONSTS.STATES.UPLOADING ||
          state === CONSTS.STATES.COMPLETE
        ) {
          this.files[index].state = state;
        } else {
          this.files[index].state = CONSTS.STATES.NONE;
        }
        this.$emit('change', this.files);
      }
    },
    clear() {
      this.files = [];
      this.$emit('change', this.files);
    },
    onChange(ev) {
      if (ev.target.files.length !== 0 && this.clearOnReselect) {
        this.files = [];
      }
      for (const file of ev.target.files) {
        const newPos = this.files.push({ state: CONSTS.STATES.NONE, file }) - 1;
        const newItem = this.files[newPos];
        newItem.state = this.initialStateUploading
          ? CONSTS.STATES.UPLOADING
          : CONSTS.STATES.NONE;
        newItem.setState = state => {
          this.setState(newItem, state);
        };
        newItem.remove = () => {
          this.remove(newItem);
        };
      }
      this.$emit('change', this.files);
      try {
        // reset to initial empty Filelist
        ev.target.files = this.initialFilelist;
      } catch (err) {
        // ignore
      }
    },
  },
};
</script>

<style lang="scss">
.cv-file-uploader__close {
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  background-color: transparent;
}
</style>
