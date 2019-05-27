import { storiesOf } from '@storybook/vue';
import { text, object, number } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvPaginationNotesMD from '@carbon/vue/src/components/cv-pagination/cv-pagination-notes.md';
import CvPagination from '@carbon/vue/src/components/cv-pagination/cv-pagination';

const storiesDefault = storiesOf('Components/CvPagination', module);
const storiesExperimental = storiesOf('Experimental/CvPagination', module);
import { versions, setVersion } from '@carbon/vue/src/internal/feature-flags';

const preKnobs = {
  backwardsText: {
    group: 'attr',
    type: text,
    config: ['backwards button text', 'Previous page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'backward-text', type: String },
  },
  forwardsText: {
    group: 'attr',
    type: text,
    config: ['forwards button text', 'Next page'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'forward-text', type: String },
  },
  pageNumberLabel: {
    group: 'attr',
    type: text,
    config: ['page number label', 'Page number'], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { name: 'page-number-label', type: String },
  },
  pageSizesLabel: {
    group: 'attr',
    type: text,
    config: ['page sizes label', 'Items per page:'], // consts.CONTENT], // fails when used with number in storybook 4.1.4
    prop: { name: 'page-sizes-label', type: String },
  },
  numberOfItems: {
    group: 'attr',
    type: number,
    config: ['Number of items', 103],
    prop: { name: 'number-of-items', type: Number },
  },
  page: {
    group: 'attr',
    type: number,
    config: ['initial page', 2],
    prop: { name: 'page', type: Number },
  },
  pageSizes: {
    group: 'attr',
    type: object,
    config: ['Page sizes', { list: [10, { value: 20, selected: true }, 30, 40, 50] }],
    prop: { name: 'page-sizes', type: Array, value: val => val.list },
  },
  events: {
    group: 'attr',
    value: `@change="onChange"`,
  },
};

const variants = [
  { name: 'default', excludes: ['events'] },
  { name: 'minimal', includes: [] },
  { name: 'events', includes: ['events'] },
];

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
<cv-pagination${settings.group.attr}></cv-pagination>
  `;

        // ----------------------------------------------------------------

        const templateViewString = `
    <sv-template-view
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvPagination, SvTemplateView },

          template: templateViewString,
          props: settings.props,
          methods: {
            onChange: action('cv-paginationr - change event'),
          },
        };
      },
      {
        notes: { markdown: CvPaginationNotesMD },
      }
    );
  }
}
