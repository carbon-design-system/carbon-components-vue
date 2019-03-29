# carbon-components-vue

[![Carbon Components Vue is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbon-components-vue.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbon-components-vue)

> Vue implementation of the Carbon Design System
> A collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using <img src="https://vuejs.org/images/logo.png" width="20" alt="Vue logo"> [Vue.js](https://vuejs.org/).

## Packages

### [@carbon/vue](./packages/core)

A library of the Carbon core components

<div style="text-align: center">
  <img src="./docs/AtCarbonVue.png" alt="@carbon/vue" height="200px">
</div>

## Gettting started

Usage and getting started instructinos for @carbon/vue can be found [here](./packages/core/README.md)

## Carbon Vue library

The [library](http://vue.carbondesignsystem.com/) provides front-end developers & engineers a collection of reusable Vue components to build websites and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior in prototype and production work.

## Install

Assuming we're starting with a new Vue CLI project:

```sh
$ vue create my-project
Vue CLI v3.5.2
? Please pick a preset: default (babel, eslint)
$ cd my-project
```

Using Yarn

```sh
$ yarn add @carbon/vue
```

Or npm

```sh
$ npm install @carbon/vue
```

In src/main.js add the following to include the carbon styles and components.

```js
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';
Vue.use(CarbonComponentsVue);
```

Replace the contents of src/components/HelloWorld.vue with the following

```html
<template>
  <div class="sample">
    <h1>Example use of @carbon/vue</h1>
    <cv-text-input label="Who are you?" v-model="yourName" placeholder="your name" />
    <cv-button @click="onClick">Hello {{yourName}}</cv-button>
    <cv-modal :visible="visible" @modal-hidden="modalClosed">
      <template slot="title"
        >Welcome to @carbon/vue {{yourName}}</template
      >
      <template slot="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, seed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </template>
    </cv-modal>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        yourName: '',
        visible: false,
      };
    },
    methods: {
      onClick() {
        this.visible = true;
      },
      modalClosed() {
        this.visible = false;
      },
    },
  };
</script>

<style>
  .sample {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: 5% auto;
  }

  .cv-text-input {
    margin: 30px 0;
  }
</style>
```

That's it! Now start the server and start building.

Using Yarn

```sh
$ yarn serve
```

Or npm

```sh
$ npm serve
```

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
