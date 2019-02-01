import { storiesOf } from '@storybook/vue';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvOverflowMenuNotesMD from './cv-overflow-menu-notes.md';
import CvOverflowMenu from './cv-overflow-menu';

const stories = storiesOf('CvOverflowMenu', module);
stories.addDecorator(withKnobs);
stories.addDecorator(withNotes);

const preKnobs = {
  flipMenu: {
    group: 'attr',
    type: boolean,
    config: ['flip menu', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { type: Boolean, name: 'flip-menu' },
  },
  offset: {
    group: 'attr',
    type: object,
    config: ['offset example', { left: 0, top: 0 }], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: { type: Object, name: 'offset' },
  },
};

const variants = [{ name: 'default' }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  stories.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------

      const templateString = `
<cv-overflow-menu${settings.group.attr}>
  <cv-overflow-menu-item primary-focus>list item 1</cv-overflow-menu-item>
  <cv-overflow-menu-item disabled>list item 2</cv-overflow-menu-item>
  <cv-overflow-menu-item danger>list item 3</cv-overflow-menu-item>
</cv-overflow-menu>
  `;

      // ----------------------------------------------------------------

      const templateViewString = `
    <sv-template-view
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

      return {
        components: { CvOverflowMenu, SvTemplateView },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvOverflowMenuNotesMD },
    }
  );
}
