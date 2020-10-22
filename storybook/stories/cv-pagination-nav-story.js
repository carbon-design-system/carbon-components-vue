import { storiesOf } from '@storybook/vue';
import { number, boolean } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvPaginationNavNotesMD from '../../packages/core/src/components/cv-pagination-nav/cv-pagination-nav-notes.md';
import { CvPaginationNav } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvPaginationNav', module);

const preKnobs = {
  totalItems: {
    group: 'attr',
    type: number,
    config: ['Total number of items', 10],
    prop: 'total-items',
  },
  page: {
    group: 'attr',
    type: number,
    config: ['initial page', 2],
    prop: 'page',
  },
  itemsShown: {
    group: 'attr',
    type: number,
    config: ['Number of items to be shown', 100],
    prop: 'items-shown',
  },
  allowLoop: {
    group: 'attr',
    type: boolean,
    config: ['Allow user to loop through the items', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'allow-loop',
  },
  disableBackwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable backwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'backwards-button-disabled',
  },
  disabledForwards: {
    group: 'attr',
    type: boolean,
    config: ['Disable forwards button', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'forwards-button-disabled',
  },
  events: {
    group: 'attr',
    value: `@change="onChange"`,
  },
};

const variants = [{ name: 'default', excludes: ['events'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      const templateString = `
<cv-pagination-nav ${settings.group.attr}></cv-pagination-nav>
  `;

      // ----------------------------------------------------------------
      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvPaginationNav, SvTemplateView },

        template: templateViewString,
        props: settings.props,
        methods: {
          onChange: action('cv-pagination-nav - change event'),
        },
      };
    },
    {
      notes: { markdown: CvPaginationNavNotesMD },
    }
  );
}
