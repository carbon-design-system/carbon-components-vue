# Changelog

## 2.25.1

- Fix: missing readme

## 2.25.0

- Fix: tooltip on icon only button
- Feat: Add disabled attributes for forwards and backwards pagination buttons.

## 2.25.0-canary.0

### Chore

- Update to Carbon 10.11.2
- Update to node 12
- Update other dependencies

## 2.24.1

### Fix

Dropdown value presentation

## 2.24.0

##£ Feat

- Left and right options added to cv-tooltip

### Fix

- CvDropdown needed multiple tab presses to move past #868
- CircleCI deployment fix

### Chore

- Warn on duplicate IDs in table row and tab
- Dependency bot bumps
- Other dependency version bumps
- Update documentation on use of expanded/isExpanded in table rows

## 2.23.2

Publis canary fixes as listed

## 2.23.2-canary.1

### Fix

- CvContentSwitcher adds tablist to container #849

## 2.23.2-canary.0

### Fix

- CvDropdown placeholder updates
- CvContentSwitcher accessibility violation #849

### Chore

- Removed spurious 'await' usage

## 2.23.1

Roll up of canary releases.

## 2.23.1-canary.2

## Feat

- Add hideLabel property to CvCheckbox and raised bug relating to the shape of the component https://github.com/carbon-design-system/carbon/issues/5461

## Fix

- UIShell fix ids for controlled panels
- Overflow menu tooltip postion on IE11
- Interactive menu tooltip position on IE11
- Missing aria-label on CvDataTable batch action checkbox (aria-label-for-batch-checkbox)

## Chore

- Update package dependencies

## 2.23.0

### Fix

- Data table heading styles when sortable is used.

## 2.23.0-canary.0

### Feat

- Add change event to accordion on open close through UI. Show in story how to use to force single open.

### Fix

- Validator state checks in inline loadeing (allow case insensitive)
- CvSelect event usage in CvTimePicker and CvPagination changed to 'chagne' event to support IE 11.

## 2.22.0

### Fix

- Removed deprecation message when using size instead of small button property

## 2.22.0-canary.1 (feb 4th 2020)

### Feat

- Mobile number input version
- Expanded property added to UIShell sidenav menus
-

### Fix

- Number input tests
- Input event emit from CvNumberInput on use of up down buttons
- Add missing closeAriaLabel property to CvModal

### Chore

- Copy button position is stories
- FavIcon in storybook
- Linter warnings on story source loading
- CI messages

## 2.22.0-canary.0 (jan 29th 2020)

### Chore

- move to Vue CLI 4
- Fix node engine version
- Ensure CI Check run before deploying storybook

### Fix

- Linter warnings

## 2.21.0 (jan 24th 2020)

### fix

- Error icon used in inline-loading
- Toast notification notes typo

## 2.21.0-canary.0 (jan 21st 2020)

### feat

- Add size variations to CvModal
- Add hide selected option to CvDropDown.
- Make title only CvModal possible
- Add container option to CvTabs
- Update CvTag styling to 10.9
- Update CvSearch size options

### fix

- Tab behaviour when adding and removing tabs when selecting a tab immediately after

## 2.20.1 (jan 16th 2020)

- fix: Disable number input up down buttons when component disabled

## 2.20.1-canary.3 (jan 16th 2020)

- fix: Merge missing commits from last release

## 2.20.1-canary.2 (jan 16th 2020)

### fix

- Reverted to using stepUp/stepDOwn input methods for number input after checking IE11 support.
- Initial value of date picker was not being set

## 2.20.1-canary.1 (jan 10th 2020)

### fix

- Decimal number edits e.g. 10.001 with step 001. Using the keyboard to delete .001 caused .000 to be reapplied.

## 2.20.1-canary.0 (jan 3rd 2020)

### fix

- Possible IE11 fix for colspan > 1000 defaulting to 1
- Loading overlay fix

## 2.20.0 (Dec 16th 2019)

### fix

- Prevent double event on date change

## 2.20.0-canary.2 (Dec 13th 2019)

### Feat

- Add side nav rail feature
- Add support for light cv-tile (needs Carbon > 10.7.4)
- Add button set

### Fix

- Fixed some typos (requried -> required)
- Fix date picker change event error

## 2.20.0-canary.1 (Dec 6th 2019)

