# carbon-components-vue

[![Carbon Components Vue is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbon-components-vue.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbon-components-vue)

> Vue implementation of the Carbon Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

## Usage

### General

The components do not import any of the carbon styles themselves. Use the SCSS or CSS from carbon-components to provide the styling.

- In your main js file (where you include Vue) you can include the styles wholesale: `import "carbon-components/css/carbon-components.min.css";`
- You can also use the unpkg cdn to bring in the styles wholesale: unpkg.com/carbon-components/css/carbon-components.min.css aliases the latest minified css file.
- If you prefer to build the SCSS, in the `<style>` tag of your top-level component you can include the styles wholesale: `@import "~carbon-components/scss/globals/scss/styles.scss";`
- Check out the [Carbon Design System developers](https://www.carbondesignsystem.com/getting-started/developers/vanilla) page for information on including individual component styles into your project.

### List of Available Components

View available Vue Components [here](http://vue.carbondesignsystem.com). Usage information is in the notes tab.

### Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/vue
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/vue
```

NOTE: https://www.npmjs.com/package/current-script-polyfill is required for older browsers (e.g. IE11)

### Using all at once

In your main js file (where you include Vue)

```javascript
// No need for Babel
import CarbonComponentsVue from '@carbon/vue';
```

alternatively if wanting to specify babel presets

```javascript
// need babel
import CarbonComponentsVue from '@carbon/vue/src/index';
Vue.use(CarbonComponentsVue);
```

### Using one at a time

In your main js file (where you include Vue)

```javascript
// No need for Babel
import { CvButton } from '@carbon/vue';
```

In a component file

```javascript
<script>
...
import CvButton from '@carbon/vue/src/components/cv-button/cv-button';
...
components: {
  CvButton,
},
...
</script>
```

### From unkpg

In your html file, no need to babel.

```html
<script src="https://unpkg.com/vue@latest" />
<script src="https://unpkg.com/@carbon/vue" />
<script>
Vue.use(window['carbon-vue'].default);
<script>

. . . <cv-button>Hello</cv-button>
```

## Project State

**1.0.0-beta.3**

- Add header and footer slots for CvTable
- Set button type="button" for all buttons except CvButton. This prevents form submit if a component happens to be inside a form.
- Added CvSkeletonText, CvAccordionSeketon and CvAccordionItemSekeleton.

**v1.0.0-beta.2**

- Removed Symbol use in prop types, fixing CvRadioButton, CvSlider and CvPagination use with the minified compiled modules.
- Minor story fixes

**v1.0.0-beta.1**

- Fix typo in CvContentSwitcherContent component name

**v1.0.0-beta.0**

- Storybook: update views
- CvFileUploader: added v-model and missing parts to
- CvToolbar: added
- CvDataTable: added minus the filter/toolbar
- Tests - Added unit test suite and first tests (CvTag)
- CvContentSwitcher - Added non-DOM direct content managment
- Turned helper and invalidMessages into slops (slot-prop hybrid)
- CvIcon - Downgraded to helper component to remove dependency on carbon-icons
- Renamed UMD and CommonJS modules from carbon-components-vue... to carbon-vue...

**v0.3.0**

- Initial data-viz/bar-graph added
- Story corrections
- Change use of \$parent to prefer events
- Chagne use of \$children to check child type
- Fix overflow and interactive-tooltip position on scroll/resize

**v0.2.9**

- Add gauge component - story is Data-viz/CvGauge
- Add pie chart component - story is Data-viz/CvPieChart
- Add router-link version of CvLink

**v0.2.8**
Correct duff deploy

**v0.2.7**

- Fix click on modal dialog closing it

**v0.2.6**

- Fix tab out of modal
- Remove unused vars

**v0.2.5 - Minor fixes**

- Make structured list native Vue
- Simplify structured list components
- Removed non-core CSS
- Fix to paginator reactivity

**v0.2.4 - Minor fixes**

- Make tooltip native Vue
- Tidy up a bit of unused code
- Make tabs native Vue and use carbon react pattern (breaks previous tab use)

**v0.2.3 - Minor fixes**

- Fix modal hide on main body click and show visible in story.
- Make cv-search native Vue.
- Make cv-number-input native Vue.

**v0.2.2 - Minor fixes**

- Fixed expandable tile and made it native Vue
- Made notification componentes native Vue
- Tidied toggle stories.

**v0.2.0 - Moved to Storybook 4**

- Knobs now operate as Vue properties the template is no longer replaced each time (as per Knobs in storybook 3)
- Story kinds array replaced by variants which define the settings used in each story.
- NOTE: slots no longer editable

**v0.1.0 - First draft of carbon-components-vue implementation**

This initial set of components, based on v9 of carbon components, includes draft implementations of all non-data viz components found in the core carbon components library. Public parts of the component: properties, events, data, methods, computed values are at this point subject to review at this point.

### Current Components

View available Vue.js components [here](http://vue.carbondesignsystem.com). Usage information is available when you click the blue ? icon in the top right corner of the selected component.

Current Version: 0.1
:white_check_mark: Ready
:warning: Under review
:heavy_minus_sign: Not available

| **Components**           | **State**          | **Link**                                                                         |
| ------------------------ | ------------------ | -------------------------------------------------------------------------------- |
| **CvAccordion**          | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvAccordion                      |
| CvBarGraph               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=Data-Viz%2FCvBarGraph            |
| **CvBreadcrumb**         | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvBreadcrumb                     |
| **CvButton**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvButton                         |
| **CvCheckbox**           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvCheckbox                       |
| **CvCodeSnippet**        | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvCodeSnippet&selectedStory=All  |
| **CvContentSwitcher**    | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvContentSwitcher                |
| CvDataTable              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/51          |
|                          |
| CvDatePicker             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvDatePicker&selectedStory=All   |
| **CvDropdown**           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvDropdown                       |
|                          |
| **CvFileUploader**       | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvFileUploader&selectedStory=All |
| **CvForm**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvForm                           |
| **CvGauge**              | :warning:          | https://github.com/carbon-design-system/carbon-components-vue/issues/49          |
|                          |
| **CvInlineNotification** | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvInlineNotification             |
| CvLineGraph              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/53          |
|                          |
| **CvLink**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvLink                           |
| **CvList**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvList                           |
| **CvLoading**            | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvLoading                        |
| **CvModal**              | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvModal                          |
| **CvNumberInput**        | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvNumberInput                    |
| **CvOverflowMenu**       | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvOverflowMenu                   |
| **CvPagination**         | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvPagination&selectedStory=All   |
| CvPieChart               | :warning:          | https://github.com/carbon-design-system/carbon-components-vue/issues/52          |
|                          |
| **CvProgress**           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvProgress                       |
| **CvRadioButton**        | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvRadioButton                    |
| CvScatterPlot            | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/50          |
|                          |
| **CvSearch**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvSearch                         |
| **CvSelect**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvSelect                         |
| **CvSlider**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvSlider                         |
| **CvStructuredList**     | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvStructuredList                 |
| **CvTabs**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTabs                           |
| **CvTag**                | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTag                            |
| **CvTextArea**           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTextArea                       |
| **CvTextInput**          | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTextInput                      |
| CvTimePicker             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTimePicker&selectedStory=All   |
| **CvTile**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTile                           |
| **CvToastNotification**  | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvToastNotification              |
| **CvToggle**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvToggle                         |
| **CvTooltip**            | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvTooltip                        |

## Development

Please refer to the [Contribution Guidelines](./.github/CONTRIBUTING.md) before starting any work.

### Contributing

Fork, create branch, submit PR. The PR will be used as part of a review process.

### Publishing this library on gh-pages

```bash
sh deploy-gh-pages.sh
```
