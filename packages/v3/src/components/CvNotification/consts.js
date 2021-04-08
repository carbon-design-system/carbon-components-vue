import {
  ErrorFilled20,
  CheckmarkFilled20,
  WarningFilled20,
  WarningAltFilled20,
  InformationFilled20,
  InformationSquareFilled20,
} from '@carbon/icons-vue';

export const notificationKinds = [
  'info',
  'info-square',
  'success',
  'warning',
  'warning-alt',
  'error',
];

export const notificationIcons = {
  info: InformationFilled20,
  'info-square': InformationSquareFilled20,
  success: CheckmarkFilled20,
  warning: WarningFilled20,
  'warning-alt': WarningAltFilled20,
  error: ErrorFilled20,
};

export default {
  notificationKinds,
  notificationIcons,
};
