import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number, array } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvPaginationNotesMD from './cv-pagination-notes.md';
import CvPagination from './cv-pagination';

const stories = storiesOf('CvPagination', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  backwardsText: text('backwards button text', 'Previous page', consts.CONFIG),
  forwardsText: text('forwards button text', 'Next page', consts.CONFIG),
  pageNumberLabel: text('page number label', 'Page number', consts.CONFIG),
  pageSizesLabel: text(
    'page sizes label',
    'Number of items per page:',
    consts.CONTENT
  ),
  numberOfItems: text('Number of items', '103', consts.CONFIG),
  pageSizes: text(
    'Page sizes',
    '[10, { value: 20, selected: true }, 30, 40, 50]',
    consts.CONFIG
  ),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvPaginationNotesMD)(() => {
    const settings = knobs();

    settings.backwardsText = settings.backwardsText.length
      ? `\n  backwards-text="${settings.backwardsText}"`
      : '';

    settings.forwardsText = settings.forwardsText.length
      ? `\n  forwards-text="${settings.forwardsText}"`
      : '';

    settings.pageNumberLabel = settings.pageNumberLabel.length
      ? `\n  page-number-label="${settings.pageNumberLabel}"`
      : '';

    settings.pageSizesLabel = settings.pageSizesLabel.length
      ? `\n  page-sizes-label="${settings.pageSizesLabel}"`
      : '';

    settings.numberOfItems = settings.numberOfItems.length
      ? `\n  :number-of-items="${parseInt(settings.numberOfItems, 10)}"`
      : '';

    settings.pageSizes = settings.pageSizes.length
      ? `\n  :page-sizes="${settings.pageSizes}"`
      : '';

    settings.otherAttributes = settings.otherAttributes.length
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-pagination ${settings.backwardsText}${settings.forwardsText}${
      settings.pageNumberLabel
    }${settings.pageSizesLabel}${settings.numberOfItems}${settings.pageSizes} ${
      settings.otherAttributes
    } @change="onChange"></cv-pagination>
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