### Feat

- Update to carbon-components 10.7.4 DOM
- Add edning state to CvInlineLoader
- Make individual columns sortable in CvDataTable
- Router link object usage (Location)
- Additional tests
  - CvInlineLoader
  - CvInlineNotification
  - CvToastNotification
  - CvTextInput
  - CvList
  - CvLoading

### Chore

- Welcome page updates

### Fix

- Use internal pagination bind property
- IE11 missing input event (use change)
- icon use warning in toast notification
- SVG ClassList missing IE and pre canary Edge

## 2.20.0-canary.0 (Nov 21th 2019)

### Feat

- Add decimal ability to number input.

### Fix

- Fix CvIconButton tooltip

## 2.19.0 (Nov 19th 2019)

### Chore

- CvOverflowMenu correct html to include menu-item option-content span

## 2.19.0-canary.1 (Nov 18th 2019)

### Feat

- CvToggleSkeleton

### Fix

- Slot check reactivyt (accross 12 components with helperText and invalidMessage)
- CvCombobox placeholder
- CvMultiSelect filter clear event
- CvMultiSelect expand / close when clicking chevron
- CvCombobox auto-filter true at startup presenting empty list

### Chore

- CvLink tests
- CvTextArea tests
- Restored storybook version to keep package.json in sync

## 2.19.0-canary.0 (Nov 12th 2019)

### Chore

- Change CvTabs to use same HTML as core carbon.

## 2.18.0 (Nov 11th 2019)

### Feat

- Rework for SSR, removing all style tags from components in favour of using :style in the template.

## 2.17.1 (Nov 6th 2019)

### Fix

- CvTabs not closing lower indexed tabs

## 2.17.0 (Nov 4th 2019)

### Feat

- Tests added or updated for
  - CvAccordion
  - CvWrapper
  - CvCheckbox
  - CvToggle
  - CvTag
  - CvRadioButton
  - CvTabs
- Updated CvTabs behaviour when tab list is dynamic

### Fix

- Dropdown workingn when disabled
- Overflow not closing on button click

## 2.16.0 (Oct 28th 2019)

### Feat

Allow number input to work with string or number for value, v-model and events.

### Chore

Updated tests for

- CvBreadcrumb
- CvButton
- CvBNumberInput
- CvTag

### Fix

CvButton raising two click events

## 2.15.0 (Oct 24th 2019)

### Feat

- Add v-model for date picker
- Add up down aria labels for number input
- Update to Carbon 10.7
  - CvButton, CvIconButton
  - CvComboBox
  - CvContentSwitcher
  - CvDataTable
  - CvDropdown
  - CvFileUploader
  - CvInlineNotification
  - CvLink
  - CvList
  - CvNumberInput
  - CvOverflowMenu
  - CvToastNotification
  - CvTextInput
  - CvToggle
  - CvTags
- Add expand all to data table
- Add inline link
- Add nested list ordering
- Add CvTabsSkeleton component
- Tests for CvCheckbox, CvToggle, CvBreadcrumb added
- Rework tabs component to behave better when dynamically adding/removing tabs.
- Added CvTabs property no-default-to-first option to revent auto default to first tab.
- Add hover expand for header menu items
- Add keyboard scroll to modal dialog, suppressing background scroll.

### Fix

- Uploader skeleton typo
- CvTabs behaviour when switching tab set (beforeDestory event name typo)
- Remove trimRight usage for wider support

### Chore

- Tidy up knobs
- Work on tests

## 2.14.0 (Sept 25, 2019)

### Feat

- Add various optional customisable labels/text where they previously were fixed.
- Allow primary button to be disabled on the modal dialog
- Add disabled property to CvLink and other components with links

### Fixes

- Tidy up popups (CvOverflowMenu and CvInteractiveTooltip) on beforeDestroy event
- To date activation in date picker range mode (was activating from on icon click)

## 2.13.0 (Sept 20, 2019)

### Feat

- code snippet now has
  - light theme
  - customisable copy feedback and aria label
- Modal
  - Add 'auto-hide-off' property which causes 'modal-hide-request' events to be raised instead of auto closing

### Fix

- Stop overflow menu grabbing focus on close
- v-model for selectable tile

## 2.12.7 (Sept 13, 2019)

### Feat

- Add vertical progress bar

### Fix

