# carbon-components-vue

[![Carbon Components Vue is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbon-components-vue.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbon-components-vue)

> **[Experimental]** Vue implementation of the Carbon Design System

> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using [<img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> Vue.js](https://vuejs.org/).

## Project goals and principles

The intention is to provide a library of robust and high-quality components to assist
a developer working with [Vue.js](https://vuejs.org) to leverage the [Carbon Design System](https://github.com/carbon-design-system) in their applications. The components are built with best practices (see our [Contribution Guidelines](./.github/CONTRIBUTING.md) for more details) to make full use of the Vue.js framework and integrate simply and efficiently into Vue.js applications. We intend these components to be exemplary, and therefore value getting the design principles and details right over rushing to a tactical delivery.

This project is a collaborative effort to embody the Carbon design system in Vue.js. In terms of guidance for the component designs, reference has been made to [carbon components react](https://github.com/carbon-design-system/carbon-components-react).

This project is intended to be strictly focused on Vue.js implementations of the [Carbon Components](https://github.com/carbon-design-system/carbon-components).

- Each component, used as documented, should render the HTML with attached CSS and JS as specified and illustrated by [Carbon Components](https://github.com/carbon-design-system/carbon-components), nothing more, nothing less.
- If we find a defect or deficiency in the [Carbon Components](https://github.com/carbon-design-system/carbon-components), we should raise an issue with that project, and assist in delivering a fix if possible, rather than cause this project to deviate from the [Carbon Components](https://github.com/carbon-design-system/carbon-components).
- This project will not include additional components not part of [Carbon Components](https://github.com/carbon-design-system/carbon-components), however helpful they seem, nor combination components to enable particular patterns of usage. Such add-ons may be very useful but should form satellite projects to this one.
- In terms of component structure, names and properties, this project will follow the lead established by [carbon components react](https://github.com/carbon-design-system/carbon-components-react), and only deviate if there are compelling reasons to do so.

## Project State

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
| **CvAccordion**          | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvAccordion                      |
| CvBarGraph               | :heavy_minus_sign: |                                                                                  |
| **CvBreadcrumb**         | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvBreadcrumb                     |
| **CvButton**             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvButton                         |
| **CvCheckbox**           | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvCheckbox                       |
| **CvCodeSnippet**        | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvCodeSnippet&selectedStory=All  |
| **CvContentSwitcher**    | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvContentSwitcher                |
| CvDataTable              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/51          |
|                          |
| CvDatePicker             | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvDatePicker&selectedStory=All   |
| **CvDropdown**           | :heavy_minus_sign: | http://vue.carbondesignsystem.com/?selectedKind=CvDropdown                       |
|                          |
| CvFileUploader           | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvFileUploader&selectedStory=All |
| **CvForm**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvForm                           |
| CvGauge                  | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/49          |
|                          |
| **CvIcon**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvIcon                           |
| **CvInlineNotification** | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvInlineNotification             |
| CvLineGraph              | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/53          |
|                          |
| **CvLink**               | :warning:          | http://vue.carbondesignsystem.com/?selectedKind=CvLink                           |
| **CvList**               | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvList                           |
| **CvLoading**            | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvLoading                        |
| **CvModal**              | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvModal                          |
| **CvNumberInput**        | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvNumberInput                    |
| **CvOverflowMenu**       | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvOverflowMenu                   |
| **CvPagination**         | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvPagination&selectedStory=All   |
| CvPieChart               | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/52          |
|                          |
| **CvProgress**           | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvProgress                       |
| **CvRadioButton**        | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvRadioButton                    |
| CvScatterPlot            | :heavy_minus_sign: | https://github.com/carbon-design-system/carbon-components-vue/issues/50          |
|                          |
| **CvSearch**             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvSearch                         |
| **CvSelect**             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvSelect                         |
| **CvSlider**             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvSlider                         |
| **CvStructuredList**     | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvStructuredList                 |
| **CvTabs**               | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTabs                           |
| **CvTag**                | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTag                            |
| **CvTextArea**           | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTextArea                       |
| **CvTextInput**          | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTextInput                      |
| CvTimePicker             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTimePicker&selectedStory=All   |
| **CvTile**               | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTile                           |
| **CvToastNotification**  | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvToastNotification              |
| **CvToggle**             | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvToggle                         |
| **CvTooltip**            | :white_check:      | http://vue.carbondesignsystem.com/?selectedKind=CvTooltip                        |

## Usage

### General

The components do not import any of the carbon styles themselves. Use the SCSS or CSS from carbon-components to provide the styling.
You can also use the unpkg cdn to bring in the styles wholesale - unpkg.com/carbon-components/css/carbon-components.css aliases the latest css file.

### All at once

In your main js file (where you include Vue)

```javascript
import CarbonComponentsVue from 'carbon-components-vue/src/index';
Vue.use(CarbonComponentsVue);
```

### One at a time

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

## Development

Please refer to the [Contribution Guidelines](./.github/CONTRIBUTING.md) before starting any work.

### Contributing

Fork, create branch, submit PR. The PR will be used as part of a review process.

### Publishing this library on gh-pages

```bash
sh deploy-gh-pages.sh
```
