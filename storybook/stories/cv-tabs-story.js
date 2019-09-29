import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvTabsNotesMD from '@carbon/vue/src/components/cv-tabs/cv-tabs-notes.md';
import { CvTab, CvTabs } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvTabs', module);
const storiesExperimental = storiesOf('Experimental/CvTabs', module);

const preKnobs = {
  selected: {
    group: 'tab2',
    type: boolean,
    config: ['2-selected', false], // consts.CONFIG],
    prop: 'selected',
  },
  disabled: {
    group: 'tab4',
    type: boolean,
    config: ['4-disabled', false],
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@tab-selected="actionSelected"`,
  },
};

const variants = [{ name: 'default' }, { name: 'minimal', excludes: ['events', 'selected', 'disabled'] }];

const storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      // ----------------------------------------------------------------
      let withId;
      if (story.name === 'minimal') {
        withId = () => '';
      } else {
        withId = id => `id="tab-${id}"`;
      }

      const templateString = `
<cv-tabs${settings.group.attr} aria-label="navigation tab label">
  <cv-tab ${withId(1)}label="Tab link 1">
    Sample tab panel content 1
  </cv-tab>
  <cv-tab ${withId(2)}label="Tab link 2" ${settings.group.tab2}>
    Sample tab panel content 2
  </cv-tab>
  <cv-tab ${withId(3)}label="Tab link 3">
    Sample tab panel content 3
  </cv-tab>
  <cv-tab ${withId(4)}label="Tab link 4" ${settings.group.tab4}>
    Sample tab panel content 4
  </cv-tab>
  <cv-tab ${withId(5)}label="Tab link 5">
    Sample tab panel content 5
  </cv-tab>
</cv-tabs>
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
        components: { CvTabs, CvTab, SvTemplateView },
        methods: {
          actionSelected: action('Cv Tabs - tab-selected'),
          actionBeingSelected: action('Cv Tabs - tab-beingselected'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvTabsNotesMD },
    }
  );
}
