/// <reference path="index.d.ts" />
const ctx = require.context(
  './components/',
  true,
  /^(?!.*(?:\/_|\.stories\.vue|\.test\.vue|\.spec\.vue)).*\.vue$/
);
const components = ctx.keys().map(k => {
  const fn = k.split('/').slice(-1)[0];
  const compName = fn.slice(0, -4);
  return { name: compName, component: ctx(k) };
});

// Export the components as a plugin
export default {
  // options is an array of components to be registered
  // e.g. ['c-button', 'c-modal']

  /**
   * @typedef {import("vue").App} App
   */

  /**
   * Install plugin in Vue
   * @param {App} Vue
   * @param {Array<string>} options
   */
  install(Vue, options) {
    if (typeof options === 'undefined') {
      for (let c of components) {
        Vue.component(c.name, c.component.default);
      }
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }

      for (let c of components) {
        // register only components specified in the options
        if (options.includes(c.name)) {
          Vue.component(c.name, c.component.default);
        }
      }
    }
  },
};

// AUTO-GENERATED EXPORTS - DO NOT EDIT BELOW
export { default as CvAccordion } from './components/CvAccordion/CvAccordion.vue';
export { default as CvAccordionItem } from './components/CvAccordion/CvAccordionItem.vue';
export { default as CvAccordionSkeleton } from './components/CvAccordion/CvAccordionSkeleton.vue';
export { default as CvAspectRatio } from './components/CvAspectRatio/CvAspectRatio.vue';
export { default as CvBreadcrumb } from './components/CvBreadcrumb/CvBreadcrumb.vue';
export { default as CvBreadcrumbItem } from './components/CvBreadcrumb/CvBreadcrumbItem.vue';
export { default as CvBreadcrumbSkeleton } from './components/CvBreadcrumb/CvBreadcrumbSkeleton.vue';
export { default as CvBreadcrumbSkeletonItem } from './components/CvBreadcrumb/CvBreadcrumbSkeletonItem.vue';
export { default as CvButton } from './components/CvButton/CvButton.vue';
export { default as CvButtonSet } from './components/CvButton/CvButtonSet.vue';
export { default as CvButtonSkeleton } from './components/CvButton/CvButtonSkeleton.vue';
export { default as CvIconButton } from './components/CvButton/CvIconButton.vue';
export { default as CvCheckbox } from './components/CvCheckbox/CvCheckbox.vue';
export { default as CvCheckboxSkeleton } from './components/CvCheckbox/CvCheckboxSkeleton.vue';
export { default as CvCodeSnippet } from './components/CvCodeSnippet/CvCodeSnippet.vue';
export { default as CvCodeSnippetSkeleton } from './components/CvCodeSnippet/CvCodeSnippetSkeleton.vue';
export { default as CvComboBox } from './components/CvComboBox/CvComboBox.vue';
export { default as CvContentSwitcher } from './components/CvContentSwitcher/CvContentSwitcher.vue';
export { default as CvContentSwitcherButton } from './components/CvContentSwitcher/CvContentSwitcherButton.vue';
export { default as CvContentSwitcherContent } from './components/CvContentSwitcher/CvContentSwitcherContent.vue';
export { default as CvCopyButton } from './components/CvCopyButton/CvCopyButton.vue';
export { default as CvDataTable } from './components/CvDataTable/CvDataTable.vue';
export { default as CvDataTableAction } from './components/CvDataTable/CvDataTableAction.vue';
export { default as CvDataTableCell } from './components/CvDataTable/CvDataTableCell.vue';
export { default as CvDataTableHeading } from './components/CvDataTable/CvDataTableHeading.vue';
export { default as CvDataTableRow } from './components/CvDataTable/CvDataTableRow.vue';
export { default as CvDataTableSkeleton } from './components/CvDataTable/CvDataTableSkeleton.vue';
export { default as CvDatePicker } from './components/CvDatePicker/CvDatePicker.vue';
export { default as CvDatePickerSkeleton } from './components/CvDatePicker/CvDatePickerSkeleton.vue';
export { default as CvDropdown } from './components/CvDropdown/CvDropdown.vue';
export { default as CvDropdownItem } from './components/CvDropdown/CvDropdownItem.vue';
export { default as CvDropdownSkeleton } from './components/CvDropdown/CvDropdownSkeleton.vue';
export { default as CvFileUploader } from './components/CvFileUploader/CvFileUploader.vue';
export { default as CvFileUploaderItem } from './components/CvFileUploader/CvFileUploaderItem.vue';
export { default as CvFileUploaderSkeleton } from './components/CvFileUploader/CvFileUploaderSkeleton.vue';
export { default as CvForm } from './components/CvForm/CvForm.vue';
export { default as CvFormGroup } from './components/CvForm/CvFormGroup.vue';
export { default as CvFormItem } from './components/CvForm/CvFormItem.vue';
export { default as CvColumn } from './components/CvGrid/CvColumn.vue';
export { default as CvGrid } from './components/CvGrid/CvGrid.vue';
export { default as CvRow } from './components/CvGrid/CvRow.vue';
export { default as CvInlineLoading } from './components/CvInlineLoading/CvInlineLoading.vue';
export { default as CvLink } from './components/CvLink/CvLink.vue';
export { default as CvList } from './components/CvList/CvList.vue';
export { default as CvListItem } from './components/CvList/CvListItem.vue';
export { default as CvLoading } from './components/CvLoading/CvLoading.vue';
export { default as CvModal } from './components/CvModal/CvModal.vue';
export { default as CvMultiSelect } from './components/CvMultiSelect/CvMultiSelect.vue';
export { default as CvInlineNotification } from './components/CvNotification/CvInlineNotification.vue';
export { default as CvToastNotification } from './components/CvNotification/CvToastNotification.vue';
export { default as CvNumberInput } from './components/CvNumberInput/CvNumberInput.vue';
export { default as CvNumberInputSkeleton } from './components/CvNumberInput/CvNumberInputSkeleton.vue';
export { default as CvOverflowMenu } from './components/CvOverflowMenu/CvOverflowMenu.vue';
export { default as CvOverflowMenuItem } from './components/CvOverflowMenu/CvOverflowMenuItem.vue';
export { default as CvPagination } from './components/CvPagination/CvPagination.vue';
export { default as CvProgress } from './components/CvProgress/CvProgress.vue';
export { default as CvProgressSkeleton } from './components/CvProgress/CvProgressSkeleton.vue';
export { default as CvProgressStep } from './components/CvProgress/CvProgressStep.vue';
export { default as CvRadioButton } from './components/CvRadioButton/CvRadioButton.vue';
export { default as CvRadioGroup } from './components/CvRadioButton/CvRadioGroup.vue';
export { default as CvSearch } from './components/CvSearch/CvSearch.vue';
export { default as CvSelect } from './components/CvSelect/CvSelect.vue';
export { default as CvSelectOptgroup } from './components/CvSelect/CvSelectOptgroup.vue';
export { default as CvSelectOption } from './components/CvSelect/CvSelectOption.vue';
export { default as CvSkeletonText } from './components/CvSkeletonText/CvSkeletonText.vue';
export { default as CvSlider } from './components/CvSlider/CvSlider.vue';
export { default as CvSliderSkeleton } from './components/CvSlider/CvSliderSkeleton.vue';
export { default as CvStructuredList } from './components/CvStructuredList/CvStructuredList.vue';
export { default as CvStructuredListData } from './components/CvStructuredList/CvStructuredListData.vue';
export { default as CvStructuredListHeading } from './components/CvStructuredList/CvStructuredListHeading.vue';
export { default as CvStructuredListItem } from './components/CvStructuredList/CvStructuredListItem.vue';
export { default as CvStructuredListItemSelectable } from './components/CvStructuredList/CvStructuredListItemSelectable.vue';
export { default as CvStructuredListItemStandard } from './components/CvStructuredList/CvStructuredListItemStandard.vue';
export { default as CvTab } from './components/CvTabs/CvTab.vue';
export { default as CvTabs } from './components/CvTabs/CvTabs.vue';
export { default as CvTabsSkeleton } from './components/CvTabs/CvTabsSkeleton.vue';
export { default as CvTag } from './components/CvTag/CvTag.vue';
export { default as CvTagSkeleton } from './components/CvTag/CvTagSkeleton.vue';
export { default as CvTextArea } from './components/CvTextArea/CvTextArea.vue';
export { default as CvTextAreaSkeleton } from './components/CvTextArea/CvTextAreaSkeleton.vue';
export { default as CvTextInput } from './components/CvTextInput/CvTextInput.vue';
export { default as CvTextInputSkeleton } from './components/CvTextInput/CvTextInputSkeleton.vue';
export { default as CvTile } from './components/CvTile/CvTile.vue';
export { default as CvTileClickable } from './components/CvTile/CvTileClickable.vue';
export { default as CvTileExpandable } from './components/CvTile/CvTileExpandable.vue';
export { default as CvTileSelectable } from './components/CvTile/CvTileSelectable.vue';
export { default as CvTileStandard } from './components/CvTile/CvTileStandard.vue';
export { default as CvTimePicker } from './components/CvTimePicker/CvTimePicker.vue';
export { default as CvToggleSkeleton } from './components/CvToggle/CvToggle-Skeleton.vue';
export { default as CvToggle } from './components/CvToggle/CvToggle.vue';
export { default as CvDefinitionTooltip } from './components/CvTooltip/CvDefinitionTooltip.vue';
export { default as CvInteractiveTooltip } from './components/CvTooltip/CvInteractiveTooltip.vue';
export { default as CvTooltip } from './components/CvTooltip/CvTooltip.vue';
export { default as CvContent } from './components/CvUIShell/CvContent.vue';
export { default as CvHeader } from './components/CvUIShell/CvHeader.vue';
export { default as CvHeaderGlobalAction } from './components/CvUIShell/CvHeaderGlobalAction.vue';
export { default as CvHeaderMenu } from './components/CvUIShell/CvHeaderMenu.vue';
export { default as CvHeaderMenuButton } from './components/CvUIShell/CvHeaderMenuButton.vue';
export { default as CvHeaderMenuItem } from './components/CvUIShell/CvHeaderMenuItem.vue';
export { default as CvHeaderName } from './components/CvUIShell/CvHeaderName.vue';
export { default as CvHeaderNav } from './components/CvUIShell/CvHeaderNav.vue';
export { default as CvHeaderPanel } from './components/CvUIShell/CvHeaderPanel.vue';
export { default as CvSideNav } from './components/CvUIShell/CvSideNav.vue';
export { default as CvSideNavIcon } from './components/CvUIShell/CvSideNavIcon.vue';
export { default as CvSideNavItems } from './components/CvUIShell/CvSideNavItems.vue';
export { default as CvSideNavLink } from './components/CvUIShell/CvSideNavLink.vue';
export { default as CvSideNavMenu } from './components/CvUIShell/CvSideNavMenu.vue';
export { default as CvSideNavMenuDivider } from './components/CvUIShell/CvSideNavMenuDivider.vue';
export { default as CvSideNavMenuItem } from './components/CvUIShell/CvSideNavMenuItem.vue';
export { default as CvSkipToContent } from './components/CvUIShell/CvSkipToContent.vue';
export { default as CvSwitcher } from './components/CvUIShell/CvSwitcher.vue';
export { default as CvSwitcherItem } from './components/CvUIShell/CvSwitcherItem.vue';
export { default as CvSwitcherItemLink } from './components/CvUIShell/CvSwitcherItemLink.vue';
export { default as PanelFocusTestComponent } from './components/CvUIShell/__tests__/PanelFocusTestComponent.vue';
