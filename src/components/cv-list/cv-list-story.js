import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, selectV2 } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvListNotesMD from './cv-list-notes.md';
import CvList from './cv-list';

const stories = storiesOf('CvList', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  ordered: {
    group: 'attr',
    type: boolean,
    config: ['ordered', false, consts.CONFIG],
    value: val => (val ? `\n ordered` : ''),
  },
  nested: {
    group: 'nested',
    type: boolean,
    config: ['nested', false, consts.CONFIG],
    value: val =>
      val
        ? `
    <cv-list nested>
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
    `
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
    withNotes(CvListNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-list${settings.group.attr}>
  <cv-list-item>list item 1${settings.group.nested}</cv-list-item>
  <cv-list-item>list item 2</cv-list-item>
  <cv-list-item>list item 3</cv-list-item>
</cv-list>
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
        components: { CvList, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