- Code snippet no longer copies encoded html
- Correct tab story
- Fix checkbox v-model unefined
- Fix panel expansion event
- Add v-model for header panels
- Re-order header panel events
- Update lock file
- Fix combobox input spilling into controls
- Fix non-cv-button types (cv-data-table, cv-text-input password button)
- Password input button labels
- Update data table to have attributes for cancel button and search labels.

## 2.12.6 (August 14, 2019)

### Fix

- Add missing title to CvHeaderMenu.

## 2.12.5 (August 6, 2019)

See changes below.

## 2.12.5-rc.0 (August 5, 2019)

### Fix

- Change how cv-link and other link-mixin usage

## 2.12.4 (August 3, 2019)

### Fix

- Correct clear button color for combobox and multiselect
- Fix value/v-model updates for combobox

## 2.12.3 (August 1, 2019)

### Fix

The following is true for combobox and multi-select

- Removed space auto-completion to allow spaces in filter.
- Enter now used for auto-completion
- Escapes regex special characters

## 2.12.2 (July 30, 2019)

### Fix

- CvPagination case when number of items is zero.

# Changelog

## 2.12.1 (July 25, 2019)

### Fix

- CvDropdown component was incorrectly named CvDropdownInner

## 2.12.0 (July 22, 2019)

### Features

- Add table pagination scoped slot pass through.
- Add table skeleton
- Add initial change vent to pagination

### Fix

- CvHeaderNav aria-label usage
- Update lodash based on security alert

## 2.11.0 (July 16, 2019)

### Features

- Add vertical options to radio button group
- Add left-label option to radio button

### Fixes

- add default tab id
- move non-breaking space in header name due to rendering differences
- make aria-controls optional in header-global-action
- hide data table toolbar when empty

## 2.10.0 (July 10, 2019)

### Feat

- Add CvContent to UI shell
- Correct switch between 'router-link' and 'a' tag based on use of 'href' or 'to' in links

## 2.9.0 (July 9, 2019)

### Feat

- Move multi-select to experimental
- Updates to multi select API
- Add combo box
- Update export to surface individual components

## 2.8.0 (June 27, 2019)

### Feat

- Added scoped slots to table for constructed string.

## 2.7.0 (June 27, 2019)

### Feat

- Add multi select dropdown (without filter)
- Added scoped slots to pagination for constructed strings.

## 2.6.2 (June 24, 2019)

### Fixes

- Removed side nav sub menu close on focusout
- Removed spurious \ in header menu button
- Fixed active menu button status
- Temp CSS fix for Safari not moving following side nav chevrons on expand.

## 2.6.1 (June 21, 2019)

### Fixes

- Add page to pagination change event
- Fix text input password layout.

### Chores

- Update dependencies

## 2.6.0 (June 19, 2019)

### Features

- Wire up hide/show to footer link in ui shell side nav
- Add Space in header between name and prefix

### Fixes

- Focus on side nav and header panel links

### Chores

- Added UI shell notes
- Make link logic (anchor or router-link) common

## 2.5.0 (June 4, 2019)

### Features

- Add UI Shell
  - Added Header
  - Added right panels with global actions
  - Added left nav

### Fixes

- Aria label on overflow menu and toast nofification

### Chores

- Removed data-viz

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.3.0  |       |
| carbon-components | 10.3.0  |       |
| flatpickr         | 4.6.1   |       |
| vue               | 2.6.10  |       |

## 2.4.0 (June 4, 2019)

- Add disabled tag

## 2.3.0 (June 3, 2019)

### Features

- Added an example project
- Marked CvDataTable as ready
- Added initial CvHeader component and some parts
- Added cv-tag skeleton
- Added cv-slider skeleton
- Added tag disabled feature

### Bug Fixes

- Time picker story fix
- Tab usage of dropdown when narrow
- Restored tag fileter story

### Chores

- Removed Carbon 9 / X switches
- Updated Carbon dependencies

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.2.0  |       |
| carbon-components | 10.2.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.2.1 (May 24, 2019)

### Fixes

- Ensure tab disabled when created with disabled attribute

## 2.2.0 (May 24, 2019)

### General

- Some code tidying, removing v9 code.
- Dependency updates to potential issue See #441

### Features

- Add \$attrs to nav element of cv-tabs, this allows aria-label to be specified on the nav.

