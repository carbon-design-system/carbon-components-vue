import { action } from '@storybook/addon-actions';

import { CvGrid, CvRow, CvColumn } from '../../packages/core/src/';

import './_cv-grid-storybook.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvGrid',
  component: CvGrid,
  decorators: [
    () => ({
      template: `<div class="cv-grid-story"><story /></div>`,
    }),
  ],
  argTypes: {
    default: {
      description: 'This component hosts children as content in the default slot, as do the row and column components.',
    },
  },
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

const actionSubmit = action('submit');

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvGrid,
    CvRow,
    CvColumn,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-grid v-bind="$props">
    <cv-row>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
    <cv-row>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
    <cv-row>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
</cv-grid>`,
});

export const _CvGrid = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvGrid.args = {};

const TemplateRows = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvGrid,
    CvRow,
    CvColumn,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-grid>
    <cv-row kind="wide">
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4 wide row</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
    <cv-row kind="narrow">
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4 narrow row</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
    <cv-row kind="condensed">
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4 condensed row</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
      <cv-column :sm="1"><div class="cv-grid-story__preview-col">1/4</div></cv-column>
    </cv-row>
</cv-grid>`,
});

export const _CvGridRows = TemplateRows.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvGridRows.args = {};
_CvGridRows.parameters = { controls: { include: ['default'] } };

const TemplateOffset = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvGrid,
    CvRow,
    CvColumn,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-grid>
  <cv-row>
    <cv-column :sm="{ span: 1, offset: 3 }"><div class="cv-grid-story__preview-col">small: offset 3</div></cv-column>
    <cv-column :sm="{ span: 2, offset: 2 }"><div class="cv-grid-story__preview-col">small: offset 2</div></cv-column>
    <cv-column :sm="{ span: 3, offset: 1 }"><div class="cv-grid-story__preview-col">small: offset 1</div></cv-column>
    <cv-column :sm="{ span: 4, offset: 0 }"><div class="cv-grid-story__preview-col">small: offset 0</div></cv-column>
  </cv-row>
</cv-grid>`,
});

export const _CvGridOffset = TemplateOffset.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvGridOffset.args = {};
_CvGridOffset.parameters = { controls: { include: ['default'] } };

const TemplateResponsive = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvGrid,
    CvRow,
    CvColumn,
  },
  data() {
    return { actionSubmit };
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-grid>
  <cv-row>
    <cv-column :sm="2" :md="4" :lg="6"><div class="cv-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 4 of 8</p>
      <p>large: span 6 of 12</p>
    </div></cv-column>
    <cv-column :sm="2" :md="2" :lg="3"><div class="cv-grid-story__preview-col">
      <p>small: span 2 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></cv-column>
    <cv-column :sm="0" :md="2" :lg="3"><div class="cv-grid-story__preview-col">
      <p>small: span 0 of 4</p>
      <p>medium: span 2 of 8</p>
      <p>large: span 3 of 12</p>
    </div></cv-column>
  </cv-row>
</cv-grid>`,
});

export const _CvGridResponsive = TemplateResponsive.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvGridResponsive.args = {};
_CvGridResponsive.parameters = { controls: { include: ['default'] } };
