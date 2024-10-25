# @carbon/vue-3

<p>
  <a href="https://github.com/carbon-design-system/carbon/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon is released under the Apache-2.0 license" />
  </a>
  <a href="https://github.com/carbon-design-system/carbon/actions/workflows/ci.yml">
    <img src="https://github.com/carbon-design-system/carbon/actions/workflows/ci.yml/badge.svg" alt="CI workflow status" />
  </a>
  <a href="https://lerna.js.org/">
    <img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="Maintained with Lerna" />
  </a>
  <a href="https://github.com/carbon-design-system/carbon/blob/master/.github/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" />
  </a>
  <a href="https://discord.gg/J7JEUEkTRX">
      <img src="https://img.shields.io/discord/689212587170201628?color=5865F2" alt="Chat with us on Discord">
  </a>
</p>

> Vue implementation of the Carbon 11 Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

# CAUTION - this branch is incomplete and experimental

The goal is to wrap [carbon web components](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/carbon-web-components) in thin Vue
wrappers. The methodology for this is evolving so expect turbulence ahead.

## Carbon Vue library - A Carbon Community Project

The [library](http://vue.carbondesignsystem.com/) provides front-end developers & engineers a collection of reusable Vue components to build websites and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior in prototype and production work.

## Community Contributions Needed

As a community project contributions are not only welcome, but essential for the maintenance and growth of this project.

## Install

```shell
npm add @carbon/vue
```

or

```shell
$ yarn add @carbon/vue
```

### Add to Vue project

`src/main.js`

```js
import CarbonVue3 from '@carbon/vue';
import App from './App.vue';
const app = createApp(App);
app.use(CarbonVue3);
app.mount('#app');
```

See [Hello Carbon Vue](https://github.com/IBM/hello-carbon-vue3) for an example Vue project with Carbon.

### Add to Nuxt project

`plugins/carbon-vue.js`

```js
import CarbonVue from '@carbon/vue';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(CarbonVue);
});
```

See [Hello Carbon Nuxt](#add-to-nuxt-project) **coming soon**

### Vue 3

- Vue 2 support will end on Dec 31, 2023. Learn [more](https://vuejs.org/guide/introduction.html).
- Upgrading from Vue 2? Check out the [Migration Guide](https://v3-migration.vuejs.org/).
- Vue 2 components can be found on the `vue2` [branch](https://github.com/carbon-design-system/carbon-components-vue/tree/vue2)

Vue 3 components for Carbon 10 have reached parity with the Vue 2 components.
More work is needed especially around accessibility. If you want to improve Vue 3 components follow these guidelines.

1. Fork this repo and checkout the `main` branch
2. Look to see which components are currently being improved. You can do this by looking in the [issues list](https://github.com/carbon-design-system/carbon-components-vue/issues).
3. If you want to improve a component, look in the open issue list to see if someone else might already be working on it. Look for issues with a "V3 - Vue3" label and the name of the component. For example "**CvDatePicker - improving accessibility**".
4. If no one else is already working on it, create an issue using the "🍪 Vue 3 - improve component" and label it as above.
   - Work on the component and create a PR when you are ready.
   - Components are expected to be implemented as [single file components](https://vuejs.org/guide/scaling-up/sfc.html) using the Vue [composition api](https://vuejs.org/guide/extras/composition-api-faq.html). See `CvCheckbox` as an example. The Vue 2 components use the options API.
   - You should reference the DOM in the React components storybook and be sure to include any accessibility
     improvements that might be there.
   - You should update the story and test cases for the component if applicable. Sometimes the story might need updating
     almost always the test cases for the component will need updates.
   - If you have question tag @davidnixon in your issue and let me know how I can help.

### Changelog

[CHANGELOG.md](./CHANGELOG.md)

### List of available components

View available Vue Components [here](http://vue.carbondesignsystem.com). Usage information is available in the notes provided with each story.

## Building and publishing

The following steps will build and publish the packages:

- clone or download the repo;
- run `yarn` to install dependencies and bootstrap the packages;
- run `yarn build` to build all the packages including the storybook;

If you just want to build an individual package you can limit the scope:
`yarn build --scope @carbon/vue`
`yarn build --scope storybook`

To start the storybook in a local server use `yarn start`.

## How to run the storybook

Just follow the steps listed below and you will be able to run the storybook.

1. After the checkout to the `vNext` branch, in order to install the dependencies run the command `yarn install` on the root;
2. Now, run the command `cd storybook` to enter the storybook folder, then again run the command `yarn install` to install the dependencies inside the storybook folder;
3. Finally, run the command `yarn serve` inside the storybook folder.

In other words, these are the commands you're going to use in order of execution:

```
yarn install
cd storybook
yarn serve
```

or

```
yarn install
yarn serve:storybook
```

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics data. By installing
this package as a dependency you are agreeing to telemetry collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
