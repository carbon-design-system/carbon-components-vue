import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvToolbarNotesMD from '../../packages/core/src/components/cv-toolbar/cv-toolbar-notes.md';
import {
  CvToolbar,
  CvOverflowMenu,
  CvOverflowMenuItem,
  CvRadioButton,
  CvCheckbox,
  CvToolbarDivider,
  CvToolbarOption,
  CvToolbarSearch,
  CvToolbarTitle,
  CvButton,
} from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvToolbar [Depercated]', module);
// const storiesExperimental = storiesOf('Experimental/CvToolbar', module);

import Filter16 from '@carbon/icons-vue/es/filter/16';

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
<cv-toolbar>
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
</cv-toolbar>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
      <template slot="other">Search value: {{searchInput}}</template>
    </sv-template-view>
  `;

      return {
        components: {
          CvToolbar,
          SvTemplateView,
          CvButton,
          CvCheckbox,
          CvOverflowMenu,
          CvOverflowMenuItem,
          CvRadioButton,
          CvToolbarDivider,
          CvToolbarOption,
          CvToolbarTitle,
          CvToolbarSearch,
          Filter16,
        },
        template: templateViewString,
        props: settings.props,
        data() {
          return {
            searchInput: '',
          };
        },
      };
    },
    {
      notes: { markdown: CvToolbarNotesMD },
    }
  );
}
