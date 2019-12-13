const ctx = require.context('./components/', true, /^(?!.*(?:\/_|-story\.vue|-test\.vue)).*\.vue$/);
const components = ctx.keys().map(ctx);

// Export the components as a plugin
export default {
  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']
  install(Vue, options) {
    if (typeof options === 'undefined') {
      for (let c of components) {
        Vue.component(c.default.name, c.default);
      }
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }

      for (let c of components) {
        // register only components specified in the options
        if (options.includes(c.default.name)) {
          Vue.component(c.default.name, c.default);
        }
      }
    }
  },
};

// import/export individual components
import { CvAccordion, CvAccordionItem, CvAccordionSkeleton } from './components/cv-accordion';
import { CvBreadcrumb, CvBreadcrumbItem, CvBreadcrumbSkeleton } from './components/cv-breadcrumb';
import { CvButton, CvIconButton, CvButtonSkeleton, CvButtonSet } from './components/cv-button';
import { CvCheckbox, CvCheckboxSkeleton } from './components/cv-checkbox';
import { CvCodeSnippet, CvCodeSnippetSkeleton } from './components/cv-code-snippet';
import { CvComboBox } from './components/cv-combo-box';
import { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent } from './components/cv-content-switcher';
import {
  CvDataTable,
  CvDataTableRow,
  CvDataTableCell,
  CvDataTableAction,
  CvDataTableSkeleton,
} from './components/cv-data-table';
import { CvDatePicker } from './components/cv-date-picker';
import { CvDropdown, CvDropdownItem, CvDropdownSkeleton } from './components/cv-dropdown';
import { CvFileUploader, CvFileUploaderSkeleton } from './components/cv-file-uploader';
import { CvForm, CvFormItem, CvFormGroup } from './components/cv-form';
import { CvInlineLoading } from './components/cv-inline-loading';
import { CvInlineNotification } from './components/cv-inline-notification';
import { CvLink } from './components/cv-link';
import { CvList, CvListItem } from './components/cv-list';
import { CvLoading } from './components/cv-loading';
import { CvModal } from './components/cv-modal';
import { CvMultiSelect } from './components/cv-multi-select';
import { CvNumberInput, CvNumberInputSkeleton } from './components/cv-number-input';
import { CvOverflowMenu, CvOverflowMenuItem } from './components/cv-overflow-menu';
import { CvPagination } from './components/cv-pagination';
import { CvProgress, CvProgressStep } from './components/cv-progress';
import { CvRadioGroup, CvRadioButton } from './components/cv-radio-button';
import { CvSearch } from './components/cv-search';
import { CvSelect, CvSelectOption, CvSelectOptgroup } from './components/cv-select';
import { CvSkeletonText } from './components/cv-skeleton-text';
import { CvSliderSkeleton, CvSlider } from './components/cv-slider';
import {
  CvStructuredListData,
  CvStructuredListHeading,
  CvStructuredListItem,
  CvStructuredList,
} from './components/cv-structured-list';
import { CvTabs, CvTab, CvTabsSkeleton } from './components/cv-tabs';
import { CvTag, CvTagSkeleton } from './components/cv-tag';
import { CvTextArea } from './components/cv-text-area';
import { CvTextInput } from './components/cv-text-input';
import { CvTile } from './components/cv-tile';
import { CvTimePicker } from './components/cv-time-picker';
import { CvToastNotification } from './components/cv-toast-notification';
import { CvToggle, CvToggleSkeleton } from './components/cv-toggle';
import { CvToolbar, CvToolbarTitle, CvToolbarSearch, CvToolbarOption, CvToolbarDivider } from './components/cv-toolbar';
import { CvTooltip, CvInteractiveTooltip, CvDefinitionTooltip } from './components/cv-tooltip';
import {
  CvContent,
  CvHeaderGlobalAction,
  CvHeaderMenuButton,
  CvHeaderMenuItem,
  CvHeaderMenu,
  CvHeaderName,
  CvHeaderNav,
  CvHeaderSideNavItems,
  CvHeaderPanel,
  CvHeader,
  CvSideNavIcon,
  CvSideNavItems,
  CvSideNavLink,
  CvSideNavMenuItem,
  CvSideNavMenu,
  CvSideNav,
  CvSkipToContent,
  CvSwitcherItemLink,
  CvSwitcherItem,
  CvSwitcher,
} from './components/cv-ui-shell';

// exports
export { CvAccordion, CvAccordionItem, CvAccordionSkeleton };
export { CvBreadcrumb, CvBreadcrumbItem, CvBreadcrumbSkeleton };
export { CvButton, CvIconButton, CvButtonSkeleton, CvButtonSet };
export { CvCheckbox, CvCheckboxSkeleton };
export { CvCodeSnippet, CvCodeSnippetSkeleton };
export { CvComboBox };
export { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent };
export { CvDataTable, CvDataTableRow, CvDataTableCell, CvDataTableAction, CvDataTableSkeleton };
export { CvDatePicker };
export { CvDropdown, CvDropdownItem, CvDropdownSkeleton };
export { CvFileUploader, CvFileUploaderSkeleton };
export { CvForm, CvFormItem, CvFormGroup };
export { CvInlineLoading };
export { CvInlineNotification };
export { CvLink };
export { CvList, CvListItem };
export { CvLoading };
export { CvModal };
export { CvMultiSelect };
export { CvNumberInput, CvNumberInputSkeleton };
export { CvOverflowMenu, CvOverflowMenuItem };
export { CvPagination };
export { CvProgress, CvProgressStep };
export { CvRadioGroup, CvRadioButton };
export { CvSearch };
export { CvSelect, CvSelectOption, CvSelectOptgroup };
export { CvSkeletonText };
export { CvSlider, CvSliderSkeleton };
export { CvStructuredList, CvStructuredListItem, CvStructuredListHeading, CvStructuredListData };
export { CvTab, CvTabs, CvTabsSkeleton };
export { CvTag, CvTagSkeleton };
export { CvTextArea };
export { CvTextInput };
export { CvTile };
export { CvTimePicker };
export { CvToastNotification };
export { CvToggle, CvToggleSkeleton };
export { CvToolbar, CvToolbarTitle, CvToolbarSearch, CvToolbarOption, CvToolbarDivider };
export { CvTooltip, CvInteractiveTooltip, CvDefinitionTooltip };
export {
  CvContent,
  CvHeaderGlobalAction,
  CvHeaderMenuButton,
  CvHeaderMenuItem,
  CvHeaderMenu,
  CvHeaderName,
  CvHeaderPanel,
  CvHeaderNav,
  CvHeaderSideNavItems,
  CvHeader,
  CvSideNav,
  CvSideNavIcon,
  CvSideNavItems,
  CvSideNavLink,
  CvSideNavMenuItem,
  CvSideNavMenu,
  CvSkipToContent,
  CvSwitcherItemLink,
  CvSwitcherItem,
  CvSwitcher,
};
