import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../views/sv-template-view/sv-template-view';
import consts from '../../utils/storybook-consts';
import knobsHelper from '../../utils/storybook-knobs-helper';

import CvOverflowMenuNotesMD from './cv-overflow-menu-notes.md';
import CvOverflowMenu from './cv-overflow-menu';

const stories = storiesOf('CvOverflowMenu', module);
stories.addDecorator(withKnobs);

const kinds = null;
const preKnobs = {
  flipMenu: {
    group: 'attr',
    type: boolean,
    config: ['flip menu', false, consts.CONFIG],
    value: val => (val ? '\n  flip-menu' : ''),
  },
  offset: {
    group: 'attr',
    type: boolean,
    config: ['offset example', false, consts.CONFIG],
    value: val => (val ? '\n :offset="{ left: 0), top: 200 }"' : ''),
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
    withNotes(CvOverflowMenuNotesMD)(() => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-overflow-menu${settings.group.attr}>
  <cv-overflow-menu-item primary>list item 1</cv-overflow-menu-item>
  <cv-overflow-menu-item disabled>list item 2</cv-overflow-menu-item>
  <cv-overflow-menu-item danger>list item 3</cv-overflow-menu-item>
</cv-overflow-menu>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvOverflowMenu, SvTemplateView },
        template: templateViewString,
      };
    })
  );
}
