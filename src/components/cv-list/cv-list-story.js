import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';

import CvListNotesMD from './cv-list-notes.md';
import CvList from './cv-list';

const stories = storiesOf('CvList', module);
stories.addDecorator(withKnobs);

const knobs = () => ({
  ordered: boolean('ordered', false, consts.CONFIG) ? `\n ordered` : '',
  nested: boolean('nested', false, consts.CONFIG),
  otherAttributes: text('other attributes', '', consts.OTHER),
});

stories.add(
  'All',
  withNotes(CvListNotesMD)(() => {
    const settings = knobs();

    settings.nested = !settings.nested
      ? ''
      : `
    <cv-list${settings.ordered} nested>
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
    `;
    settings.otherAttributes = settings.otherAttributes
      ? `\n  ${settings.otherAttributes}`
      : '';

    // ----------------------------------------------------------------

    const templateString = `
<cv-list${settings.ordered}${settings.otherAttributes}>
  <cv-list-item>list item 1${settings.nested}</cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
  `;

    // ----------------------------------------------------------------

    const templateViewString = `
    <sv-template-view
      :sv-margin="true"
      sv-source='${templateString.trim()}'>
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

    return {
      components: { CvList, SvTemplateView },
      template: templateViewString,
    };
  })
);
