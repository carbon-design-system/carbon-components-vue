<template>
  <cv-form-item class="cv-file-uploader">
    <p
      :class="[
        `${carbonPrefix}--file--label`,
        { [`${carbonPrefix}--file--label--disabled`]: disabled },
      ]"
    >
      {{ label }}
    </p>
    <p
      :class="[
        `${carbonPrefix}--label-description`,
        { [`${carbonPrefix}--label-description--disabled`]: disabled },
      ]"
    >
      {{ helperText }}
    </p>
    <div v-if="kind === 'button'" :class="`${carbonPrefix}--file`" data-file>
      <label
        :for="cvId"
        :class="[
          buttonClasses,
          { [`${carbonPrefix}--btn--disabled`]: disabled },
        ]"
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
        :disabled="disabled || null"
        type="file"
        v-bind="$attrs"
        :multiple="multiple"
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
              [`${carbonPrefix}--file__drop-container--drag-over`]:
                allowDrop && !disabled,
            },
            { [`${carbonPrefix}--file-browse-btn--disabled`]: disabled },
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
          :disabled="disabled || null"
          type="file"
          v-bind="$attrs"
          :multiple="multiple"
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
        :remove-aria-label="removeAriaLabel"
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
import {
  props as commonCvButtonProps,
  useCvButtonCommon,
} from '../CvButton/CvButtonCommon';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  accept: { type: String, default: undefined },
  buttonKind: commonCvButtonProps.kind,
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
  buttonSize: commonCvButtonProps.size,
  clearOnReselect: Boolean,
  disabled: Boolean,
  dropTargetLabel: { type: String, default: undefined },
  helperText: { type: String, default: undefined },
  initialStateUploading: Boolean,
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
  label: { type: String, default: undefined },
  modelValue: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: true },
  removable: Boolean,
  removeAriaLabel: { type: String, default: undefined },
  ...cvIdProps,
});

// DOM Elements
const fileInput = ref(null);

// Data
const allowDrop = ref(false);
const internalFiles = ref([]);

// Computed
const { buttonClasses } = useCvButtonCommon(props.buttonKind, props.buttonSize);
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
      internalFile.state = newFile.state;
      internalFile.invalidMessageTitle = newFile.invalidMessageTitle;
      internalFile.invalidMessage = newFile.invalidMessage;
      internalFile.file = file;
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
  if (props.disabled) {
    evt.preventDefault();
    return;
  }

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
    if (props.multiple) {
      addFiles(evt.dataTransfer.files);
    } else {
      internalFiles.value = [];
      addFiles([evt.dataTransfer.files[0]]);
    }
    allowDrop.value = false;
  }
}

function onItemRemove(index) {
  internalFiles.value.splice(index, 1);
  emit('update:modelValue', internalFiles.value);
}

function onKeyHit() {
  fileInput.value.click();
}

// Lifecycle Hooks
onMounted(() => {
  internalFiles.value = props.modelValue || [];
});

// exposed methods
function clear() {
  internalFiles.value = [];
  emit('update:modelValue', internalFiles.value);
}

function remove(index) {
  onItemRemove(index);
}

function setInvalidMessage(index, message) {
  internalFiles.value[index].invalidMessage = message;
}

function setState(index, state) {
  if ([STATES.COMPLETE, STATES.UPLOADING, STATES.NONE].includes(state)) {
    internalFiles.value[index].state = state;
  }
}

// exposing methods
defineExpose({
  clear,
  remove,
  setInvalidMessage,
  setState,
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>