## 2.1.1 (May 15, 2019)

### Fixes

- Change @carbon/icons-vue/lib to @carbon/icons/vue/es

## 2.1.0 (May 14, 2019)

### Features

- Add expanding content feature to table

## 2.0.7 (May 7, 2019)

### Bug fixes

- Various table pagination fixes
- Ensure search is available when @search event is listented to.

## 2.0.4/5/6 (May 3, 2019)

### Bug fixes

- Table pagination fixes

## 2.0.3 (April 24, 2019)

### Bug fixes

- Correct cv-tab name

## 2.0.1/2 (April 24, 2019)

### Bug fixes

- Correct tabs narrow styling
- Correct dropdown initial value

## 2.0.0 (April 24, 2019)

### Features

- Added filter tag
- Added disabled state for tab component

### Bug Fixes

- Fixed multiple roots in dropdown.
- Fixes to table layout
- Fixes to search
- Styling fixes for structured list selectable

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-beta.2 (April 16, 2019)

### Features

- Add up overflow menu
- Some story updates

### Bug Fixes

- Remove linter warnings from structured list

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-beta.1 (April 12, 2019)

As per beta 0 fresh build

## 2.0.0-beta.0 (April 12, 2019)

### Features

- Carbon 10 data table

### Bug Fixes

- Search review fixes
- Select review fixes
- Select initial selected enhancment
- Added missing experimental stories
- A number of data table fixes (still not ready)
- Dropdown review fixes

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.7   |       |
| vue               | 2.6.10  |       |

## 2.0.0-alpha.2 (April 10, 2019)

### Features

- Carbon 10 data table

### Bug Fixes

- Correct breadcrumb story
- Checkbox mixed updates
- Multiline code snippet layout
- Inline code snippet example made smaller
- Fixed number input layout
- Fixed overflow menu layout
- Fixed pagination layout

### Dependency versions

Versions reflect those version was built using.

| Dependency        | Version | Notes |
| ----------------- | ------- | ----- |
| @carbon/icons-vue | 10.0.0  |       |
| carbon-components | 10.1.0  |       |
| flatpickr         | 4.5.2   |       |
| vue               | 2.6.10  |       |

## 1.1.1 (March 19, 2019)

### Features

- A number of experimental additions for carbon x
- Change node requirements to > 10 in package.json

### Bug Fixes

