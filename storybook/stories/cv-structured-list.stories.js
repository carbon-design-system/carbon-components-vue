import { action } from '@storybook/addon-actions';
// import { /* deprecatedArgTypes, */ removeArgTypes } from '../utils/storybook-helper';

import {
  CvStructuredListItem,
  CvStructuredList,
  CvStructuredListData,
  CvStructuredListHeading,
} from '../../packages/core/src/';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvStructuredList',
  component: CvStructuredListItem,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    // ...deprecatedArgTypes(CvStructuredListItem),
    default: {
      description: 'Thd default slot of the AccordionItem hosts children as content.',
    },
    noWrap: {
      control: { type: 'boolean' },
    },
    condensed: {
      control: { type: 'boolean' },
    },
  },
};

const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvStructuredList, CvStructuredListItem, CvStructuredListData, CvStructuredListHeading },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-structured-list v-bind="{...$props, ...extractedProps}" >
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item checked>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item>
        <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>
</div>`,
});

export const _CvStructuredListItem = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvStructuredListItem.args = {};

_CvStructuredListItem.parameters = { controls: { exclude: ['v-model', 'change', 'value'] } };

/*------------------------------*/

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateSelectable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvStructuredList, CvStructuredListItem, CvStructuredListData, CvStructuredListHeading },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-structured-list :condensed="condensed" selectable @change="actionChange">
      <template slot="headings">
        <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
        <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
      </template>
      <template slot="items">
        <cv-structured-list-item name="group-1" value="value-1"  checked>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data>Item_1</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item name="group-1" value="value-2">
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data>Item_2</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
        <cv-structured-list-item name="group-1" value="value-3">
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data>Item_3</cv-structured-list-data>
          <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
        </cv-structured-list-item>
      </template>
    </cv-structured-list>
</div>`,
});

export const _CvStructuredListItemSelectable = TemplateSelectable.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvStructuredListItemSelectable.args = { actionChange };

_CvStructuredListItemSelectable.parameters = { controls: { exclude: ['v-model'] } };

/*------------------------------*/

const TemplateVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvStructuredList, CvStructuredListItem, CvStructuredListData, CvStructuredListHeading },
  data() {
    return { extractedProps, value: '' };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-structured-list :condensed="condensed" selectable>
    <template slot="headings">
      <cv-structured-list-heading>Heading 1</cv-structured-list-heading>
      <cv-structured-list-heading>Heading 2</cv-structured-list-heading>
      <cv-structured-list-heading>Heading 3</cv-structured-list-heading>
    </template>
    <template slot="items">
      <cv-structured-list-item name="group-1" value="value-1" v-model="value">
        <cv-structured-list-data>Item_1</cv-structured-list-data>
        <cv-structured-list-data>Item_1</cv-structured-list-data>
        <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
      <cv-structured-list-item name="group-1" value="value-2" v-model="value">
        <cv-structured-list-data>Item_2</cv-structured-list-data>
        <cv-structured-list-data>Item_2</cv-structured-list-data>
        <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
      <cv-structured-list-item name="group-1" value="value-3" v-model="value">
        <cv-structured-list-data>Item_3</cv-structured-list-data>
        <cv-structured-list-data>Item_3</cv-structured-list-data>
        <cv-structured-list-data :no-wrap="noWrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque vulputate nisl a porttitor interdum.</cv-structured-list-data>
      </cv-structured-list-item>
    </template>
  </cv-structured-list>
   <demo-container>
     <label>A standard HTML structured-list-item
       <input type="radio" group="test" value="value-1" v-model="value">Radio 1
       <input type="radio" group="test" value="value-2" v-model="value">Radio 2
       <input type="radio" group="test" value="value-3" v-model="value">Radio 3

     </label>
     <br><br>
     <span>Current value: {{ value }}</span>
   </demo-container>
  </div>`,
});

export const _CvStructuredListItemVModel = TemplateVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvStructuredListItemVModel.args = { actionChange };

_CvStructuredListItemVModel.parameters = { controls: { exclude: ['change'] } };

// // these props are explicitly used by the component under test
// const extractedPropsWithVModel = { actionChange: null, change: null, checked: null, mixed: null };

// // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
// const TemplateWithVModel = (args, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   components: { CvStructuredListItem, CvStructuredList, CvStructuredListData },
//   data() {
//     return { checked: false, extractedProps: extractedPropsWithVModel, radioVal: '' };
//   },
//   // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
//   template: `<div>
//   <cv-structured-list  :vertical="$props.vertical">
//     <cv-structured-list-item group="group-1"value="radio-1" label="Radio 1" v-model="radioVal"  />
//     <cv-structured-list-item group="group-1"value="radio-2" label="Radio 2" @change="actionChange" v-model="radioVal"/>
//     <cv-structured-list-item group="group-1"value="radio-3" label="Radio 3" @change="actionChange"v-model="radioVal"/>
//   </cv-structured-list>
//   <demo-container>
//     <label>A standard HTML structured-list-item
//       <input type="radio" group="test" value="radio-1" v-model="radioVal">Radio 1
//       <input type="radio" group="test" value="radio-2" v-model="radioVal">Radio 2
//       <input type="radio" group="test" value="radio-3" v-model="radioVal">Radio 3

//     </label>
//     <br><br>
//     <span>Current value: {{ radioVal }}</span>
//   </demo-container>
// </div>`,
// });

// export const CvStructuredListItemWithVModel = TemplateWithVModel.bind({});
// // More on args: https://storybook.js.org/docs/vue/writing-stories/args
// CvStructuredListItemWithVModel.args = {};
// CvStructuredListItemWithVModel.parameters = { controls: { include: ['vertical'] } };
