import {
  CvToolbar,
  CvToolbarOption,
  CvToolbarDivider,
  CvToolbarSearch,
  CvToolbarTitle,
  CvRadioButton,
  CvCheckbox,
  CvOverflowMenu,
  CvOverflowMenuItem,
  CvButton,
} from '../../packages/core/src';
import { Filter16 } from '@carbon/icons-vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'components/CvToolbar (deprecated)',
  component: CvToolbar,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
};

// these props are explicitly used by the component under test
// const extractedProps = { actionChange: null, change: null };

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    CvToolbar,
    CvToolbarOption,
    CvToolbarDivider,
    CvToolbarSearch,
    CvToolbarTitle,
    Filter16,
    CvRadioButton,
    CvCheckbox,
    CvOverflowMenu,
    CvOverflowMenuItem,
    CvButton,
  },
  // NOTE: cannot call utility function inside or change template in any other way at Storybook 6.4
  template: `<cv-toolbar>
  <cv-toolbar-search v-model="searchInput"/>

  <cv-overflow-menu class="bx--toolbar-action">
    <template slot="trigger">
      <Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
    </template>
    <cv-toolbar-title title="Filter by" />
    <cv-toolbar-option>
      <cv-checkbox value="filter-1" label="Filter option 1" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-checkbox value="filter-2" label="Filter option 2" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-checkbox value="filter-3" label="Filter option 3" />
    </cv-toolbar-option>
  </cv-overflow-menu>

  <cv-overflow-menu class="bx--toolbar-action">
    <cv-overflow-menu-item primary-focus>Refresh table</cv-overflow-menu-item>
    <cv-toolbar-divider></cv-toolbar-divider>
    <cv-toolbar-title title="ROW HEIGHT" />
    <cv-toolbar-option>
      <cv-radio-button name="row-height" label="Short" value="short" />
    </cv-toolbar-option>
    <cv-toolbar-option>
      <cv-radio-button name="row-height" label="Tall" value="tall" />
    </cv-toolbar-option>
  </cv-overflow-menu>

  <cv-button small>Test</cv-button>
</cv-toolbar>`,
});

export const _CvToolbar = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
_CvToolbar.args = {};
