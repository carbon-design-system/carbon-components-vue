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

Initial development ongoing.

### Current Components

View available Vue.js components [here](http://vue.carbondesignsystem.com). Usage information is available when you click the blue ? icon in the top right corner of the selected component.

| **Components**           | **State**                                | **Link**                                                                          |
| ------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------- |
| **CvAccordion**          | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvAccordion                      |
| CvBarGraph               |                                          |                                                                                   |
| **CvBreadcrumb**         | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvBreadcrumb                     |
| **CvButton**             | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvButton                         |
| **CvCheckbox**           | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvCheckbox                       |
| CvCodeSnippet            | Ready                                    | http://vue.carbondesignsystem.com//?selectedKind=CvCodeSnippet&selectedStory=All  |
| **CvContentSwitcher**    | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvContentSwitcher                |
| CvDataTable              |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/51           |
|                          |
| CvDatePicker             | Ready, uses core js                      | http://vue.carbondesignsystem.com/?selectedKind=CvDatePicker&selectedStory=All    |
| CvDropdown               |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/47           |
|                          |
| CvFileUploader           | Ready                                    | http://vue.carbondesignsystem.com//?selectedKind=CvFileUploader&selectedStory=All |
| **CvForm**               | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvForm                           |
| CvGauge                  |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/49           |
|                          |
| **CvIcon**               | Ready, non-core requries on carbon-icons | http://vue.carbondesignsystem.com//?selectedKind=CvIcon                           |
| **CvInlineNotification** | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvInlineNotification             |
| CvLineGraph              |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/53           |
|                          |
| **CvLink**               | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvLink                           |
| **CvList**               | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvList                           |
| **CvLoading**            | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvLoading                        |
| **CvModal**              | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvModal                          |
| **CvNumberInput**        | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvNumberInput                    |
| **CvOverflowMenu**       | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvOverflowMenu                   |
| CvPagination             | Ready                                    | http://vue.carbondesignsystem.com//?selectedKind=CvPagination&selectedStory=All   |
| CvPieChart               |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/52           |
|                          |
| **CvProgress**           | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvProgress                       |
| **CvRadioButton**        | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvRadioButton                    |
| CvScatterPlot            |                                          | https://github.com/carbon-design-system/carbon-components-vue/issues/50           |
|                          |
| **CvSearch**             | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvSearch                         |
| **CvSelect**             | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvSelect                         |
| **CvSlider**             | Ready                                    | http://vue.carbondesignsystem.com//?selectedKind=CvSlider                         |
| **CvStructuredList**     | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvStructuredList                 |
| **CvTabs**               | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTabs                           |
| **CvTag**                | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTag                            |
| **CvTextArea**           | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTextArea                       |
| **CvTextInput**          | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTextInput                      |
| **CvTile**               | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTile                           |
| **CvToastNotification**  | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvToastNotification              |
| **CvToggle**             | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvToggle                         |
| **CvTooltip**            | Ready, uses core js                      | http://vue.carbondesignsystem.com//?selectedKind=CvTooltip                        |

## Usage

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
