import { storiesOf } from '@storybook/vue';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvToolbarNotesMD from '@carbon/vue/src/components/cv-toolbar/cv-toolbar-notes.md';
import CvToolbar from '@carbon/vue/src/components/cv-toolbar/cv-toolbar';
import CvOverflowMenu from '@carbon/vue/src/components/cv-overflow-menu/cv-overflow-menu';
import CvOverflowMenuItem from '@carbon/vue/src/components/cv-overflow-menu/cv-overflow-menu-item';
import CvRadioButton from '@carbon/vue/src/components/cv-radio-button/cv-radio-button';
import CvCheckbox from '@carbon/vue/src/components/cv-checkbox/cv-checkbox';
import CvToolbarDivider from '@carbon/vue/src/components/cv-toolbar/cv-toolbar-divider';
import CvToolbarOption from '@carbon/vue/src/components/cv-toolbar/cv-toolbar-option';
import CvToolbarSearch from '@carbon/vue/src/components/cv-toolbar/cv-toolbar-search';
import CvToolbarTitle from '@carbon/vue/src/components/cv-toolbar/cv-toolbar-title';
import CvButton from '@carbon/vue/src/components/cv-button/cv-button';

const storiesDefault = storiesOf('Components/CvToolbar', module);
const storiesExperimental = storiesOf('Experimental/CvToolbar', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';
import Filter16 from '@carbon/icons-vue/es/filter/16';

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const version of versions(true)) {
  const stories = version.experimental && !version.default ? storiesDefault : storiesExperimental;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
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
      :sv-experimental="experimental"
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
              experimental: version.experimental,
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
}
