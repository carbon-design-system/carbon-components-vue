# @carbon/vue-3

<p align="center">
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
</p>

> Vue implementation of the Carbon Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

## Carbon Vue library - A Carbon Community Project

The [library](http://vue.carbondesignsystem.com/) provides front-end developers & engineers a collection of reusable Vue components to build websites and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior in prototype and production work.

## Community Contributions Needed

As a community project contributions are not only welcome, but essential for the maintenance and growth of this project.

### Vue 3 Guidance

We are actively working on components for Vue 3 and would love to get your help with this. If you want to contribute follow this guidance:

1. Fork this repo and checkout the `vNext` branch
2. Look to see which components have not yet been implemented. You can do this by comparing the components listed in the [Carbon React storybook](https://react.carbondesignsystem.com/?path=/story/getting-started-welcome--welcome) with the components in the `src/components` directory.
3. When you find a component that interests you, look in the open issue list to see if someone else might already be working on it. Look for issues with a "V3 - Vue3" label. A "dibs" issue will have that label and a title of "[component name] work in progress" so for example "**CvDatePicker work in progress**".
4. If no one else is already working on it, create an issue and label it as above.
   - Work on the component and create a PR when you are ready.
   - Components are expected to be implemented as [single file components](https://vuejs.org/guide/scaling-up/sfc.html) using the Vue [composition api](https://vuejs.org/guide/extras/composition-api-faq.html). See `CvCheckbox` as an example. The Vue 2 components use the options API.
   - You should reference the existing Vue 2 component while developing the code. The existing components often have the community enhancements that need to be maintained.
   - You should reference the DOM in the React components storybook and be sure to include any accessibility improvements that might be there.
   - You should provide a story and test case for the component. For example:
     ```
     src/components/CvCheckbox/CvCheckbox.stories.js
     src/components/CvCheckbox/CvCheckbox.vue
     src/components/CvCheckbox/__tests__/CvCheckbox.spec.js
     src/components/CvCheckbox/index.js
     ```
   - If you have question tag @davidnixon in your issue and let me know how I can help.

### Changelog

[CHANGELOG.md](./packages/core/CHANGELOG.md)

## Getting started

[Usage and getting started instructions](./packages/core/README.md#getting-started) for @carbon/vue.

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

:bulb: **In this case, it's best to run using `npm`!**

Just follow the steps listed below and you will be able to run the storybook.

1. After the checkout to the `vNext` branch, in order to install the dependencies run the command `npm i` on the root;
2. Now, run the command `cd storybook` to enter the storybook folder, then again run the command `npm i` to install the dependencies inside the storybook folder;
3. Finally, run the command `npm run serve` inside the storybook folder.

In other words, these are the commands you're going to use in order of execution:

```
npm i
cd storybook
npm i
npm run serve
```
