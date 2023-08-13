import {
  sbCompPrefix,
  storyParametersObject,
} from '../../global/storybook-utils';
import { CvStructuredList } from '.';

export default {
  title: `${sbCompPrefix}/CvStructuredList`,
  component: CvStructuredList,
  argTypes: {},
};

const template = `<cv-structured-list v-bind="args">
<template slot="headings">
  <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
  <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
  <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
</template>
<template slot="items">
  <cv-structured-list-item>
    <cv-structured-list-data>Item_1</cv-structured-list-data>
    <cv-structured-list-data>Item_1</cv-structured-list-data>
    <cv-structured-list-data
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
      bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
      porttitor interdum.</cv-structured-list-data
    >
  </cv-structured-list-item>
  <cv-structured-list-item>
    <cv-structured-list-data>Item_2</cv-structured-list-data>
    <cv-structured-list-data>Item_2</cv-structured-list-data>
    <cv-structured-list-data
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
      bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
      porttitor interdum.</cv-structured-list-data
    >
  </cv-structured-list-item>
  <cv-structured-list-item>
    <cv-structured-list-data>Item_3</cv-structured-list-data>
    <cv-structured-list-data>Item_3</cv-structured-list-data>
    <cv-structured-list-data
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet
      bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a
      porttitor interdum.</cv-structured-list-data
    >
  </cv-structured-list-item>
</template>
</cv-structured-list>`;

const Template = args => {
  return {
    components: { CvStructuredList },
    setup: () => ({ args }),
    template,
  };
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
