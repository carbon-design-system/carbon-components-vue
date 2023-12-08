import CvModal from './CvModal.vue';

const MODAL_SIZE_EXTRA_SMALL = 'xs';
const MODAL_SIZE_SMALL = 'sm';
const MODAL_SIZE_MEDIUM = 'md';
const MODAL_SIZE_LARGE = 'lg';
const MODAL_SIZES = [
  '',
  MODAL_SIZE_EXTRA_SMALL,
  MODAL_SIZE_SMALL,
  'small',
  MODAL_SIZE_MEDIUM,
  'medium',
  'large',
  MODAL_SIZE_LARGE,
];
const MODAL_KIND_PRIMARY = 'primary';
const MODAL_KIND_DANGER = 'danger';
const MODAL_KINDS = ['', MODAL_KIND_PRIMARY, MODAL_KIND_DANGER];

export {
  CvModal,
  MODAL_SIZES,
  MODAL_SIZE_EXTRA_SMALL,
  MODAL_SIZE_SMALL,
  MODAL_SIZE_LARGE,
  MODAL_KINDS,
  MODAL_KIND_PRIMARY,
  MODAL_KIND_DANGER,
};
export default CvModal;