- Fix tabs on narrow screens (#273)
- Fix dorpdown-items v-for (#273)

### Dependency versions

Versions reflect those version was built using.

| Dependency           | Version      | Notes                    |
| -------------------- | ------------ | ------------------------ |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only        |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only        |
| carbon-components    | 9.70.1       |                          |
| d3                   | 5.8.2        | Only needed for data-viz |
| flatpickr            | 4.5.2        |                          |
| vue                  | 2.6.3        |                          |

## 1.1.0 (March 14, 2019)

### Features

- Experimental CvCodeSnippet behind feature flag (#244).
- Experimental CvContentSwitcher behind feature flag (#246)
- Experimental CvDatePicker behind feature flag (#251)
- Added CvInlineLoader (#253)
- Added password behviour for CvTextInput (#254)
- Experimental toggle added for supporting components (#257)

### Bug Fixes

- chore: Reduced storybook CSS payload
- fix: Checkbox hover when disabled (#241)
- fix: add missing inherit attrs false (#249)
- fix: show tip and hide tip buttons for interactive tooltip storybook (#248)
- fix: content switcher icon spacing (#258)

### Dependency versions

Versions reflect those version was built using.

| Dependency           | Version      | Notes                    |
| -------------------- | ------------ | ------------------------ |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only        |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only        |
| carbon-components    | 9.70.1       |                          |
| d3                   | 5.8.2        | Only needed for data-viz |
| flatpickr            | 4.5.2        |                          |
| vue                  | 2.6.3        |                          |

## 1.0.2 (Mar 8, 2019)

### Features

- Add row-select-change and row-select-changes events to table.
- Add rows-selected property to table
- Add use rows-selected with v-model for table

### Bug fixes

- Fix overflow menu issue #234

### Dependency versions

| Dependency           | Version      | Notes                                           |
| -------------------- | ------------ | ----------------------------------------------- |
| @carbon/icon-helpers | 0.0.1-beta.0 | experimental only                               |
| @carbon/icons-vue    | 0.0.1-beta.0 | experimental only                               |
| carbon-components    | 9.70.1       |                                                 |
| d3                   | 5.7.0        | Only needed for data-viz                        |
| flatpickr            | 4.5.1        |                                                 |
| vue                  | 2.6.1        | some reactivity (e.g. data table) requires this |

## 1.0.1 (Mar 4, 2019)

- Removed setTimeout use
- Added Skeleton components for
- CvFileUpload
- CvDropdown
- CvCodeSnippet
- CvCheckbox

## 1.0.0 (Feb 19, 2019) :balloon: :tada: :balloon: :coffee: :balloon:

- Add actions option to data table
- Add batch actions option to data table
- Updated table pagination
- Add CvDataTableRow and CvDataTableCell to allow HTML use in tables
- Add CvButtonSkeleton
- Add overflow menu option to table.

## 1.0.0-beta.4 (Feb 13, 2019)

- Fix initially hidden expanding tile behaviour.
- Add CvBreadCrumbSkeleton

## 1.0.0-beta.3 (Feb 13, 2019)

- Add header and footer slots for CvTable
- Set button type="button" for all buttons except CvButton. This prevents form submit if a component happens to be inside a form.
- Added CvSkeletonText, CvAccordionSeketon and CvAccordionItemSekeleton.

## v1.0.0-beta.2 (Feb 10, 2019)

- Removed Symbol use in prop types, fixing CvRadioButton, CvSlider and CvPagination use with the minified compiled modules.
- Minor story fixes
- Fix typo in CvContentSwitcherContent component name

## v1.0.0-beta.1 (Feb 10, 2019)

FAIL

## v1.0.0-beta.0 (Feb 8, 2019)

- Storybook: update views
- CvFileUploader: added v-model and missing parts to
- CvToolbar: added
- CvDataTable: added minus the filter/toolbar
- Tests - Added unit test suite and first tests (CvTag)
- CvContentSwitcher - Added non-DOM direct content managment
- Turned helper and invalidMessages into slops (slot-prop hybrid)
- CvIcon - Downgraded to helper component to remove dependency on carbon-icons
- Renamed UMD and CommonJS modules from carbon-components-vue... to carbon-vue...

## v0.3.0 (Feb 1, 2019)

- Initial data-viz/bar-graph added
- Story corrections
- Change use of \$parent to prefer events
- Chagne use of \$children to check child type
- Fix overflow and interactive-tooltip position on scroll/resize

## v0.2.9 (Jan 25, 2019)

- Add gauge component - story is Data-viz/CvGauge
- Add pie chart component - story is Data-viz/CvPieChart
- Add router-link version of CvLink

## v0.2.8 (Jan 23, 2019)

Correct duff deploy

## v0.2.7 (Jan 23, 2019)

- Fix click on modal dialog closing it

## v0.2.6 (Jan 23, 2019)

- Fix tab out of modal
- Remove unused vars

## v0.2.5 - Minor fixes (Jan 22, 2019)

- Make structured list native Vue
- Simplify structured list components
- Removed non-core CSS
- Fix to paginator reactivity

## v0.2.4 - Minor fixes (Jan 18, 2019)

- Make tooltip native Vue
- Tidy up a bit of unused code
- Make tabs native Vue and use carbon react pattern (breaks previous tab use)

## v0.2.3 - Minor fixes (Jan 14, 2019)

- Fix modal hide on main body click and show visible in story.
- Make cv-search native Vue.
- Make cv-number-input native Vue.

## v0.2.2 - Minor fixes (Jan 10, 2019)

- Fixed expandable tile and made it native Vue
- Made notification componentes native Vue
- Tidied toggle stories.

## v0.2.0 - Moved to Storybook 4 (Jan 10, 2019)

- Knobs now operate as Vue properties the template is no longer replaced each time (as per Knobs in storybook 3)
- Story kinds array replaced by variants which define the settings used in each story.
- NOTE: slots no longer editable

## v0.1.0 - First draft of carbon-components-vue implementation (Dec 3, 2018)

This initial set of components, based on v9 of carbon components, includes draft implementations of all non-data viz components found in the core carbon components library. Public parts of the component: properties, events, data, methods, computed values are at this point subject to review at this point.
