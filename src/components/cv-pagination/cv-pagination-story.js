import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvPaginationNotesMD from './cv-pagination-notes.md';
import CvPagination from './cv-pagination';

const stories = storiesOf('CvPagination', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  backwardsText: {
    group: 'attr',
    type: text,
    config: ['backwards button text', 'Previous page', consts.CONFIG],
    value: val => (val.length ? `\n  backwards-text="${val}"` : ''),
  },
  forwardsText: {
    group: 'attr',
    type: text,
    config: ['forwards button text', 'Next page', consts.CONFIG],
    value: val => (val.length ? `\n  forwards-text="${val}"` : ''),
  },
  pageNumberLabel: {
    group: 'attr',
    type: text,
    config: ['page number label', 'Page number', consts.CONFIG],
    value: val => (val.length ? `\n  page-number-label="${val}"` : ''),
  },
  pageSizesLabel: {
    group: 'attr',
    type: text,
    config: ['page sizes label', 'Number of items per page:', consts.CONTENT],
    value: val => (val.length ? `\n  page-sizes-label="${val}"` : ''),
    //   data: (obj, key, val) => (obj[key] = val),
  },
  numberOfItems: {
    group: 'attr',
    type: text,
    config: ['Number of items', '103', consts.CONFIG],
    value: val =>
      val.length ? `\n  :number-of-items="${parseInt(val, 10)}"` : '',
  },
  pageSizes: {
    group: 'attr',
    type: text,
    config: [
      'Page sizes',
      '[10, { value: 20, selected: true }, 30, 40, 50]',
      consts.CONFIG,
    ],
    value: val => (val.length ? `\n  :page-sizes="${val}"` : ''),
  },
  withEvents: {
    group: 'attr',
    type: boolean,
    config: ['with events', false, consts.OTHER],
    value: val =>
      val
        ? `
  @change="onChange"`
        : '',
  },
  otherAttributes: {
    group: 'attr',
    type: text,
    config: ['other attributes', '', consts.OTHER],
    value: val => (val.length ? `\n  ${val}` : ''),
  },
};

const storySet = knobsHelper.getStorySet(kinds, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    withNotes(CvPaginationNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-pagination${settings.group.attr}></cv-pagination>
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
        components: { CvPagination, SvTemplateView },
        template: templateViewString,
        methods: {
          onChange: action('cv-paginationr - change event'),
        },
      };
    })
  );
}
