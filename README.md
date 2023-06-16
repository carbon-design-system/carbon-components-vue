# carbon-components-vue

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
  <a href="https://discord.gg/J7JEUEkTRX">
      <img src="https://img.shields.io/discord/689212587170201628?color=5865F2" alt="Chat with us on Discord">
  </a>
</p>

> Vue implementation of the Carbon Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

## Carbon Vue library - A Carbon Community Project

The [library](http://vue.carbondesignsystem.com/) provides front-end developers & engineers a collection of reusable Vue components to build websites and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior in prototype and production work.

## Community Contributions Needed

As a community project contributions are not only welcome, but essential for the maintenance and growth of this project.

### Changelog

[CHANGELOG.md](./packages/core/CHANGELOG.md)

## Getting started

[Usage and getting started instructions](./packages/core/README.md#getting-started) for @carbon/vue.

## Packages

### [@carbon/vue](./packages/core)

A library of the Carbon core components

<img src="./docs/AtCarbonVue2.png" alt="@carbon/vue"></div>

### List of available components

View available Vue Components [here](http://vue.carbondesignsystem.com). Usage information is available in the notes provided with each story.

## Building and publishing

This is a monorepo using `lerna`.
The following steps will build and publish the packages:

- clone or download the repo;
- run `yarn` to install dependencies and bootstrap the packages;
- run `yarn build` to build all the packages including the storybook;

If you just want to build an individual package you can limit the scope:
`yarn build --scope @carbon/vue`
`yarn build --scope storybook`

To start the storybook in a local server use `yarn start`.
