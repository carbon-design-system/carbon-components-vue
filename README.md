# carbon-components-vue

[![Carbon Components Vue is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbon-components-vue.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbon-components-vue)

> **[Experimental]** Vue implementation of the Carbon Design System

> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using [<img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> Vue.js](https://vuejs.org/).

## Usage

### General

The components do not import any of the carbon styles themselves. Use the SCSS or CSS from carbon-components to provide the styling.
You can also use the unpkg cdn to bring in the styles wholesale - unpkg.com/carbon-components/css/carbon-components.css aliases the latest css file.

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
import CarbonComponentsVue from 'carbon-components-vue/src/index';
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
import CvButton from 'carbon-components-vue/src/components/cv-button/cv-button';
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
. . . <cv-button>Hello</cv-button>
```

## Project State

**v0.2.1 - Minor fixes**

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
| CvBarGraph               | :heavy_minus_sign: |                                                                                  |
| **CvBreadcrumb**         | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvBreadcrumb                     |
| **CvButton**             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvButton                         |
| **CvCheckbox**           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvCheckbox                       |
| **CvCodeSnippet**        | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvCodeSnippet&selectedStory=All  |
| **CvContentSwitcher**    | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvContentSwitcher                |
| CvDataTable              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/51          |
|                          |
| CvDatePicker             | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvDatePicker&selectedStory=All   |
| **CvDropdown**           | :heavy_minus_sign: | http://vue.carbondesignsystem.com/?selectedKind=CvDropdown                       |
|                          |
| CvFileUploader           | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvFileUploader&selectedStory=All |
| **CvForm**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvForm                           |
| CvGauge                  | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/49          |
|                          |
| **CvIcon**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvIcon                           |
| **CvInlineNotification** | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvInlineNotification             |
| CvLineGraph              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/53          |
|                          |
| **CvLink**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvLink                           |
| **CvList**               | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvList                           |
| **CvLoading**            | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvLoading                        |
| **CvModal**              | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvModal                          |
| **CvNumberInput**        | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvNumberInput                    |
| **CvOverflowMenu**       | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvOverflowMenu                   |
| **CvPagination**         | :white_check_mark: | http://vue.carbondesignsystem.com/?selectedKind=CvPagination&selectedStory=All   |
| CvPieChart               | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/52          |
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
