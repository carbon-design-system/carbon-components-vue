import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvListNotesMD from '../../packages/core/src/components/cv-list/cv-list-notes.md';
import { CvList, CvListItem } from '../../packages/core/src/';

const storiesDefault = storiesOf('Components/CvList', module);
// const storiesExperimental = storiesOf('Experimental/CvList', module);

const preKnobs = {
  ordered: {
    group: 'attr',
    type: boolean,
    config: ['ordered', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'ordered',
  },
  nested: {
    group: 'nested',
    value: `  <cv-list nested :ordered="orderedInNest">
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>
    <cv-list nested>
      <cv-list-item>nested item 1</cv-list-item>
      <cv-list-item>nested item 2</cv-list-item>
      <cv-list-item>nested item 3</cv-list-item>
    </cv-list>`,
  },
  orderedInNest: {
    group: '',
    type: boolean,
    config: ['ordered-nest', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'ordered-nest',
  },
};

const variants = [{ name: 'default', excludes: ['nested', 'orderedInNest'] }, { name: 'nested' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-list${settings.group.attr}>
  <cv-list-item>list item 1${settings.group.nested}
  </cv-list-item>
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
        components: { CvList, CvListItem, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvListNotesMD },
    }
  );
}
