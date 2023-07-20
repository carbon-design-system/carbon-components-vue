<template>
  <Teleport to="body" :disabled="disableTeleport">
    <div
      ref="el"
      data-modal
      :id="uid"
      :class="[
        `cv-modal ${carbonPrefix}--modal`,
        {
          'is-visible': dataVisible,
          [`${carbonPrefix}--modal--danger`]: kind === 'danger',
        },
      ]"
      tabindex="-1"
      @keydown.esc.prevent="onEsc"
      @click.self="onExternalClick"
      v-bind="$attrs"
    >
      <div
        :class="[
          `${carbonPrefix}--modal-container`,
          {
            [`${carbonPrefix}--modal-container--${internalSize}`]: internalSize,
          },
        ]"
        v-bind="dialogAttrs"
        :aria-label="ariaLabel"
        ref="modalDialog"
      >
        <div
          class="cv-modal__before-content"
          ref="beforeContent"
          tabindex="0"
          style="position: absolute; height: 1px; width: 1px; left: -9999px"
          role="separator"
          aria-valuenow="0"
          @focus="focusBeforeContent"
        />
        <div :class="`${carbonPrefix}--modal-header`">
          <p :class="`${carbonPrefix}--modal-header__label`">
            <slot name="label"></slot>
          </p>
          <p :class="`${carbonPrefix}--modal-header__heading`">
            <slot name="title">Modal Title</slot>
          </p>
          <button
            :class="`${carbonPrefix}--modal-close`"
            type="button"
            @click="onClose"
            ref="closeBtn"
            :aria-label="closeAriaLabel"
          >
            <Close16 :class="`${carbonPrefix}--modal-close__icon`" />
          </button>
        </div>

        <div
          :class="[
            `${carbonPrefix}--modal-content`,
            { [`${carbonPrefix}--modal-content--with-form`]: hasFormContent },
          ]"
          ref="content"
          :tabindex="data.scrollable ? 0 : undefined"
        >
          <slot name="content"></slot>
        </div>

        <cv-button-set
          :class="[
            `${carbonPrefix}--modal-footer`,
            {
              [`${carbonPrefix}--modal-footer--three-button`]:
                data.hasPrimary && data.hasSecondary && data.hasOtherBtn,
            },
          ]"
          v-if="data.hasFooter"
        >
          <cv-button
            type="button"
            kind="secondary"
            @click="onOtherBtnClick"
            v-if="data.hasOtherBtn"
            ref="otherBtn"
          >
            <slot name="other-button">Other button</slot>
          </cv-button>
          <cv-button
            type="button"
            kind="secondary"
            @click="onSecondaryClick"
            v-if="data.hasSecondary"
            ref="secondaryBtn"
          >
            <slot name="secondary-button">Secondary button</slot>
          </cv-button>
          <cv-button
            :disabled="primaryButtonDisabled"
            type="button"
            :kind="primaryKind"
            @click="onPrimaryClick"
            v-if="data.hasPrimary"
            ref="primary"
          >
            <slot name="primary-button">Primary button</slot>
          </cv-button>
        </cv-button-set>
        <div
          class="cv-modal__after-content"
          ref="afterContent"
          tabindex="0"
          style="position: absolute; height: 1px; width: 1px; left: -9999px"
          role="separator"
          aria-valuenow="1"
          @focus="focusAfterContent"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import CvButton from '../CvButton/CvButton.vue';
import { carbonPrefix } from '../../global/settings';
import { props as propsCvId, useCvId } from '../../use/cvId';
import Close16 from '@carbon/icons-vue/es/close/16';
import CvButtonSet from '../CvButton/CvButtonSet.vue';
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue';

const props = defineProps({
  /**
   * When set to true, the aria role will be either "alert" or "alertdialog"
   */
  alert: { type: Boolean, default: false },
  /**
   * optional label for close button, default 'Close modal'
   */
  closeAriaLabel: { type: String, default: 'Close modal' },
  /**
   * aria label for the dialog, default 'Information modal'
   */
  ariaLabel: { type: String, default: 'Information modal' },
  /**
   * 'danger' otherwise default modal.
   */
  kind: {
    type: String,
    default: '',
    validator: val => ['', 'danger'].includes(val),
  },
  /**
   * boolean value if true the component user is expected to close the modal via visible property.
   */
  autoHideOff: { type: Boolean, default: false },
  /**
   * visibility of modal dialog - available as v-model
   */
  visible: { type: Boolean, default: false },
  /**
   * @deprecated - use v-model:visible
   */
  modelValue: {
    type: Boolean,
    validator: val => {
      console.warn(
        `v-model for modal is deprecated. Specify "v-model:visible" instead [${val}]`
      );
      return true;
    },
    default: undefined,
  },
  /**
   * boolean value used to enable/disable the primary button
   */
  primaryButtonDisabled: { type: Boolean, default: false },
  /**
   * default size is "medium"
   */
  size: {
    type: String,
    validator: val =>
      ['', 'xs', 'sm', 'small', 'md', 'large', 'lg'].includes(val),
    default: '',
  },
  /**
   * Adds styling specific to modals with form content
   */
  hasFormContent: { type: Boolean, default: false },
  /**
   * Do not move the modal to the document body
   */
  disableTeleport: { type: Boolean, default: false },

  // Listeners
  onPrimaryClick: { type: Function },
  onSecondaryClick: { type: Function },
  onOtherBtnClick: { type: Function },

  ...propsCvId,
});
const uid = useCvId(props, true);

