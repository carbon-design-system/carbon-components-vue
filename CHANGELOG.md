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
