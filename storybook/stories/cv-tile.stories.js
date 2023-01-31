import { action } from '@storybook/addon-actions';
import { CvTile } from '../../packages/core/src/';
import { deprecatedArgTypes, removeArgTypes } from '../utils/storybook-helper';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvTile',
  component: CvTile,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    default: {
      description: 'Thd default slot of the AccordionItem hosts children as content.',
    },
    ...deprecatedArgTypes(CvTile),
    ...removeArgTypes(['actionClick', 'actionChange']),
  },
};

// these props are explicitly used by the component under test
const extractedProps = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { extractedProps };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tile v-bind="{...$props, ...extractedProps}">
  <h1>Hello</h1><p>This is some tile content.</p>
</cv-tile>`,
});

export const _CvTileStandard = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileStandard.args = {};
_CvTileStandard.parameters = { controls: { include: ['light', 'default'] } };

/* -------------------------------------------------- */
const actionClick = action('click');

// these props are explicitly used by the component under test
const extractedPropsClickable = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateClickable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { extractedProps: extractedPropsClickable };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tile v-bind="{...$props, ...extractedProps}" kind="clickable" @click="actionClick" href="javascript:void(0)">
  <h1>Hello</h1><p>This is some tile content.</p>
</cv-tile>`,
});

export const _CvTileClickable = TemplateClickable.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileClickable.args = {
  actionClick,
};
_CvTileClickable.parameters = { controls: { include: ['light', 'default', 'actionClick'] } };

/* -------------------------------------------------- */

// these props are explicitly used by the component under test
const extractedPropsExpandable = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateExpandable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { extractedProps: extractedPropsExpandable };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tile v-bind="{...$props, ...extractedProps}" kind="expandable">
  <h1>Hello</h1><p>This is some tile content.</p>
  <template slot="below"><h2>More</h2>
    <ul>
      <li>This</li>
      <li>is some</li>
      <li>more</li>
      <li>content</li>
    </ul>
  </template>
</cv-tile>`,
});

export const _CvTileExpandable = TemplateExpandable.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileExpandable.args = {
  actionClick,
};
_CvTileExpandable.parameters = {
  controls: { include: ['light', 'default', 'expanded', 'tileCollapsedLabel', 'tileExpandedLabel'] },
};

/* -------------------------------------------------- */
const actionChange = action('change');

// these props are explicitly used by the component under test
const extractedPropsSelectable = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateSelectable = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { extractedProps: extractedPropsSelectable };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-tile v-bind="{...$props, ...extractedProps}" kind="selectable" @change="actionChange">
  <h1>Hello</h1><p>This is some tile content.</p>
</cv-tile>`,
});

export const _CvTileSelectable = TemplateSelectable.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileSelectable.args = {
  actionChange,
  value: 'tile-1',
};
_CvTileSelectable.parameters = {
  controls: { include: ['light', 'default', 'selected', 'value', 'change', 'actionChange'] },
};

/* -------------------------------------------------- */
// these props are explicitly used by the component under test
const extractedPropsSelectableVModel = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateSelectableVModel = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { checked: false, extractedProps: extractedPropsSelectableVModel };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-tile v-bind="{...$props, ...extractedProps}" kind="selectable" v-model="checked">
    <h1>Hello</h1><p>This is some tile content.</p>
  </cv-tile>
  <demo-container>
    <label>A standard HTML checkbox
      <input type="checkbox" v-model="checked" />
    </label>
    <br><br>
    <span>Current value: {{ checked }}</span>
  </demo-container>
</div>`,
});

export const _CvTileSelectableVModel = TemplateSelectableVModel.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileSelectableVModel.args = {
  actionChange,
  value: 'tile-1',
};
_CvTileSelectableVModel.parameters = {
  controls: { include: ['light', 'default', 'value'] },
};

/* -------------------------------------------------- */
// these props are explicitly used by the component under test
const extractedPropsSelectableVModelArray = { actionChange: null, change: null, actionClick: null, click: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const TemplateSelectableVModelArray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CvTile },
  data() {
    return { tiles: ['tile-1', 'tile-2', 'tile-3'], checks: [], extractedProps: extractedPropsSelectableVModelArray };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<div>
  <cv-tile v-for="item in tiles" v-bind="{...$props, ...extractedProps}" kind="selectable" v-model="checks" :value="item">
    <h1>Hello</h1><p>This is {{item}} content.</p>
  </cv-tile>
  <demo-container>
    <label v-for="item in tiles" v-bind="{...$props, ...extractedProps}">
      <input type="checkbox" v-model="checks" :value="item" />
      {{item}}
      <br>
    </label>
    <br><br>
    <span>Current value of array: {{ checks }}</span>
  </demo-container>
</div>`,
});

export const _CvTileSelectableVModelArray = TemplateSelectableVModelArray.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvTileSelectableVModelArray.args = {
  actionChange,
  value: 'tile-1',
};
_CvTileSelectableVModelArray.parameters = {
  controls: { include: ['light', 'default'] },
};
