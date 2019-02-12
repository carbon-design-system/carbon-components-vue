import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvToolbarNotesMD from './cv-toolbar-notes.md';
import CvToolbar from './cv-toolbar';
import CvOverflowMenu from '../cv-overflow-menu/cv-overflow-menu';
import CvOverflowMenuItem from '../cv-overflow-menu/cv-overflow-menu-item';
import CvRadioButton from '../cv-radio-button/cv-radio-button';
import CvCheckbox from '../cv-checkbox/cv-checkbox';
import CvToolbarDivider from './cv-toolbar-divider';
import CvToolbarOption from './cv-toolbar-option';
import CvToolbarTitle from './cv-toolbar-title';

const stories = storiesOf('CvToolbar', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();
      // ----------------------------------------------------------------

      const templateString = `
<cv-toolbar>
  <cv-toolbar-search v-model="searchInput"/>

  <cv-overflow-menu>
    <template slot="trigger">
      <svg class="bx--overflow-menu__icon bx--toolbar-filter-icon" width="16" height="12" viewBox="0 0 16 12">
        <g fill-rule="nonzero">
          <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
        </g>
      </svg>
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

  <cv-overflow-menu>
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
          CvCheckbox,
          CvOverflowMenu,
          CvOverflowMenuItem,
          CvRadioButton,
          CvToolbarDivider,
          CvToolbarOption,
          CvToolbarTitle,
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
