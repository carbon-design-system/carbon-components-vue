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
export { CvAccordion, CvAccordionItem, CvAccordionSkeleton } from './components/cv-accordion';
export { CvAspectRatio } from './components/cv-aspect-ratio';
export { CvBreadcrumb, CvBreadcrumbItem, CvBreadcrumbSkeleton } from './components/cv-breadcrumb';
export { CvButton, CvIconButton, CvButtonSkeleton, CvButtonSet } from './components/cv-button';
export { CvCheckbox, CvCheckboxSkeleton } from './components/cv-checkbox';
export { CvCodeSnippet, CvCodeSnippetSkeleton } from './components/cv-code-snippet';
export { CvComboBox } from './components/cv-combo-box';
export { CvContentSwitcher, CvContentSwitcherButton, CvContentSwitcherContent } from './components/cv-content-switcher';
export {
  CvDataTable,
  CvDataTableRow,
  CvDataTableCell,
  CvDataTableAction,
  CvDataTableSkeleton,
  CvDataTableHeading,
} from './components/cv-data-table';
export { CvDatePicker } from './components/cv-date-picker';
export { CvDropdown, CvDropdownItem, CvDropdownSkeleton } from './components/cv-dropdown';
export { CvFileUploader, CvFileUploaderSkeleton } from './components/cv-file-uploader';
export { CvForm, CvFormItem, CvFormGroup } from './components/cv-form';
export { CvGrid, CvRow, CvColumn } from './components/cv-grid';
export { CvInlineLoading } from './components/cv-inline-loading';
export { CvInlineNotification } from './components/cv-inline-notification';
export { CvLink } from './components/cv-link';
export { CvList, CvListItem } from './components/cv-list';
export { CvLoading } from './components/cv-loading';
export { CvModal } from './components/cv-modal';
export { CvMultiSelect } from './components/cv-multi-select';
export { CvNumberInput, CvNumberInputSkeleton } from './components/cv-number-input';
export { CvOverflowMenu, CvOverflowMenuItem } from './components/cv-overflow-menu';
export { CvPagination } from './components/cv-pagination';
export { CvProgress, CvProgressStep } from './components/cv-progress';
export { CvRadioGroup, CvRadioButton } from './components/cv-radio-button';
export { CvSearch } from './components/cv-search';
export { CvSelect, CvSelectOption, CvSelectOptgroup } from './components/cv-select';
export { CvSkeletonText } from './components/cv-skeleton-text';
export { CvSliderSkeleton, CvSlider } from './components/cv-slider';
export {
  CvStructuredListData,
  CvStructuredListHeading,
  CvStructuredListItem,
  CvStructuredList,
} from './components/cv-structured-list';
export { CvTabs, CvTab, CvTabsSkeleton } from './components/cv-tabs';
export { CvTag, CvTagSkeleton } from './components/cv-tag';
export { CvTextArea } from './components/cv-text-area';
export { CvTextInput } from './components/cv-text-input';
export { CvTile } from './components/cv-tile';
export { CvTimePicker } from './components/cv-time-picker';
export { CvToastNotification } from './components/cv-toast-notification';
export { CvToggle, CvToggleSkeleton } from './components/cv-toggle';
export { CvToolbar, CvToolbarTitle, CvToolbarSearch, CvToolbarOption, CvToolbarDivider } from './components/cv-toolbar';
export { CvTooltip, CvInteractiveTooltip, CvDefinitionTooltip } from './components/cv-tooltip';
export {
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
  CvSideNavDivider,
  CvSkipToContent,
  CvSwitcherItemLink,
  CvSwitcherItem,
  CvSwitcher,
} from './components/cv-ui-shell';
