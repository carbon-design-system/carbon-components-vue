import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';

import SvTemplateView from '../../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../../_storybook/utils/consts';
import knobsHelper from '../../_storybook/utils/knobs-helper';

import CvOverflowMenuNotesMD from '@carbon/vue/src/components/cv-overflow-menu/cv-overflow-menu-notes.md';
import CvOverflowMenu from '@carbon/vue/src/components/cv-overflow-menu/cv-overflow-menu';

const storiesDefault = storiesOf('Default/CvOverflowMenu', module);
const storiesExperimental = storiesOf('Experimental/CvOverflowMenu', module);
import { versions, setVersion } from '@carbon/vue/src/_internal/_feature-flags';

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

for (const version of versions()) {
  const stories = version.experimental && !version.default ? storiesExperimental : storiesDefault;

  for (const story of storySet) {
    stories.add(
      story.name,
      () => {
        setVersion(version);
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
      :sv-experimental="experimental"
      sv-margin
      sv-source='${templateString.trim()}'
      sv-position="center"
      >
      <template slot="component">${templateString}</template>
    </sv-template-view>
  `;

        return {
          components: { CvOverflowMenu, SvTemplateView },
          data: () => ({ experimental: version.experimental }),
          template: templateViewString,
          props: settings.props,
        };
      },
      {
        notes: { markdown: CvOverflowMenuNotesMD },
      }
    );
  }
}
