# carbon-components-vue

[![Carbon Components Vue is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbon-components-vue.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbon-components-vue)

> Vue implementation of the Carbon Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

<div style="text-align: center">
  <img src="./docs/AtCarbonVue.png" alt="@carbon/vue" height="200px">
</div>

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
npm install @carbon/vue
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/vue
```

NOTE: (https://www.npmjs.com/package/current-script-polyfill) is required for older browsers (e.g. IE11)

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

## Change log

See [CHANGELOG.md](CHANGELOG.md)

### Current Components

View available Vue.js components [here](http://vue.carbondesignsystem.com). Usage information is available when you click the blue ? icon in the top right corner of the selected component.

See [component status pages](https://www.carbondesignsystem.com/component-status) for the status of each component.

## Development

Please refer to the [Contribution Guidelines](./.github/CONTRIBUTING.md) before starting any work.

### Contributing

Fork, create branch, submit PR. The PR will be used as part of a review process.

### Publishing this library on gh-pages

```bash
sh deploy-gh-pages.sh
```