const dataVisible = ref(false);
const data = reactive({
  scrollable: false,
  hasFooter: false,
  hasHeaderLabel: false,
  hasPrimary: false,
  hasSecondary: false,
  hasOtherBtn: false,
});

const slots = useSlots();
function checkSlots() {
  // NOTE: $slots is not reactive so needs to be managed on updated
  data.hasFooter = !!(
    slots['primary-button'] ||
    slots['secondary-button'] ||
    slots['other-button']
  );
  data.hasHeaderLabel = !!slots['label'];
  data.hasPrimary = !!slots['primary-button'];
  data.hasSecondary = !!slots['secondary-button'];
  data.hasOtherBtn = !!slots['other-button'];
}
const emit = defineEmits([
  'modal-shown',
  'modal-hidden',
  'after-modal-hidden',
  'modal-hide-request',
  'primary-click',
  'secondary-click',
  'other-btn-click',
  'update:modelValue',
  'update:visible',
]);
onBeforeMount(checkSlots);
onBeforeUpdate(checkSlots);

const el = ref(null);
function show() {
  // prevent body scrolling
  document.body.classList.add(`${carbonPrefix}--body--with-modal-open`);

  el.value?.addEventListener('transitionend', onShown);
  dataVisible.value = true;
}
const content = ref(null);
function onShown() {
  const focusEl = content.value?.querySelector('[data-modal-primary-focus]');
  if (focusEl) {
    focusEl.focus();
  } else {
    focusBeforeContent();
  }
  emit('modal-shown', uid.value);

  // check to see if content scrollable
  data.scrollable = content.value?.scrollHeight > content.value?.clientHeight;

  el.value?.removeEventListener('transitionend', onShown);
}
const secondaryBtn = ref(null);
const otherBtn = ref(null);
const closeBtn = ref(null);
function focusBeforeContent() {
  if (slots['primary-button']) {
    el.value?.focus();
  } else if (slots['secondary-button']) {
    secondaryBtn.value?.$el.focus();
  } else if (slots['other-button']) {
    otherBtn.value?.$el.focus();
  } else {
    closeBtn.value?.focus();
  }
}

onMounted(() => {
  if (props.visible) show();
  else if (props.modelValue) show();
});
watch(
  () => props.visible,
  val => {
    if (val) show();
    else hide();
  }
);
watch(dataVisible, val => {
  emit('update:modelValue', val);
  emit('update:visible', val);
});

function hide() {
  //restore any previous scroll
  document.body.classList.remove(`${carbonPrefix}--body--with-modal-open`);

  if (dataVisible.value) {
    el.value?.addEventListener('transitionend', afterHide);
    emit('modal-hidden', uid.value);
  }

  dataVisible.value = false;
}
function afterHide(event) {
  if (event.propertyName === 'opacity') {
    emit('after-modal-hidden');
    el.value?.removeEventListener('transitionend', afterHide);
  }
}

const dialogAttrs = computed(() => {
  const passive = !data.hasFooter;
  const attrs = {};
  if (props.alert) {
    if (passive) {
      attrs.role = 'alert';
    } else {
      attrs.role = 'alertdialog';
    }
  } else {
    attrs.role = 'dialog';
  }
  return attrs;
});
const primaryKind = computed(() => {
  if (props.kind === 'danger') {
    return 'danger';
  } else {
    return 'primary';
  }
});
const internalSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'xs';
    case 'sm':
    case 'small':
      return 'sm';
    case 'lg':
    case 'large':
      return 'lg';
    default:
      return '';
  }
});

function focusAfterContent() {
  closeBtn.value?.focus();
}

function onExternalClick(ev) {
  if (ev.target === el.value) {
    _maybeHide(ev, 'external-click');
  }
}
function onEsc(ev) {
  _maybeHide(ev, 'escape-press');
}
function onClose(ev) {
  _maybeHide(ev, 'close-click');
}

function _maybeHide(event, reason) {
  if (!props.autoHideOff) {
    hide();
  } else {
    emit('modal-hide-request', { 'cv:reason': reason });
  }
}
function onFooterButtonClick(buttonId, ev) {
  emit(buttonId);
  if (buttonId === 'primary-click' && !props.onPrimaryClick)
    _maybeHide(ev, buttonId);
  if (buttonId === 'secondary-click' && !props.onSecondaryClick)
    _maybeHide(ev, buttonId);
  if (buttonId === 'other-btn-click' && !props.onOtherBtnClick)
    _maybeHide(ev, buttonId);
}
function onPrimaryClick(ev) {
  onFooterButtonClick('primary-click', ev);
}
function onSecondaryClick(ev) {
  onFooterButtonClick('secondary-click', ev);
}
function onOtherBtnClick(ev) {
  onFooterButtonClick('other-btn-click', ev);
}
onBeforeUnmount(() => {
  if (dataVisible.value) hide();
});
</script>
