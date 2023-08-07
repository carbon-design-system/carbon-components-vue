<template>
  <cv-form-item class="cv-file-uploader">
    <p :class="`${carbonPrefix}--file--label`">{{ label }}</p>
    <p :class="`${carbonPrefix}--label-description`">{{ helperText }}</p>
    <div v-if="kind === 'button'" :class="`${carbonPrefix}--file`" data-file>
      <label
        :for="cvId"
        :class="[`${carbonPrefix}--btn`, `${carbonPrefix}--btn--primary`]"
        tabindex="0"
        @keydown.enter.prevent="onKeyHit"
        @keydown.space.prevent="onKeyHit"
      >
        <slot name="drop-target">{{ internalDropTargetLabel }}</slot>
      </label>
      <input
        :id="cvId"
        ref="fileInput"
        :class="`${carbonPrefix}--file-input`"
        :accept="accept"
        type="file"
        v-bind="$attrs"
        data-file-uploader
        data-target="[data-file-container]"
        @change="onChange"
      />
    </div>
    <div v-else :class="`${carbonPrefix}--file`" data-file>
      <label :for="cvId">
        <div
          role="button"
          tabindex="0"
          data-file-drop-container
          :class="[
            `${carbonPrefix}--file-browse-btn`,
            `${carbonPrefix}--file__drop-container`,
            {
              [`${carbonPrefix}--file__drop-container--drag-over`]: allowDrop,
            },
          ]"
          @dragover="onDragEvent"
          @dragleave="onDragEvent"
          @drop="onDragEvent"
          @keydown.enter.prevent="onKeyHit"
          @keydown.space.prevent="onKeyHit"
        >
          <slot name="drop-target">{{ internalDropTargetLabel }}</slot>
        </div>
        <input
          :id="cvId"
          ref="fileInput"
          :class="`${carbonPrefix}--file-input`"
          :accept="accept"
          type="file"
          v-bind="$attrs"
          tabindex="-1"
          data-file-uploader
          data-target="[data-file-container]"
          @change="onChange"
        />
      </label>
    </div>
    <div
      :class="`${carbonPrefix}--file ${carbonPrefix}--file-container`"
      data-file-container
    >
      <cv-file-uploader-item
        v-for="(item, index) in internalFiles"
        :key="item.file.name"
        :item="item"
        :removable="removable"
        :removeAriaLabel="removeAriaLabel"
        @remove="onItemRemove(index)"
      />
    </div>
  </cv-form-item>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import CvFileUploaderItem from './CvFileUploaderItem.vue';
import { carbonPrefix } from '../../global/settings';
import { CvFormItem } from '../CvForm';
import { useCvId, props as cvIdProps } from '../../use/cvId';
import { KINDS, STATES } from './const';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  accept: String,
  buttonLabel: {
    type: String,
    default: undefined,
    deprecated: true,
    validator: val => {
      if (val !== undefined && process.env.NODE_ENV === 'development') {
        console.warn(
          'CvFileUploader: button-label prop deprecated in favour of drop-target-label'
        );
      }
      return true;
    },
  },
  clearOnReselect: Boolean,
  dropTargetLabel: String,
  helperText: String,
  kind: {
    type: String,
    default: KINDS.DRAG_TARGET,
    validator: val => {
      const validValues = Object.values(KINDS);
      if (!validValues.includes(val)) {
        console.warn(
          `CvFileUploader: valid values for 'kind' are ${validValues}`
        );
      }
      return true;
    },
  },
  label: String,
  modelValue: Array,
  removable: Boolean,
  removeAriaLabel: String,
  ...cvIdProps,
});

// DOM Elements
const fileInput = ref(null);

// Data
const allowDrop = ref(false);
const internalFiles = ref([]);

// Computed
const cvId = useCvId(props);
const internalDropTargetLabel = computed(() => {
  return (
    props.dropTargetLabel ||
    props.buttonLabel ||
    'Drag and drop files here or upload'
  );
});
const isFileTypeAllowed = computed(() => {
  const acceptAny = !props.accept;
  const allowedTypes = props.accept
    ? props.accept.split(',').map(x => x.trim())
    : [];
  if (allowedTypes.includes('.jpg')) {
    allowedTypes.push('.jpeg');
  }
  return file => {
    if (acceptAny) return true;
    const extension = '.' + file.name.split('.').pop();
    return allowedTypes.includes(file.type) || allowedTypes.includes(extension);
  };
});

// Watchers
watch(
  () => props.modelValue,
  newValue => {
    internalFiles.value = newValue || [];
  }
);

// Methods
function addFiles(files) {
  for (const file of files) {
    const internalFile = internalFiles.value.find(
      item => item.file.name === file.name
    );
    const newFile = createInternalFile(internalFile?.file || file);

    if (internalFile) {
      internalFile.state = newFile.initialState;
      internalFile.invalidMessageTitle = newFile.invalidMessageTitle;
      internalFile.invalidMessage = newFile.invalidMessage;
    } else {
      internalFiles.value.push(newFile);
    }
  }
  // clear input we do not need to maintain it
  fileInput.value.value = '';
  emit('update:modelValue', internalFiles.value);
}

function createInternalFile(file) {
  const initialState = props.initialStateUploading
    ? STATES.UPLOADING
    : STATES.NONE;
  const isTypeNotAllowed = !isFileTypeAllowed.value(file);
  const invalidMessageTitle = isTypeNotAllowed ? 'Invalid file type' : '';
  const invalidMessage = isTypeNotAllowed
    ? `"${file.name}" does not have a valid file type.`
    : '';

  return {
    state: initialState,
    file,
    invalidMessageTitle,
    invalidMessage,
  };
}

function onChange(ev) {
  if (ev.target.files.length !== 0 && props.clearOnReselect) {
    internalFiles.value = [];
  }
  addFiles(ev.target.files);
}

function onDragEvent(evt) {
  if (Array.prototype.indexOf.call(evt.dataTransfer.types, 'Files') === -1) {
    return;
  }

  if (evt.type === 'dragleave') {
    allowDrop.value = false;
    return;
  }

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
    allowDrop.value = true;
  }

  if (evt.type === 'drop') {
    evt.preventDefault();
    addFiles(evt.dataTransfer.files);
    allowDrop.value = false;
  }
}

function onItemRemove(index) {
  internalFiles.value.splice(index, 1);
  emit('update:modelValue', this.internalFiles);
}

function onKeyHit() {
  fileInput.value.click();
}

// Lifecycle Hooks
onMounted(() => {
  internalFiles.value = props.modelValue || [];
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
